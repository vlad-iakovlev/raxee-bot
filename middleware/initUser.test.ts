import { describe, expect, test, vi } from 'vitest'
import { prisma } from '../utils/prisma.mock.js'
import { initUserMiddleware } from './initUser.js'

describe('#initUserMiddleware', () => {
  test('should call prisma.user.upsert when ctx.from is not null', async () => {
    const ctx = {
      from: {
        id: 123456789,
        first_name: 'John',
        last_name: 'Doe',
        username: 'cool_john',
      },
    } as any
    const next = vi.fn()

    await initUserMiddleware(ctx, next)

    expect(prisma.user.upsert).toHaveBeenCalledWith({
      where: {
        tgUserId: '123456789',
      },
      create: {
        tgUserId: '123456789',
        firstName: 'John',
        lastName: 'Doe',
        username: 'cool_john',
      },
      update: {
        firstName: 'John',
        lastName: 'Doe',
        username: 'cool_john',
      },
      select: {
        id: true,
      },
    })
    expect(next).toHaveBeenCalledWith()
  })

  test('should not call prisma.user.upsert when ctx.from is null', async () => {
    const ctx = {
      from: null,
    } as any
    const next = vi.fn()

    await initUserMiddleware(ctx, next)

    expect(prisma.user.upsert).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })
})
