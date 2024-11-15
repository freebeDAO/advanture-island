import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET as string; // 从环境变量中获取 SECRET

// 为处理程序函数命名
const authenticateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { signature, publicAddress } = req.body;

  const user = await prisma.user.findUnique({
    where: { publicAddress },
  });

  if (!user) return res.status(401).send({ error: 'User not found' });

  const message = `I am signing my one-time nonce: ${user.nonce}`;
  const signerAddress = ethers.utils.verifyMessage(message, signature);

  if (signerAddress.toLowerCase() === publicAddress.toLowerCase()) {
    await prisma.user.update({
      where: { publicAddress },
      data: { nonce: Math.floor(Math.random() * 1000000) },
    });

    const token = jwt.sign(
        { id: user.id, publicAddress: user.publicAddress, avatar: user.avatar, username: user.username },
        SECRET,
        { expiresIn: '1h' }
      );
  
    return res.json({ token });
  } else {
    return res.status(401).send({ error: 'Signature verification failed' });
  }
};

// 导出命名的处理程序函数
export default authenticateUser;
