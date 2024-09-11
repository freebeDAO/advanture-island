import { PrismaClient } from '@prisma/client'
import { createNode, getAllNodes, getNodeById, updateNode, deleteNode } from '../src/models/node'
import dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient()

beforeAll(async () => {
  // 连接数据库
  await prisma.$connect()
})

afterAll(async () => {
  // 断开数据库连接
  await prisma.$disconnect()
})

beforeEach(async () => {
  // 在每个测试之前清空数据库
  await prisma.node.deleteMany()
})

describe('Node CRUD operations', () => {
  test('should create a new node', async () => {
    const nodeData = { x: 10, y: 20 }
    const node = await createNode(nodeData)
    expect(node).toHaveProperty('id')
    expect(node.x).toBe(10)
    expect(node.y).toBe(20)
  })

  test('should get all nodes', async () => {
    await prisma.node.createMany({
      data: [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ],
    })
    const nodes = await getAllNodes()
    expect(nodes).toHaveLength(2)
  })

  test('should get a node by id', async () => {
    const createdNode = await prisma.node.create({
      data: { x: 5, y: 6 },
    })
    const node = await getNodeById(createdNode.id)
    expect(node).toHaveProperty('id', createdNode.id)
    expect(node?.x).toBe(5)
    expect(node?.y).toBe(6)
  })

  test('should update a node', async () => {
    const createdNode = await prisma.node.create({
      data: { x: 7, y: 8 },
    })
    const updatedNode = await updateNode(createdNode.id, { x: 9 })
    expect(updatedNode.x).toBe(9)
    expect(updatedNode.y).toBe(8)
  })

  test('should delete a node', async () => {
    const createdNode = await prisma.node.create({
      data: { x: 11, y: 12 },
    })
    await deleteNode(createdNode.id)
    const node = await prisma.node.findUnique({
      where: { id: createdNode.id },
    })
    expect(node).toBeNull()
  })
})