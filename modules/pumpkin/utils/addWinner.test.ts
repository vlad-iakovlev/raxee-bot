import { describe, expect, test } from 'vitest'
import { prisma } from '../../../utils/prisma.mock.js'
import { addWinner } from './addWinner.js'

describe('#addWinner', () => {
  test('should call prisma.pumpkinStats.create', async () => {
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
