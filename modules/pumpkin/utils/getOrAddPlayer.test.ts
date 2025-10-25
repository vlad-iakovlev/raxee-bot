import { describe, expect, test } from 'vitest'
import { prisma } from '../../../utils/prisma.mock.js'
import { getOrAddPlayer } from './getOrAddPlayer.js'

describe('#getOrAddPlayer', () => {
  test('should call prisma.pumpkinPlayer.findFirst and return player', async () => {
    const tgChatId = '123'
    const tgUserId = '456'
    prisma.pumpkinPlayer.findFirst.mockResolvedValueOnce('player-mock' as any)

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

  test('should call prisma.pumpkinPlayer.create and return player', async () => {
    const tgChatId = '123'
    const tgUserId = '456'
    prisma.pumpkinPlayer.findFirst.mockResolvedValueOnce(null)
    prisma.pumpkinPlayer.create.mockResolvedValueOnce('player-mock' as any)

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
