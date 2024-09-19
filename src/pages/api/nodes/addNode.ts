import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const newNode = await prisma.node.create({
      data: {
        x: parseInt(req.body.x),
        y: parseInt(req.body.y),
      },
    });
    res.status(201).json({data: newNode, msg: "success", code: 200});
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}