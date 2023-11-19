import { prisma } from './prisma.js'

jest.mock('@prisma/client')
const { PrismaClient } = jest.requireMock('@prisma/client')

describe('#prisma', () => {
  it('should return instance of PrismaClient', () => {
    expect(prisma).toBeInstanceOf(PrismaClient)
  })
})
