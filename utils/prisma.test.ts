import { PrismaClient } from '@prisma/client'
import { describe, expect, test, vi } from 'vitest'
import { prisma } from './prisma.js'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
vi.mock(import('@prisma/client'), () => ({ PrismaClient: class {} as any }))

describe('#prisma', () => {
  test('should return instance of PrismaClient', () => {
    expect(prisma).toBeInstanceOf(PrismaClient)
  })
})
