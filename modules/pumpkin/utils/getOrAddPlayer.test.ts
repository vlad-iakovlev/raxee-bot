import { getOrAddPlayer } from './getOrAddPlayer.ts'

jest.mock('../../../utils/prisma.ts', () => ({
  prisma: {
    pumpkinPlayer: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.ts')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('#getOrAddPlayer', () => {
  it('should call prisma.pumpkinPlayer.findFirst and return player', async () => {
    const tgChatId = '123'
    const tgUserId = '456'
    prisma.pumpkinPlayer.findFirst.mockResolvedValueOnce('player-mock')

    const player = await getOrAddPlayer(tgChatId, tgUserId)

    expect(prisma.pumpkinPlayer.findFirst).toBeCalledWith({
      where: {
        tgChatId,
        user: {
          tgUserId,
        },
      },
      include: {
        user: true,
      },
    })
    expect(player).toBe('player-mock')
  })

  it('should call prisma.pumpkinPlayer.create and return player', async () => {
    const tgChatId = '123'
    const tgUserId = '456'
    prisma.pumpkinPlayer.findFirst.mockResolvedValueOnce(null)
    prisma.pumpkinPlayer.create.mockResolvedValueOnce('player-mock')

    const player = await getOrAddPlayer(tgChatId, tgUserId)

    expect(prisma.pumpkinPlayer.findFirst).toBeCalledWith({
      where: {
        tgChatId,
        user: {
          tgUserId,
        },
      },
      include: {
        user: true,
      },
    })
    expect(prisma.pumpkinPlayer.create).toBeCalledWith({
      data: {
        tgChatId,
        user: {
          connect: {
            tgUserId,
          },
        },
      },
      include: {
        user: true,
      },
    })
    expect(player).toBe('player-mock')
  })
})
