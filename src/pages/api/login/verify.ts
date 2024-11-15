import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // 仅允许 POST 请求
  }

  const { token } = req.body;

  try {
    // 验证 JWT 的有效性
    jwt.verify(token, SECRET_KEY);
    res.status(200).json({ isValid: true });
  } catch (error) {
    res.status(401).json({ isValid: false, error: 'Invalid token' });
  }
}
