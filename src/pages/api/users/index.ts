import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'src/lib/prisma'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { address } = req.body;
      
      // 查找或创建用户
      const user = await prisma.user.upsert({
        where: { address: address },
        update: {}, // 如果用户存在，不更新任何字段
        create: { 
          address: address,
          nickname: `User${Math.floor(Math.random() * 1000)}`, // 生成随机昵称
          avatar_url: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${address}.svg`, // 使用 DiceBear 生成头像
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.error('Error in user API:', error);
      res.status(500).json({ error: 'Failed to process user information' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}