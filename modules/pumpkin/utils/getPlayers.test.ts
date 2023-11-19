import { getPlayers } from './getPlayers.js'

jest.mock('../../../utils/prisma.js', () => ({
  prisma: {
    pumpkinPlayer: {
      findMany: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.js')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('#getPlayers', () => {
  it('should call prisma.pumpkinPlayer.findMany and return players', async () => {
    const tgChatId = '123'
    prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
      'player-1-mock',
      'player-2-mock',
    ])

    const players = await getPlayers(tgChatId)

    expect(prisma.pumpkinPlayer.findMany).toHaveBeenCalledWith({
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
