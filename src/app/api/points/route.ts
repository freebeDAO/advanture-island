import { NextResponse } from 'next/server';
import prisma from '../prisma';

export async function POST(request: Request) {
    const { x, y, group } = await request.json();
    const point = await prisma.point.create({
        data: { x, y, group },
    });
    return NextResponse.json(point);
}
