import { initUserMiddleware } from './initUser.ts'

jest.mock('../utils/prisma.ts', () => ({
  prisma: {
    user: {
      upsert: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../utils/prisma.ts')

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

    expect(prisma.user.upsert).toBeCalledWith({
      where: {
        tgUserId: 123456789,
      },
      create: {
        tgUserId: 123456789,
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
    expect(next).toBeCalledWith()
  })

  it('should not call prisma.user.upsert when ctx.from is null', async () => {
    const ctx = {
      from: null,
    } as any
    const next = jest.fn()

    await initUserMiddleware(ctx, next)

    expect(prisma.user.upsert).not.toBeCalled()
    expect(next).toBeCalledWith()
  })
})
