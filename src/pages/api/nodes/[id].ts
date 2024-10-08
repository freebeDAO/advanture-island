import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const node = await prisma.node.findUnique({
        where: { id: Number(id) },
      })
      if (node) {
        res.status(200).json(node)
      } else {
        res.status(404).json({ error: '未查询到node' })
      }
    } catch (error) {
      res.status(500).json({ error: '查询node失败' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { x, y } = req.body
      const updatedNode = await prisma.node.update({
        where: { id: Number(id) },
        data: {  x, y },
      })
      res.status(200).json(updatedNode)
    } catch (error) {
      res.status(500).json({ error: '更新node失败' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.node.delete({
        where: { id: Number(id) },
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: '删除node失败' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`不支持 ${req.method} 方法`)
  }
}