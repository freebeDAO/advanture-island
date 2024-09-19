import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const { id, x, y } = req.body;
      console.log("update node:",id, x, y);
      const updatedNode = await prisma.node.update({
        where: { id: parseInt(id) },
        data: {
          x: parseInt(x),
          y: parseInt(y),
        },
      });
      res.status(200).json({data: updatedNode, msg: "success", code: 200});
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}