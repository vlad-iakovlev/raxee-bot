import { describe, expect, test, vi } from 'vitest'
import { PrismaClient, prisma } from './index.js'

vi.mock(import('./generated/client.js'), async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, PrismaClient: class {} as any }
})

describe('#prisma', () => {
  test('should return instance of PrismaClient', () => {
    expect(prisma).toBeInstanceOf(PrismaClient)
  })
})
