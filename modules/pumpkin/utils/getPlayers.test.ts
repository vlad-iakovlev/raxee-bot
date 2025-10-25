import { describe, expect, test } from 'vitest'
import { prisma } from '../../../utils/prisma.mock.js'
import { getPlayers } from './getPlayers.js'

describe('#getPlayers', () => {
  test('should call prisma.pumpkinPlayer.findMany and return players', async () => {
    const tgChatId = '123'
    prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
      'player-1-mock',
      'player-2-mock',
    ] as any)

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
