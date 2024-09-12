import { NextResponse } from 'next/server';
import prisma from '../../prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const point = await prisma.point.findUnique({
        where: { id: Number(params.id) },
    });
    return NextResponse.json(point);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { x, y, group } = await request.json();
    const point = await prisma.point.update({
        where: { id: Number(params.id) },
        data: { x, y, group },
    });
    return NextResponse.json(point);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const point = await prisma.point.delete({
        where: { id: Number(params.id) },
    });
    return NextResponse.json(point);
}
