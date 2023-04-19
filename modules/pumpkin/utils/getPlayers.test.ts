import { getPlayers } from './getPlayers.ts'

jest.mock('../../../utils/prisma.ts', () => ({
  prisma: {
    pumpkinPlayer: {
      findMany: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.ts')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('#getPlayers', () => {
  it('should call prisma.pumpkinPlayer.findMany and return players', async () => {
    const tgChatId = 123
    prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
      'player-1-mock',
      'player-2-mock',
    ])

    const players = await getPlayers(tgChatId)

    expect(prisma.pumpkinPlayer.findMany).toBeCalledWith({
      where: {
        tgChatId,
      },
      include: {
        user: true,
      },
    })
    expect(players).toEqual(['player-1-mock', 'player-2-mock'])
  })
})
