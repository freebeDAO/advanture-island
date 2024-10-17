import { PrismaClient } from "@prisma/client";
import { Node } from "@/lib/definitions";
import { getPageProps } from "../utils/dao-utils";

const prisma = new PrismaClient();

export async function getAll(): Promise<Node[]> {
    const nodes = await prisma.node.findMany();
    return nodes;
}

export async function getPage(page: number, pageSize: number): Promise<Node[]> {
    const props = getPageProps(page, pageSize);
    const nodes = await prisma.node.findMany(props);
    return nodes;
}

export async function getTotal(): Promise<number> {
    const count = await prisma.node.count();
    return count;
}
export async function getById(id: number): Promise<Node | null> {
    const node = await prisma.node.findUnique({
        where: {
            id: id,
        },
    });
    return node;
}

export async function create(node: Node): Promise<Node> {
    const now = new Date();
    node.createdAt = now;
    node.updatedAt = now;
    const newNode = await prisma.node.create({
        data: node,
    });
    return newNode;
}
export async function update(id: number, node: Node): Promise<Node> {
    const now = new Date();
    node.updatedAt = now;
    const updatedNode = await prisma.node.update({
        where: {
            id: id,
        },
        data: {
            x: node.x,
            y: node.y,
            updatedAt: now,
        },
    });
    return updatedNode;
}
export async function deleteById(id: number): Promise<void> {
    const resutl = await prisma.node.delete({
        where: {
            id: id,
        },
    });
    // console.log(resutl);
}
