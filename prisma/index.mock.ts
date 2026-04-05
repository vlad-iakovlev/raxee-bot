import { beforeEach, vi } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { PrismaClient } from './generated/client.js'

export const prisma = mockDeep<PrismaClient>()
vi.mock(import('./index.js'), async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, prisma }
})
beforeEach(() => mockReset(prisma))
