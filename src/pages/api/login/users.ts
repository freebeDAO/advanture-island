import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { publicAddress } = req.query;
      const user = await prisma.user.findUnique({
        where: { publicAddress: String(publicAddress) },
      });
      res.json(user ? [user] : []);
      break;

    case 'POST':
      const { publicAddress: newPublicAddress, avatar,username  } = req.body;
      const newUser = await prisma.user.create({
        data: { 
          publicAddress: newPublicAddress,
          nonce: Math.floor(Math.random() * 1000000), // 生成随机 nonce
          avatar,
          username 
        },
      });
      res.json(newUser);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
