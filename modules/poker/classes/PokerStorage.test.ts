import { POKER_ROUND, User } from '@prisma/client'
import { ROUND, RoomData } from '@vlad-yakovlev/poker'
import { describe, expect, test } from 'vitest'
import { prisma } from '../../../utils/prisma.mock.js'
import { PokerStorage } from './PokerStorage.js'

describe('PokerStorage', () => {
  describe('#get', () => {
    test('should load data from DB and return RoomData', async () => {
      const tgChatId = '100500'
      prisma.pokerState.upsert.mockResolvedValueOnce({
        tgChatId,
        cards: [12, 14, 16, 6, 48],
        round: ROUND.TURN,
        dealsCount: 2,
        dealerIndex: 1,
        currentPlayerIndex: 3,
        // @ts-expect-error Prop `players` is added by `include`
        players: [
          {
            cards: [1, 2],
            balance: 750,
            betAmount: 50,
            hasFolded: false,
            hasLost: false,
            hasTurned: true,
            user: {
              id: 'user-id-1',
              createdAt: new Date(1234),
              updatedAt: new Date(5678),
              tgUserId: 'tg-user-id-1',
              firstName: 'User 1',
              lastName: null,
              username: null,
            },
          },
          {
            cards: [3, 4],
            balance: 560,
            betAmount: 100,
            hasFolded: true,
            hasLost: false,
            hasTurned: false,
            user: {
              id: 'user-id-2',
              createdAt: new Date(9012),
              updatedAt: new Date(3456),
              tgUserId: 'tg-user-id-2',
              firstName: 'User 2',
              lastName: null,
              username: null,
            },
          },
        ],
      })

      const result = await new PokerStorage().get(tgChatId)

      expect(prisma.pokerState.upsert).toHaveBeenCalledWith({
        where: {
          tgChatId,
        },
        create: {
          tgChatId,
          cards: [],
          round: POKER_ROUND.PREFLOP,
          dealsCount: 0,
          dealerIndex: 0,
          currentPlayerIndex: 0,
        },
        update: {},
        include: {
          players: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      })
      expect(result).toStrictEqual({
        id: tgChatId,
        cards: [12, 14, 16, 6, 48],
        round: ROUND.TURN,
        dealsCount: 2,
        dealerIndex: 1,
        currentPlayerIndex: 3,
        players: [
          {
            id: 'user-id-1',
            cards: [1, 2],
            balance: 750,
            betAmount: 50,
            hasFolded: false,
            hasLost: false,
            hasTurned: true,
            payload: {
              id: 'user-id-1',
              createdAt: new Date(1234),
              updatedAt: new Date(5678),
              tgUserId: 'tg-user-id-1',
              firstName: 'User 1',
              lastName: null,
              username: null,
            },
          },
          {
            id: 'user-id-2',
            cards: [3, 4],
            balance: 560,
            betAmount: 100,
            hasFolded: true,
            hasLost: false,
            hasTurned: false,
            payload: {
              id: 'user-id-2',
              createdAt: new Date(9012),
              updatedAt: new Date(3456),
              tgUserId: 'tg-user-id-2',
              firstName: 'User 2',
              lastName: null,
              username: null,
            },
          },
        ],
        payload: undefined,
      })
    })
  })

  describe('#set', () => {
    test('should save data to DB', async () => {
      const tgChatId = '100500'
      const roomData: RoomData<undefined, User> = {
        id: tgChatId,
        cards: [12, 14, 16, 6, 48],
        round: ROUND.TURN,
        dealsCount: 2,
        dealerIndex: 1,
        currentPlayerIndex: 3,
        players: [
          {
            id: 'user-id-1',
            cards: [1, 2],
            balance: 750,
            betAmount: 50,
            hasFolded: false,
            hasLost: false,
            hasTurned: true,
            payload: {
              id: 'user-id-1',
              createdAt: new Date(1234),
              updatedAt: new Date(5678),
              tgUserId: 'tg-user-id-1',
              firstName: 'User 1',
              lastName: null,
              username: null,
            },
          },
          {
            id: 'user-id-2',
            cards: [3, 4],
            balance: 560,
            betAmount: 100,
            hasFolded: true,
            hasLost: false,
            hasTurned: false,
            payload: {
              id: 'user-id-2',
              createdAt: new Date(9012),
              updatedAt: new Date(3456),
              tgUserId: 'tg-user-id-2',
              firstName: 'User 2',
              lastName: null,
              username: null,
            },
          },
        ],
        payload: undefined,
      }
      prisma.pokerState.upsert.mockReturnValueOnce('pokerState.upsert' as any)
      prisma.pokerPlayer.upsert
        .mockReturnValueOnce('pokerPlayer.upsert (1)' as any)
        .mockReturnValueOnce('pokerPlayer.upsert (2)' as any)
      prisma.pokerPlayer.deleteMany.mockReturnValueOnce(
        'pokerPlayer.deleteMany' as any,
      )

      await new PokerStorage().set(tgChatId, roomData)

      expect(prisma.$transaction).toHaveBeenCalledWith([
        'pokerState.upsert',
        'pokerPlayer.upsert (1)',
        'pokerPlayer.upsert (2)',
        'pokerPlayer.deleteMany',
      ])
      expect(prisma.pokerState.upsert).toHaveBeenCalledWith({
        where: {
          tgChatId,
        },
        create: {
          tgChatId,
          cards: [12, 14, 16, 6, 48],
          round: ROUND.TURN,
          dealsCount: 2,
          dealerIndex: 1,
          currentPlayerIndex: 3,
        },
        update: {
          tgChatId,
          cards: [12, 14, 16, 6, 48],
          round: ROUND.TURN,
          dealsCount: 2,
          dealerIndex: 1,
          currentPlayerIndex: 3,
        },
      })
      expect(prisma.pokerPlayer.upsert).toHaveBeenCalledWith({
        where: {
          userId: 'user-id-1',
        },
        create: {
          cards: [1, 2],
          balance: 750,
          betAmount: 50,
          hasFolded: false,
          hasLost: false,
          hasTurned: true,
          user: {
            connect: {
              id: 'user-id-1',
            },
          },
          state: {
            connect: {
              tgChatId,
            },
          },
        },
        update: {
          cards: [1, 2],
          balance: 750,
          betAmount: 50,
          hasFolded: false,
          hasLost: false,
          hasTurned: true,
          user: {
            connect: {
              id: 'user-id-1',
            },
          },
          state: {
            connect: {
              tgChatId,
            },
          },
        },
      })
      expect(prisma.pokerPlayer.upsert).toHaveBeenCalledWith({
        where: {
          userId: 'user-id-2',
        },
        create: {
          cards: [3, 4],
          balance: 560,
          betAmount: 100,
          hasFolded: true,
          hasLost: false,
          hasTurned: false,
          user: {
            connect: {
              id: 'user-id-2',
            },
          },
          state: {
            connect: {
              tgChatId,
            },
          },
        },
        update: {
          cards: [3, 4],
          balance: 560,
          betAmount: 100,
          hasFolded: true,
          hasLost: false,
          hasTurned: false,
          user: {
            connect: {
              id: 'user-id-2',
            },
          },
          state: {
            connect: {
              tgChatId,
            },
          },
        },
      })
      expect(prisma.pokerPlayer.deleteMany).toHaveBeenCalledWith({
        where: {
          state: {
            tgChatId,
          },
          user: {
            NOT: {
              id: {
                in: ['user-id-1', 'user-id-2'],
              },
            },
          },
        },
      })
    })
  })

  describe('#delete', () => {
    test('should delete data from DB', async () => {
      const tgChatId = '100500'

      await new PokerStorage().delete(tgChatId)

      expect(prisma.pokerState.delete).toHaveBeenCalledWith({
        where: {
          tgChatId,
        },
      })
    })
  })
})
