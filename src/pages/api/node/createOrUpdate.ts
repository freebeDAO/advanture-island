/**
 * 创建或更新
 */
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from 'src/lib/utils/prisma';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, x, y } = JSON.parse(req.body);
  const data = {x, y};
  try {
    // 创建或修改
    const node = await prisma.node.upsert({ where: { id }, update: data, create: data});
    // 返回结果
    res.json({ status: '0', data: node });
  } catch (error) {
    res.json({ status: '1', msg: 'failed to create or update node' });
  }
}
