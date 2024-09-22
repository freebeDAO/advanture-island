import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/utils/prisma'

// GET /api/filterPosts?searchString=:searchString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const address = req.query.address
  if (!address) {
    return res.status(404).json({ message: 'User not found' })
  }
  if (req.method === 'GET') {
    const result = await prisma.user.findFirst({
      where: {
        address: Array.isArray(address) ? address[0] : address,
      }
    })
    console.log('res user', result)
    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(result)
  }
  return res.status(405).json({ message: 'Method not allowed' })
}