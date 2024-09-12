import prisma from '../prisma';
import {Point} from '@prisma/client';

type PointCreationInput = {
    x: number;
    y: number;
    group: string;
}

async function createPoint(createInput: PointCreationInput): Promise<Point> {
    return prisma.point.create({
        data: {
            x: createInput.x,
            y: createInput.y,
            group: createInput.group
        },
    });
}

async function getPoint(id: number): Promise<Point | null> {
    return prisma.point.findUnique({
        where: {
            id,
        },
    });
}

async function updatePoint(id: number, partialPoint: Partial<Point>): Promise<Point> {
    return prisma.point.update({
        where: {
            id,
        },
        data: {
            ...partialPoint
        },
    });
}

async function deletePoint(id: number): Promise<Point> {
    return prisma.point.delete({
        where: {
            id,
        },
    });
}

export {createPoint, getPoint, updatePoint, deletePoint};