import {PrismaClient} from '@prisma/client'
import {createPoint, deletePoint, getPoint, updatePoint} from './pointService'
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient()

beforeAll(async () => {
    await prisma.$connect()
})

afterAll(async () => {
    await prisma.$disconnect()
})

beforeEach(async () => {
    await prisma.point.deleteMany()
})

describe('point operations', () => {
    test('should create a new point', async () => {
        const partialPoint = {
            x: 10,
            y: 10,
            group: 'rect'
        }
        const point = await createPoint(partialPoint)
        expect(point).toHaveProperty('id')
        expect(point.x).toBe(10)
        expect(point.y).toBe(10)
    })


    test('should get a point by id', async () => {
        const partialPoint = {
            x: 10,
            y: 10,
            group: 'rect'
        }
        const createdPoint = await createPoint(partialPoint)
        const point = await getPoint(createdPoint.id);

        expect(point).toHaveProperty('id', point?.id)
        expect(point?.x).toBe(10)
        expect(point?.y).toBe(10)
    })

    test('should update a point', async () => {
        const partialPoint = {
            x: 10,
            y: 10,
            group: 'rect'
        }
        const createdPoint = await createPoint(partialPoint)
        const updatedPoint = await updatePoint(createdPoint.id, {
            x: 2,
            y: 2,
            group: 'rect'
        })
        expect(updatedPoint.x).toBe(2)
        expect(updatedPoint.y).toBe(2)
    })

    test('should delete a point', async () => {
        const partialPoint = {
            x: 10,
            y: 10,
            group: 'rect'
        }
        const createdPoint = await createPoint(partialPoint)
        await deletePoint(createdPoint.id);
        const point = await prisma.point.findUnique({
            where: {id: createdPoint.id},
        })
        expect(point).toBeNull()
    })
})