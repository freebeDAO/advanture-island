import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../models/User'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { address, nickname, avatar } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    try {
      // 查找是否有此 address 对应的用户
      let user = await User.findOne({ where: { address } });

      if (user) {
        // 更新已有用户
        user.nickname = nickname || user.nickname;
        user.avatar = avatar || user.avatar;
        await user.save();
      } else {
        // 创建新用户
        user = await User.create({ address, nickname, avatar });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create/update user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}