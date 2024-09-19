import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log("server query node");
  if (req.method === 'GET') {
    const nodes = await prisma.node.findMany();
    console.log("query node result: ", nodes)
    res.status(200).json({data: nodes, msg: "success", code: 200});
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}