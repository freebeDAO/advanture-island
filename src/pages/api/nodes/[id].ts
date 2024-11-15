import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Node } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const node: Node | null = await prisma.node.findUnique({
        where: { id: Number(id) },
      });
      if (node) {
        res.status(200).json(node);
      } else {
        res.status(404).json({ error: 'Node not found' });
      }
    } catch (error) {
      console.error('Error:', error);  
      res.status(500).json({ error: 'Error fetching node' });
    }
  } else if (req.method === 'PUT') {
    const { x, y } = req.body as { x: number, y: number };
    try {
      const node: Node = await prisma.node.update({
        where: { id: Number(id) },
        data: { x, y },
      });
      res.status(200).json(node);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error updating node' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.node.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error:', error);  
      res.status(500).json({ error: 'Error deleting node' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
