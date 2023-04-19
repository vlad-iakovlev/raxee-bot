import { addWinner } from './addWinner.ts'

jest.mock('../../../utils/prisma.ts', () => ({
  prisma: {
    pumpkinStats: {
      create: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.ts')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('#addWinner', () => {
  it('should call prisma.pumpkinStats.create', async () => {
    const playerId = 'player-mock'
    const date = new Date()

    await addWinner(playerId, date)

    expect(prisma.pumpkinStats.create).toBeCalledWith({
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
