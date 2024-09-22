import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/utils/prisma'

// POST /api/user
// Required fields in body: nickname, adress, avatar
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('req', req.method)
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  return res.status(201).json(result)
}