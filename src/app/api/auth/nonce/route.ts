import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { prisma } from 'src/lib/utils';

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json({ error: '地址不能为空' }, { status: 400 });
    }

    // 生成一个随机 nonce
    const nonce = `Nonce: ${randomBytes(16).toString('hex')}`;

    // 存储 nonce 到数据库
    await prisma.nonce.upsert({
      where: { address },
      update: { nonce },
      create: { address, nonce }
    });

    return NextResponse.json({ nonce });
    
  } catch (error) {
    console.error('Nonce generation error:', error);
    return NextResponse.json(
      { error: '生成 nonce 时发生错误' },
      { status: 500 }
    );
  }
}
