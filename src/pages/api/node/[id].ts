/**
 * 查找或删除
 */
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from 'src/lib/utils/prisma';

// 查询
async function getOne(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    // 查库
    const node = await prisma.node.findUnique({where: { id: Number(id) }});
    // 返回结果
    res.json({ status: '0', data: node });
  } catch (error) {
    res.json({ status: '1', msg: 'failed to get node info' });
  }
}

// 删除
async function deleteOne(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    await prisma.node.delete({where: { id: Number(id) }});
    res.json({ status: '0', msg: 'delete successfully' });
  } catch (error) {
    res.json({ status: '1', msg: 'failed to delete' });
  }
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // 查询
      await getOne(req, res);
      break;
    case 'DELETE':
      // 删除
      await deleteOne(req, res);
      break;
    default:
      res.json({ status: '1', msg: 'unsupported method' });
      break;
  }
}
