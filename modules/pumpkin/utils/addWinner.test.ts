import { addWinner } from './addWinner.js'

jest.mock('../../../utils/prisma.js', () => ({
  prisma: {
    pumpkinStats: {
      create: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.js')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('#addWinner', () => {
  it('should call prisma.pumpkinStats.create', async () => {
    const playerId = 'player-mock'
    const date = new Date()

    await addWinner(playerId, date)

    expect(prisma.pumpkinStats.create).toHaveBeenCalledWith({
      data: {
        date,
        player: {
          connect: {
            id: playerId,
          },
        },
      },
    })
  })
})
