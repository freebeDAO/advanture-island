import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface NodeData {
  x: number
  y: number
}

export async function createNode(data: NodeData) {
  return prisma.node.create({
    data
  })
}

export async function getAllNodes() {
  return prisma.node.findMany()
}

export async function getNodeById(id: number) {
  return prisma.node.findUnique({
    where: { id }
  })
}

export async function updateNode(id: number, data: Partial<NodeData>) {
  return prisma.node.update({
    where: { id },
    data
  })
}

export async function deleteNode(id: number) {
  return prisma.node.delete({
    where: { id }
  })
}