
import { NextApiRequest, NextApiResponse } from 'next';
import Node from '../../../models/Node';

// 获取所有节点，创建新节点
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // 查询所有 Node
    try {
      const nodes = await Node.findAll();
      res.status(200).json(nodes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch nodes' });
    }
  } else if (req.method === 'POST') {
    // 创建新 Node
    const { x, y } = req.body;
    try {
      const newNode = await Node.create({ x, y });
      res.status(201).json(newNode);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create node' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
