import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      console.log("DELETE: ",id)
      const deletedNode = await prisma.node.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({data: deletedNode, msg: "success", code: 200});
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}