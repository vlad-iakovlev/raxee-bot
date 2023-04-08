const mockPrisma = {
  user: {
    upsert: jest.fn(),
  },
}
jest.mock('../utils/prisma', () => ({
  prisma: mockPrisma,
}))

import { initUserMiddleware } from './initUser'

describe('#initUserMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call prisma.user.upsert when ctx.from is not null', async () => {
    const ctx = {
      from: {
        id: 123456789,
        first_name: 'John',
        last_name: 'Doe',
        username: 'cool_john',
      },
    } as any
    const next = jest.fn()

    await initUserMiddleware(ctx, next)

    expect(mockPrisma.user.upsert).toBeCalledWith({
      where: {
        tgUserId: ctx.from.id,
      },
      create: {
        tgUserId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
      },
      update: {
        tgUserId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
      },
      select: {},
    })
    expect(next).toBeCalledWith()
  })

  it('should not call prisma.user.upsert when ctx.from is null', async () => {
    const ctx = {
      from: null,
    } as any
    const next = jest.fn()

    await initUserMiddleware(ctx, next)

    expect(mockPrisma.user.upsert).not.toBeCalled()
    expect(next).toBeCalledWith()
  })
})
