const { PrismaClient } = require('@prisma/client')
const { usersData } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.users.deleteMany()
    console.log('Deleted records in users table')

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`
    console.log('reset user auto increment to 1')

    await prisma.users.createMany({
      data: usersData,
    })
    console.log('Added user data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()