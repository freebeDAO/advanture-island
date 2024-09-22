import { Prisma } from '@prisma/client'

const usersData: Prisma.UserCreateInput[] = [
  {
    nickname: 'Arjun',
    address: 'b578411e742c16cb263bc69514bac2b9',
    avatar: '/images/helmet.jpg',
  },
]

module.exports = {
  usersData,
}