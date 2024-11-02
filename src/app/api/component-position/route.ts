import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from 'src/lib/utils';

async function savePosition(
  userId: string,
  position: { x: number; y: number; direction: string; speed: number }
) {
  try {
    const existingPosition = await prisma.componentPosition.findFirst({
      where: { userId },
    });

    if (existingPosition) {
      return await prisma.componentPosition.update({
        where: { id: existingPosition.id },
        data: position,
      });
    } else {
      return await prisma.componentPosition.create({
        data: { ...position, userId },
      });
    }
  } catch (error) {
    console.error('Save position error:', error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const userId = session.user.id;
    const positionData = await request.json();

    // 直接保存位置数据
    await savePosition(userId, positionData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Position update error:', error);
    return NextResponse.json(
      { error: '更新位置时发生错误' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const position = await prisma.componentPosition.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(position || { x: 0, y: 0 });
  } catch (error) {
    console.error('Position fetch error:', error);
    return NextResponse.json(
      { error: '获取位置时发生错误' },
      { status: 500 }
    );
  }
}
