import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Node } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { x, y } = req.body as { x: number, y: number };
    try {
      const node: Node = await prisma.node.create({
        data: { x, y },
      });
      res.status(201).json(node);
    } catch (error) {
      console.error('Error:', error);  
      res.status(500).json({ error: 'Error creating node' });
    }
  } else if (req.method === 'GET') {
    try {
      const nodes: Node[] = await prisma.node.findMany();
      res.status(200).json(nodes);
    } catch (error) {
      console.error('Error:', error);  
      res.status(500).json({ error: 'Error fetching nodes' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
