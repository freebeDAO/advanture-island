import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const nodes = await prisma.node.findMany()
      res.status(200).json(nodes)
    } catch (error) {
      res.status(500).json({ error: '获取node失败' })
    }
  } else if (req.method === 'POST') {
    try {
      const { x, y } = req.body
      const node = await prisma.node.create({
        data: { x, y },
      })
      res.status(201).json(node)
    } catch (error) {
      res.status(500).json({ error: '创建node失败' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`不支持 ${req.method} 方法`)
  }
}