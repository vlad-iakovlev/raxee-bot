import { getOrAddPlayer } from './getOrAddPlayer.js'

jest.mock('../../../utils/prisma.js', () => ({
  prisma: {
    pumpkinPlayer: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.js')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('#getOrAddPlayer', () => {
  it('should call prisma.pumpkinPlayer.findFirst and return player', async () => {
    const tgChatId = '123'
    const tgUserId = '456'
    prisma.pumpkinPlayer.findFirst.mockResolvedValueOnce('player-mock')

    const player = await getOrAddPlayer(tgChatId, tgUserId)

    expect(prisma.pumpkinPlayer.findFirst).toHaveBeenCalledWith({
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

    expect(prisma.pumpkinPlayer.findFirst).toHaveBeenCalledWith({
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
    expect(prisma.pumpkinPlayer.create).toHaveBeenCalledWith({
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
