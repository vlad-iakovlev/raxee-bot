/* eslint-disable @typescript-eslint/unbound-method */
import { POKER_ROUND, PokerPlayer, PokerState, User } from '@prisma/client'
import { Api } from 'grammy'
import { PokerPlayerManager } from './PokerPlayerManger.js'
import { PokerStateManager } from './PokerStateManager.js'

jest.mock('../../../utils/prisma.js', () => ({
  prisma: {
    pokerPlayer: {
      create: jest.fn(),
    },
    pokerState: {
      upsert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.js')

const mockUser = (index: number) =>
  ({
    id: `user-${index}-id`,
    tgUserId: '1230' + index,
    firstName: `user-${index}-first-name`,
    lastName: `user-${index}-last-name`,
    username: `user-${index}-username`,
  }) as User

const mockPlayer = (index: number) =>
  ({
    id: `player-${index}-id`,
    cards: [index + 6, index + 7],
    balance: 1000,
    betAmount: 0,
    hasFolded: false,
    hasLost: false,
    hasTurned: false,
    user: mockUser(index),
  }) as PokerPlayer & { user: User }

const mockStateId = jest.fn(() => 'state-id')
const mockStateTgChatId = jest.fn(() => '123')
const mockStateCards = jest.fn(() => [1, 2, 3, 4, 5])
const mockStateRound = jest.fn(() => POKER_ROUND.TURN as POKER_ROUND)
const mockStateDealsCount = jest.fn(() => 0)
const mockStateDealerIndex = jest.fn(() => 0)
const mockStateCurrentPlayerIndex = jest.fn(() => 3)
const mockStatePlayers = jest.fn(
  () =>
    [
      mockPlayer(0),
      mockPlayer(1),
      mockPlayer(2),
      mockPlayer(3),
      mockPlayer(4),
    ] as (PokerPlayer & { user: User })[],
)
const mockStateData = jest.fn(
  () =>
    ({
      id: mockStateId(),
      tgChatId: mockStateTgChatId(),
      cards: mockStateCards(),
      round: mockStateRound(),
      dealsCount: mockStateDealsCount(),
      dealerIndex: mockStateDealerIndex(),
      currentPlayerIndex: mockStateCurrentPlayerIndex(),
      players: mockStatePlayers(),
    }) as PokerState & { players: (PokerPlayer & { user: User })[] },
)

const mockTgApi = jest.fn(
  () =>
    ({
      sendMessage: jest.fn() as Api['sendMessage'],
      sendSticker: jest.fn() as Api['sendSticker'],
    }) as Api,
)

describe('PokerStateManager', () => {
  let state: PokerStateManager
  const resetState = () => {
    state = new PokerStateManager(mockStateData(), mockTgApi())
  }

  beforeEach(() => {
    jest.clearAllMocks()
    resetState()
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  describe('#constructor', () => {
    it('should set all properties', () => {
      expect(state.id).toBe(mockStateId())
      expect(state.tgChatId).toBe(mockStateTgChatId())
      expect(state.cards).toStrictEqual(mockStateCards())
      expect(state.round).toBe(mockStateRound())
      expect(state.dealsCount).toBe(mockStateDealsCount())
      expect(state.dealerIndex).toBe(mockStateDealerIndex())
      expect(state.currentPlayerIndex).toBe(mockStateCurrentPlayerIndex())
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, mockPlayer(0)),
        new PokerPlayerManager(state, mockPlayer(1)),
        new PokerPlayerManager(state, mockPlayer(2)),
        new PokerPlayerManager(state, mockPlayer(3)),
        new PokerPlayerManager(state, mockPlayer(4)),
      ])
    })
  })

  describe('#loadByTgChatIdOrCreate', () => {
    it('should call prisma.pokerState.upsert and return new PokerStateManager instance', async () => {
      prisma.pokerState.upsert.mockReturnValueOnce(mockStateData())
      const tgChatId = '100500'

      const newState = await PokerStateManager.loadByTgChatIdOrCreate(
        tgChatId,
        mockTgApi(),
      )

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
      expect(newState).toBeInstanceOf(PokerStateManager)
    })
  })

  describe('#loadByTgUserId', () => {
    it('should call prisma.pokerState.findFirst and return new PokerStateManager instance', async () => {
      prisma.pokerState.findFirst.mockReturnValueOnce(mockStateData())
      const tgUserId = '100500'

      const newState = await PokerStateManager.loadByTgUserId(
        tgUserId,
        mockTgApi(),
      )

      expect(prisma.pokerState.findFirst).toHaveBeenCalledWith({
        where: {
          players: {
            some: {
              user: {
                tgUserId,
              },
            },
          },
        },
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
      expect(newState).toBeInstanceOf(PokerStateManager)
    })

    it('should call prisma.pokerState.findFirst and return undefined', async () => {
      prisma.pokerState.findFirst.mockReturnValueOnce(undefined)
      const tgUserId = '100500'

      const newState = await PokerStateManager.loadByTgUserId(
        tgUserId,
        mockTgApi(),
      )

      expect(prisma.pokerState.findFirst).toHaveBeenCalledWith({
        where: {
          players: {
            some: {
              user: {
                tgUserId,
              },
            },
          },
        },
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
      expect(newState).toBeUndefined()
    })
  })

  describe('#save', () => {
    it('should call prisma.pokerState.update', async () => {
      await state.save()

      expect(prisma.pokerState.update).toHaveBeenCalledWith({
        where: {
          id: state.id,
        },
        data: {
          cards: state.cards,
          round: state.round,
          dealsCount: state.dealsCount,
          dealerIndex: state.dealerIndex,
          currentPlayerIndex: state.currentPlayerIndex,
          players: {
            update: state.players.map((player) => ({
              where: {
                id: player.id,
              },
              data: {
                cards: player.cards,
                balance: player.balance,
                betAmount: player.betAmount,
                hasFolded: player.hasFolded,
                hasLost: player.hasLost,
                hasTurned: player.hasTurned,
              },
            })),
          },
        },
      })
    })
  })

  describe('#potAmount', () => {
    it('should return sum of all players bets', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          betAmount: 200,
        },
      ])
      resetState()

      expect(state.potAmount).toBe(300)
    })
  })

  describe('#baseBetAmount', () => {
    it('should return value based on deals count', () => {
      mockStateDealsCount.mockReturnValueOnce(5)
      resetState()

      expect(state.baseBetAmount).toBe(40)
    })
  })

  describe('#requiredBetAmount', () => {
    it('should return max of all player bets', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          betAmount: 200,
        },
        {
          ...mockPlayer(2),
          betAmount: 150,
        },
      ])
      resetState()

      expect(state.requiredBetAmount).toBe(200)
    })
  })

  describe('#isAllIn', () => {
    it('should return true if some player has zero balance', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          balance: 0,
        },
        mockPlayer(1),
        mockPlayer(2),
      ])
      resetState()

      expect(state.isAllIn).toBe(true)
    })

    it('should return false if player with zero balance has lost', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          balance: 0,
          hasLost: true,
        },
        mockPlayer(1),
        mockPlayer(2),
      ])
      resetState()

      expect(state.isAllIn).toBe(false)
    })

    it('should return false if all players have positive balance', () => {
      expect(state.isAllIn).toBe(false)
    })
  })

  describe('#dealer', () => {
    it('should return dealer', () => {
      mockStateDealerIndex.mockReturnValueOnce(1)
      resetState()

      expect(state.dealer).toBe(state.players[1])
    })
  })

  describe('#smallIndex', () => {
    it('should return index of small', () => {
      state.dealerIndex = 123
      state.getNextPlayerIndex = jest.fn().mockReturnValueOnce(456)

      expect(state.smallIndex).toBe(456)
      expect(state.getNextPlayerIndex).toHaveBeenCalledWith(123)
    })
  })

  describe('#small', () => {
    it('should return small', () => {
      Object.defineProperty(state, 'smallIndex', { value: 1 })

      expect(state.small).toBe(state.players[1])
    })
  })

  describe('#bigIndex', () => {
    it('should return index of big', () => {
      state.dealerIndex = 123
      state.getNextPlayerIndex = jest
        .fn()
        .mockReturnValueOnce(456)
        .mockReturnValueOnce(789)

      expect(state.bigIndex).toBe(789)
      expect(state.getNextPlayerIndex).toHaveBeenCalledWith(123)
      expect(state.getNextPlayerIndex).toHaveBeenCalledWith(456)
    })
  })

  describe('#big', () => {
    it('should return big', () => {
      Object.defineProperty(state, 'bigIndex', { value: 1 })

      expect(state.big).toBe(state.players[1])
    })
  })

  describe('#currentPlayer', () => {
    it('should return current player', () => {
      mockStateCurrentPlayerIndex.mockReturnValueOnce(1)
      resetState()

      expect(state.currentPlayer).toBe(state.players[1])
    })
  })

  describe('#playersInDeal', () => {
    it('should return players who are not folded and not lost', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasFolded: true,
        },
        mockPlayer(1),
        {
          ...mockPlayer(2),
          hasLost: true,
        },
        mockPlayer(3),
        {
          ...mockPlayer(4),
          balance: 0,
        },
      ])
      resetState()

      expect(state.playersInDeal).toStrictEqual([
        state.players[1],
        state.players[3],
        state.players[4],
      ])
    })
  })

  describe('#isOnlyOnePlayerLeft', () => {
    it('should return true if only one player left', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasLost: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        mockPlayer(2),
      ])
      resetState()

      expect(state.isOnlyOnePlayerLeft).toBe(true)
    })

    it('should return false if more than one player left', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasLost: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        mockPlayer(2),
        mockPlayer(3),
      ])
      resetState()

      expect(state.isOnlyOnePlayerLeft).toBe(false)
    })
  })

  describe('#isAllPlayersTurned', () => {
    it('should return true if everyone has turned and bet amount is equal required bet amount', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(2),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(3),
          hasTurned: true,
          betAmount: 100,
        },
      ])
      resetState()

      expect(state.isAllPlayersTurned).toBe(true)
    })

    it('should return true if someone has not turned but lost', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(2),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(3),
          hasLost: true,
        },
      ])
      resetState()

      expect(state.isAllPlayersTurned).toBe(true)
    })

    it('should return true if someone has not turned but folded', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(2),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
      ])
      resetState()

      expect(state.isAllPlayersTurned).toBe(true)
    })

    it('should return true if someone has not turned but has zero balance', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(2),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(3),
          balance: 0,
        },
      ])
      resetState()

      expect(state.isAllPlayersTurned).toBe(true)
    })

    it('should return false if someone has not turned', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(2),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(3),
          betAmount: 100,
        },
      ])
      resetState()

      expect(state.isAllPlayersTurned).toBe(false)
    })

    it('should return false if someone has turned but bet amount is not equal required bet amount', () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(1),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(2),
          hasTurned: true,
          betAmount: 100,
        },
        {
          ...mockPlayer(3),
          hasTurned: true,
          betAmount: 50,
        },
      ])
      resetState()

      expect(state.isAllPlayersTurned).toBe(false)
    })
  })

  describe('#bestCombinationWeight', () => {
    it('should return best combination weight', () => {
      Object.defineProperty(state.players[0], 'bestCombination', {
        value: { weight: 1234 },
      })
      Object.defineProperty(state.players[1], 'bestCombination', {
        value: { weight: 9000 },
      })
      Object.defineProperty(state.players[2], 'bestCombination', {
        value: { weight: 5678 },
      })
      Object.defineProperty(state.players[3], 'bestCombination', {
        value: { weight: 100500 },
      })
      Object.defineProperty(state.players[4], 'bestCombination', {
        value: { weight: 367 },
      })

      expect(state.bestCombinationWeight).toBe(100500)
    })

    it('should ignore players without best combination', () => {
      Object.defineProperty(state.players[0], 'bestCombination', {
        value: { weight: 1234 },
      })
      Object.defineProperty(state.players[1], 'bestCombination', {
        value: { weight: 9000 },
      })
      Object.defineProperty(state.players[2], 'bestCombination', {
        value: { weight: 5678 },
      })
      Object.defineProperty(state.players[3], 'bestCombination', {
        value: undefined,
      })
      Object.defineProperty(state.players[4], 'bestCombination', {
        value: { weight: 367 },
      })

      expect(state.bestCombinationWeight).toBe(9000)
    })
  })

  describe('#addPlayer', () => {
    it('should add call prisma.pokerPlayer.create and add player to players', async () => {
      prisma.pokerPlayer.create.mockReturnValueOnce(mockPlayer(10))
      const tgUserId = '1240'

      await state.addPlayer(tgUserId)

      expect(prisma.pokerPlayer.create).toHaveBeenCalledWith({
        data: {
          cards: [],
          balance: 1000,
          betAmount: 0,
          hasFolded: false,
          hasLost: false,
          hasTurned: false,
          user: {
            connect: {
              tgUserId,
            },
          },
          state: {
            connect: {
              id: state.id,
            },
          },
        },
        include: {
          user: true,
        },
      })
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, mockPlayer(0)),
        new PokerPlayerManager(state, mockPlayer(1)),
        new PokerPlayerManager(state, mockPlayer(2)),
        new PokerPlayerManager(state, mockPlayer(3)),
        new PokerPlayerManager(state, mockPlayer(4)),
        new PokerPlayerManager(state, mockPlayer(10)),
      ])
    })
  })

  describe('#dealCards', () => {
    it('should deal cards and reset state', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
      mockStateDealsCount.mockReturnValueOnce(5)
      mockStateDealerIndex.mockReturnValueOnce(1)
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasFolded: true,
          hasTurned: true,
        },
        mockPlayer(1),
        {
          ...mockPlayer(2),
          hasLost: true,
        },
        mockPlayer(3),
        mockPlayer(4),
        {
          ...mockPlayer(5),
          hasFolded: true,
          hasLost: true,
        },
        {
          ...mockPlayer(6),
          balance: 35,
        },
        mockPlayer(7),
        {
          ...mockPlayer(8),
          hasLost: true,
        },
        mockPlayer(9),
      ])
      resetState()
      state.save = jest.fn()
      state.broadcastMessage = jest.fn()
      state.broadcastCurrentTurn = jest.fn()

      await state.dealCards()

      expect(state.dealsCount).toBe(6)
      expect(state.round).toBe(POKER_ROUND.PREFLOP)
      expect(state.cards).toStrictEqual([29, 19, 0, 43, 16])
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          cards: [1, 23],
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          cards: [26, 2],
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(2),
          cards: [33, 36],
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(3),
          cards: [39, 3],
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(4),
          cards: [46, 49],
          balance: 980,
          betAmount: 20, // << Small blind
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(5),
          cards: [4, 17],
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(6),
          cards: [18, 5],
          balance: 0,
          betAmount: 35, // << Big blind, limited by balance
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(7),
          cards: [20, 21],
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(8),
          cards: [22, 6],
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(9),
          cards: [24, 25],
        }),
      ])
      expect(state.dealerIndex).toStrictEqual(3)
      expect(state.currentPlayerIndex).toStrictEqual(7)
      expect(state.save).toHaveBeenCalledWith()
      expect(state.broadcastMessage).toHaveBeenCalledWith({
        value: [
          '*Who is in the game:*',
          '• @user\\-0\\-username \\(1000 🪙\\)',
          '• @user\\-1\\-username \\(1000 🪙\\)',
          '• @user\\-3\\-username \\(1000 🪙\\)',
          '• @user\\-4\\-username \\(1000 🪙\\)',
          '• @user\\-6\\-username \\(35 🪙\\) 💰 All in',
          '• @user\\-7\\-username \\(1000 🪙\\)',
          '• @user\\-9\\-username \\(1000 🪙\\)',
          '',
          '*Dealer:* @user\\-3\\-username',
          '*Small:* @user\\-4\\-username \\(20 🪙\\)',
          '*Big:* @user\\-6\\-username \\(35 🪙\\)',
        ].join('\n'),
      })
      expect(state.broadcastCurrentTurn).toHaveBeenCalledWith()
    })
  })

  describe('#endGame', () => {
    it('should end game', async () => {
      jest
        .spyOn(global.Math, 'random')
        .mockReturnValueOnce(0.3)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.55)
        .mockReturnValueOnce(0.4)
        .mockReturnValueOnce(0.2)
      state.broadcastMessage = jest.fn()

      await state.endGame()

      expect(state.broadcastMessage).toHaveBeenCalledWith('Game over, folks!')
      expect((state.tgApi.sendSticker as jest.Mock).mock.calls).toStrictEqual([
        [
          '12300',
          'CAACAgIAAxkBAAIMa2LDXc4nM_5Np3x6QrD_CSCbpl-0AALbAQACPQ3oBNXTF0r9yu1QKQQ',
          { reply_markup: { remove_keyboard: true } },
        ],
        [
          '12301',
          'CAACAgIAAxkBAAIMTWLDXSBtPvO6simMAoERFOb3h4-qAAJcAQACPQ3oBAABMsv78bItBCkE',
          { reply_markup: { remove_keyboard: true } },
        ],
        [
          '12302',
          'CAACAgIAAxkBAAIMg2LDXjq2VYi_IzAHFfWpHeoqk9TdAALRAQACPQ3oBPCyBQkFuchBKQQ',
          { reply_markup: { remove_keyboard: true } },
        ],
        [
          '12303',
          'CAACAgIAAxkBAAIMdWLDXftIWvgGXI1T-I-Eso9xktcSAAIUDwAC1I9gS7jbkdj0UX0_KQQ',
          { reply_markup: { remove_keyboard: true } },
        ],
        [
          '12304',
          'CAACAgIAAxkBAAIMYWLDXaBwflUtgQHDBEZs70t7BlXrAAJlAQACPQ3oBIxK4cJVO_rzKQQ',
          { reply_markup: { remove_keyboard: true } },
        ],
      ])
      expect(prisma.pokerState.delete).toHaveBeenCalledWith({
        where: { id: 'state-id' },
      })
    })
  })

  describe('#handleMessage', () => {
    beforeEach(() => {
      state.handleFoldMessage = jest.fn()
      state.handleCheckMessage = jest.fn()
      state.handleCallMessage = jest.fn()
      state.handleAllInMessage = jest.fn()
      state.handleOtherMessage = jest.fn()
    })

    it('should handle fold message', async () => {
      await state.handleMessage(state.players[0], '❌ Fold')

      expect(state.handleFoldMessage).toHaveBeenCalledWith(
        state.players[0],
        '❌ Fold',
      )
    })

    it('should handle check message', async () => {
      await state.handleMessage(state.players[0], '✊ Check')

      expect(state.handleCheckMessage).toHaveBeenCalledWith(
        state.players[0],
        '✊ Check',
      )
    })

    it('should handle call message', async () => {
      state.players[0].betAmount = 50
      state.players[1].betAmount = 100

      await state.handleMessage(state.players[0], '✅ 50')

      expect(state.handleCallMessage).toHaveBeenCalledWith(
        state.players[0],
        '✅ 50',
      )
    })

    it('should handle all in message', async () => {
      await state.handleMessage(state.players[0], '💰 All in')

      expect(state.handleAllInMessage).toHaveBeenCalledWith(
        state.players[0],
        '💰 All in',
      )
    })

    it('should handle other message', async () => {
      await state.handleMessage(state.players[0], 'Some message')

      expect(state.handleOtherMessage).toHaveBeenCalledWith(
        state.players[0],
        'Some message',
      )
    })
  })

  describe('#handleFoldMessage', () => {
    it('should set hasFolded, broadcast message and call nextTurn if player can fold', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()

      const response = await state.handleFoldMessage(
        state.players[0],
        '❌ Fold',
      )

      expect(response).toBeUndefined()
      expect(state.players[0].hasFolded).toBe(true)
      expect(state.broadcastPlayerMessage).toHaveBeenCalledWith(
        state.players[0],
        '❌ Fold',
      )
      expect(state.nextTurn).toHaveBeenCalledWith()
    })

    it('should not set hasFolded, broadcast message or call nextTurn if player cannot fold', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()
      Object.defineProperty(state.players[0], 'canFold', { value: false })

      const response = await state.handleFoldMessage(
        state.players[0],
        '❌ Fold',
      )

      expect(response).toBe('Folding is not allowed')
      expect(state.players[0].hasFolded).toBe(false)
      expect(state.broadcastPlayerMessage).not.toHaveBeenCalled()
      expect(state.nextTurn).not.toHaveBeenCalled()
    })
  })

  describe('#handleCheckMessage', () => {
    it('should broadcast message and call nextTurn if player can check', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()

      const response = await state.handleCheckMessage(
        state.players[0],
        '✊ Check',
      )

      expect(response).toBeUndefined()
      expect(state.broadcastPlayerMessage).toHaveBeenCalledWith(
        state.players[0],
        '✊ Check',
      )
      expect(state.nextTurn).toHaveBeenCalledWith()
    })

    it('should not broadcast message or call nextTurn if player cannot check', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()
      Object.defineProperty(state.players[0], 'canCheck', { value: false })

      const response = await state.handleCheckMessage(
        state.players[0],
        '✊ Check',
      )

      expect(response).toBe('Checking is not allowed')
      expect(state.broadcastPlayerMessage).not.toHaveBeenCalled()
      expect(state.nextTurn).not.toHaveBeenCalled()
    })
  })

  describe('#handleCallMessage', () => {
    it('should increase bet, broadcast message and call nextTurn if player can call', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()
      state.players[0].betAmount = 50
      state.players[1].betAmount = 100

      const response = await state.handleCallMessage(state.players[0], '✅ 50')

      expect(response).toBeUndefined()
      expect(state.players[0].betAmount).toBe(100)
      expect(state.broadcastPlayerMessage).toHaveBeenCalledWith(
        state.players[0],
        '✅ 50',
      )
      expect(state.nextTurn).toHaveBeenCalledWith()
    })

    it('should not increase bet, broadcast message or call nextTurn if player cannot call', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()
      state.players[0].balance = 20
      state.players[0].betAmount = 50
      state.players[1].betAmount = 100

      const response = await state.handleCallMessage(state.players[0], '✅ 50')

      expect(response).toBe('Calling is not allowed')
      expect(state.players[0].betAmount).toBe(50)
      expect(state.broadcastPlayerMessage).not.toHaveBeenCalled()
      expect(state.nextTurn).not.toHaveBeenCalled()
    })
  })

  describe('#handleAllInMessage', () => {
    it('should increase bet, broadcast message and call nextTurn if player can all in', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()
      state.players[0].betAmount = 50

      const response = await state.handleAllInMessage(
        state.players[0],
        '💰 All in',
      )

      expect(response).toBeUndefined()
      expect(state.players[0].betAmount).toBe(1050)
      expect(state.broadcastPlayerMessage).toHaveBeenCalledWith(
        state.players[0],
        '💰 All in',
      )
      expect(state.nextTurn).toHaveBeenCalledWith()
    })

    it('should not increase bet, broadcast message or call nextTurn if player cannot all in', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.nextTurn = jest.fn()
      Object.defineProperty(state.players[0], 'canAllIn', { value: false })
      state.players[0].betAmount = 50

      const response = await state.handleAllInMessage(
        state.players[0],
        '💰 All in',
      )

      expect(response).toBe('Going all in is not allowed')
      expect(state.players[0].betAmount).toBe(50)
      expect(state.broadcastPlayerMessage).not.toHaveBeenCalled()
      expect(state.nextTurn).not.toHaveBeenCalled()
    })
  })

  describe('#handleOtherMessage', () => {
    it('should broadcast message if cannot parse amount', async () => {
      state.broadcastPlayerMessage = jest.fn()

      const response = await state.handleOtherMessage(
        state.players[0],
        'Some message',
      )

      expect(response).toBe(
        "I didn't understand you, but I shared your message with everyone",
      )
      expect(state.broadcastPlayerMessage).toHaveBeenCalledWith(
        state.players[0],
        'Some message',
      )
    })

    it('should increase bet and broadcast message if can parse amount and user can raise', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.players[0].betAmount = 50

      const response = await state.handleOtherMessage(state.players[0], '100')

      expect(response).toBeUndefined()
      expect(state.players[0].betAmount).toBe(150)
      expect(state.broadcastPlayerMessage).toHaveBeenCalledWith(
        state.players[0],
        '100',
      )
    })

    it('should not increase bet or broadcast message if player cannot raise', async () => {
      state.broadcastPlayerMessage = jest.fn()
      Object.defineProperty(state.players[0], 'canRaise', { value: false })
      state.players[0].betAmount = 50

      const response = await state.handleOtherMessage(state.players[0], '100')

      expect(response).toBe('Raising is not allowed')
      expect(state.players[0].betAmount).toBe(50)
      expect(state.broadcastPlayerMessage).not.toHaveBeenCalled()
    })

    it('should not increase bet or broadcast message if suggested raise is too big', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.players[0].betAmount = 50

      const response = await state.handleOtherMessage(state.players[0], '9000')

      expect(response).toBe('That bet is too large')
      expect(state.players[0].betAmount).toBe(50)
      expect(state.broadcastPlayerMessage).not.toHaveBeenCalled()
    })

    it('should not increase bet or broadcast message if suggested raise is too small', async () => {
      state.broadcastPlayerMessage = jest.fn()
      state.players[0].betAmount = 50

      const response = await state.handleOtherMessage(state.players[0], '10')

      expect(response).toBe('That bet is too small')
      expect(state.players[0].betAmount).toBe(50)
      expect(state.broadcastPlayerMessage).not.toHaveBeenCalled()
    })
  })

  describe('#nextTurn', () => {
    it('should switch to next player', async () => {
      mockStateCurrentPlayerIndex.mockReturnValueOnce(2)
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          betAmount: 100,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          betAmount: 50,
        },
      ])
      resetState()
      state.endDeal = jest.fn()
      state.save = jest.fn()
      state.broadcastCurrentTurn = jest.fn()

      await state.nextTurn()

      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true, // <-- Set hasTurned
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(3),
          hasFolded: true, // <-- Ignored because hasLost
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(4),
          betAmount: 50,
        }),
      ])
      expect(state.currentPlayerIndex).toBe(4)
      expect(state.save).toHaveBeenCalledWith()
      expect(state.broadcastCurrentTurn).toHaveBeenCalledWith()
    })

    it('should switch to next round if all players have turned', async () => {
      mockStateCurrentPlayerIndex.mockReturnValueOnce(4)
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          betAmount: 100,
        },
      ])
      resetState()
      state.endDeal = jest.fn()
      state.save = jest.fn()
      state.broadcastCurrentTurn = jest.fn()

      await state.nextTurn()

      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: false, // <-- Reset hasTurned
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          hasLost: true, // <-- Ignored because hasLost
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: false, // <-- Reset hasTurned
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(3),
          hasFolded: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: false, // <-- Reset hasTurned
        }),
      ])
      expect(state.currentPlayerIndex).toBe(2)
      expect(state.save).toHaveBeenCalledWith()
      expect(state.broadcastCurrentTurn).toHaveBeenCalledWith()
    })

    it('should call endDeal if all players have turned on river', async () => {
      mockStateRound.mockReturnValueOnce(POKER_ROUND.RIVER)
      mockStateCurrentPlayerIndex.mockReturnValueOnce(4)
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          betAmount: 100,
        },
      ])
      resetState()
      state.endDeal = jest.fn()
      state.save = jest.fn()
      state.broadcastCurrentTurn = jest.fn()

      await state.nextTurn()

      expect(state.endDeal).toHaveBeenCalledWith()
      expect(state.save).not.toHaveBeenCalled()
      expect(state.broadcastCurrentTurn).not.toHaveBeenCalled()
    })

    it('should call endDeal if all players have turned and isAllIn', async () => {
      mockStateCurrentPlayerIndex.mockReturnValueOnce(4)
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          balance: 0,
          betAmount: 100,
        },
      ])
      resetState()
      state.endDeal = jest.fn()
      state.save = jest.fn()
      state.broadcastCurrentTurn = jest.fn()

      await state.nextTurn()

      expect(state.endDeal).toHaveBeenCalledWith()
      expect(state.save).not.toHaveBeenCalled()
      expect(state.broadcastCurrentTurn).not.toHaveBeenCalled()
    })

    it('should call endDeal if only one player left', async () => {
      state.endDeal = jest.fn()
      state.save = jest.fn()
      state.broadcastCurrentTurn = jest.fn()
      Object.defineProperty(state, 'isOnlyOnePlayerLeft', { value: true })

      await state.nextTurn()

      expect(state.endDeal).toHaveBeenCalledWith()
      expect(state.save).not.toHaveBeenCalled()
      expect(state.broadcastCurrentTurn).not.toHaveBeenCalled()
    })
  })

  describe('#endDeal', () => {
    it('should broadcast message, increase balances and deal cards', async () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: true,
        },
      ])
      resetState()
      state.broadcastMessage = jest.fn()
      state.dealCards = jest.fn()
      state.endGame = jest.fn()

      await state.endDeal()

      expect(state.broadcastMessage).toHaveBeenCalledWith({
        value: [
          'Table: ♦️2 ♥️2 ♠️2 ♣️3 ♦️3',
          '',
          '@user\\-0\\-username: ♥️3 ♠️3',
          '♠️3 ♥️3 ♦️3 ♣️3 ♦️2 \\(Four of a Kind\\) 🏆 Win',
          '',
          '@user\\-2\\-username: ♣️4 ♦️4',
          '♠️2 ♥️2 ♦️2 ♦️4 ♣️4 \\(Full House\\)',
          '',
          '@user\\-3\\-username: ♦️4 ♥️4',
          '♠️2 ♥️2 ♦️2 ♥️4 ♦️4 \\(Full House\\) ❌ Fold',
          '',
          '@user\\-4\\-username: ♥️4 ♠️4',
          '♠️2 ♥️2 ♦️2 ♠️4 ♥️4 \\(Full House\\)',
        ].join('\n'),
      })
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          balance: 1300,
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(3),
          hasFolded: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: true,
        }),
      ])
      expect(state.dealCards).toHaveBeenCalledWith()
      expect(state.endGame).not.toHaveBeenCalled()
    })

    it('should split pot between winners', async () => {
      mockStateCards.mockReturnValueOnce([20, 34, 42, 46, 49])
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          cards: [25, 29],
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: true,
        },
      ])
      resetState()
      state.broadcastMessage = jest.fn()
      state.dealCards = jest.fn()
      state.endGame = jest.fn()

      await state.endDeal()

      expect(state.broadcastMessage).toHaveBeenCalledWith({
        value: [
          'Table: ♣️7 ♥️10 ♥️Q ♥️K ♦️A',
          '',
          '@user\\-0\\-username: ♦️8 ♦️9',
          '♦️A ♥️K ♥️Q ♥️10 ♦️9 \\(High Card\\)',
          '',
          '@user\\-2\\-username: ♣️4 ♦️4',
          '♦️4 ♣️4 ♦️A ♥️K ♥️Q \\(Pair\\) 🏆 Win',
          '',
          '@user\\-3\\-username: ♦️4 ♥️4',
          '♥️4 ♦️4 ♦️A ♥️K ♥️Q \\(Pair\\) ❌ Fold',
          '',
          '@user\\-4\\-username: ♥️4 ♠️4',
          '♠️4 ♥️4 ♦️A ♥️K ♥️Q \\(Pair\\) 🏆 Win',
        ].join('\n'),
      })
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          cards: [25, 29],
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(2),
          balance: 1150,
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(3),
          hasFolded: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(4),
          balance: 1150,
          betAmount: 100,
          hasTurned: true,
        }),
      ])
      expect(state.dealCards).toHaveBeenCalledWith()
      expect(state.endGame).not.toHaveBeenCalled()
    })

    it('should set hasLost for players with zero balance', async () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          balance: 0,
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: true,
        },
      ])
      resetState()
      state.broadcastMessage = jest.fn()
      state.dealCards = jest.fn()
      state.endGame = jest.fn()

      await state.endDeal()

      expect(state.broadcastMessage).toHaveBeenCalledWith({
        value: [
          'Table: ♦️2 ♥️2 ♠️2 ♣️3 ♦️3',
          '',
          '@user\\-0\\-username: ♥️3 ♠️3',
          '♠️3 ♥️3 ♦️3 ♣️3 ♦️2 \\(Four of a Kind\\) 🏆 Win',
          '',
          '@user\\-2\\-username: ♣️4 ♦️4',
          '♠️2 ♥️2 ♦️2 ♦️4 ♣️4 \\(Full House\\)',
          '',
          '@user\\-3\\-username: ♦️4 ♥️4',
          '♠️2 ♥️2 ♦️2 ♥️4 ♦️4 \\(Full House\\) ❌ Fold',
          '',
          '@user\\-4\\-username: ♥️4 ♠️4',
          '♠️2 ♥️2 ♦️2 ♠️4 ♥️4 \\(Full House\\)',
        ].join('\n'),
      })
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          balance: 1300,
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(2),
          balance: 0,
          betAmount: 100,
          hasTurned: true,
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(3),
          hasFolded: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: true,
        }),
      ])
      expect(state.dealCards).toHaveBeenCalledWith()
      expect(state.endGame).not.toHaveBeenCalled()
    })

    it('should not set hasLost for players with zero balance who won', async () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          balance: 0,
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          hasLost: true,
        },
        {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(3),
          hasFolded: true,
        },
        {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: true,
        },
      ])
      resetState()
      state.broadcastMessage = jest.fn()
      state.dealCards = jest.fn()
      state.endGame = jest.fn()

      await state.endDeal()

      expect(state.broadcastMessage).toHaveBeenCalledWith({
        value: [
          'Table: ♦️2 ♥️2 ♠️2 ♣️3 ♦️3',
          '',
          '@user\\-0\\-username: ♥️3 ♠️3',
          '♠️3 ♥️3 ♦️3 ♣️3 ♦️2 \\(Four of a Kind\\) 🏆 Win',
          '',
          '@user\\-2\\-username: ♣️4 ♦️4',
          '♠️2 ♥️2 ♦️2 ♦️4 ♣️4 \\(Full House\\)',
          '',
          '@user\\-3\\-username: ♦️4 ♥️4',
          '♠️2 ♥️2 ♦️2 ♥️4 ♦️4 \\(Full House\\) ❌ Fold',
          '',
          '@user\\-4\\-username: ♥️4 ♠️4',
          '♠️2 ♥️2 ♦️2 ♠️4 ♥️4 \\(Full House\\)',
        ].join('\n'),
      })
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          balance: 300,
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          hasLost: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(2),
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(3),
          hasFolded: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(4),
          betAmount: 100,
          hasTurned: true,
        }),
      ])
      expect(state.dealCards).toHaveBeenCalledWith()
      expect(state.endGame).not.toHaveBeenCalled()
    })

    it('should end game if only one player is left', async () => {
      mockStatePlayers.mockReturnValueOnce([
        {
          ...mockPlayer(0),
          betAmount: 100,
          hasTurned: true,
        },
        {
          ...mockPlayer(1),
          balance: 0,
          betAmount: 100,
          hasTurned: true,
        },
      ])
      resetState()
      state.broadcastMessage = jest.fn()
      state.dealCards = jest.fn()
      state.endGame = jest.fn()

      await state.endDeal()

      expect(state.broadcastMessage).toHaveBeenCalledWith({
        value: [
          'Table: ♦️2 ♥️2 ♠️2 ♣️3 ♦️3',
          '',
          '@user\\-0\\-username: ♥️3 ♠️3',
          '♠️3 ♥️3 ♦️3 ♣️3 ♦️2 \\(Four of a Kind\\) 🏆 Win',
          '',
          '@user\\-1\\-username: ♠️3 ♣️4',
          '♠️3 ♦️3 ♣️3 ♥️2 ♦️2 \\(Full House\\)',
        ].join('\n'),
      })
      expect(state.players).toStrictEqual([
        new PokerPlayerManager(state, {
          ...mockPlayer(0),
          balance: 1200,
          betAmount: 100,
          hasTurned: true,
        }),
        new PokerPlayerManager(state, {
          ...mockPlayer(1),
          balance: 0,
          betAmount: 100,
          hasTurned: true,
          hasLost: true,
        }),
      ])
      expect(state.dealCards).not.toHaveBeenCalledWith()
      expect(state.endGame).toHaveBeenCalled()
    })
  })

  describe('getNextPlayerIndex', () => {
    it('should return index of next non-folded and non-lost player', () => {
      mockStatePlayers.mockReturnValueOnce([
        mockPlayer(0),
        mockPlayer(1),
        {
          ...mockPlayer(2),
          hasFolded: true,
        },
        {
          ...mockPlayer(3),
          hasLost: true,
        },
        mockPlayer(4),
      ])
      resetState()

      const nextIndex = state.getNextPlayerIndex(1)

      expect(nextIndex).toBe(4)
    })
  })

  describe('#getNextRound', () => {
    it('should return FLOP if PREFLOP', () => {
      const nextRound = state.getNextRound(POKER_ROUND.PREFLOP)

      expect(nextRound).toBe(POKER_ROUND.FLOP)
    })

    it('should return TURN if FLOP', () => {
      const nextRound = state.getNextRound(POKER_ROUND.FLOP)

      expect(nextRound).toBe(POKER_ROUND.TURN)
    })

    it('should return RIVER if TURN', () => {
      const nextRound = state.getNextRound(POKER_ROUND.TURN)

      expect(nextRound).toBe(POKER_ROUND.RIVER)
    })
  })

  describe('#broadcastMessage', () => {
    it('should broadcast message to all players', async () => {
      await state.broadcastMessage('test')

      expect((state.tgApi.sendMessage as jest.Mock).mock.calls).toStrictEqual([
        ['12300', 'test', { parse_mode: 'MarkdownV2' }],
        ['12301', 'test', { parse_mode: 'MarkdownV2' }],
        ['12302', 'test', { parse_mode: 'MarkdownV2' }],
        ['12303', 'test', { parse_mode: 'MarkdownV2' }],
        ['12304', 'test', { parse_mode: 'MarkdownV2' }],
      ])
    })

    it('should broadcast message only to given players', async () => {
      await state.broadcastMessage('test', [state.players[0], state.players[1]])

      expect((state.tgApi.sendMessage as jest.Mock).mock.calls).toStrictEqual([
        ['12300', 'test', { parse_mode: 'MarkdownV2' }],
        ['12301', 'test', { parse_mode: 'MarkdownV2' }],
      ])
    })
  })

  describe('#broadcastPlayerMessage', () => {
    it('should broadcast message to all players except given one', async () => {
      await state.broadcastPlayerMessage(state.players[3], 'test')

      expect((state.tgApi.sendMessage as jest.Mock).mock.calls).toStrictEqual([
        ['12300', '@user\\-3\\-username: test', { parse_mode: 'MarkdownV2' }],
        ['12301', '@user\\-3\\-username: test', { parse_mode: 'MarkdownV2' }],
        ['12302', '@user\\-3\\-username: test', { parse_mode: 'MarkdownV2' }],
        ['12304', '@user\\-3\\-username: test', { parse_mode: 'MarkdownV2' }],
      ])
    })
  })

  describe('#broadcastCurrentTurn', () => {
    it('should broadcast next turn message', async () => {
      await state.broadcastCurrentTurn()

      expect((state.tgApi.sendMessage as jest.Mock).mock.calls).toStrictEqual([
        [
          '12300',
          '@user\\-3\\-username, your turn\\!',
          {
            parse_mode: 'MarkdownV2',
            reply_markup: {
              keyboard: [
                ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
                ['Pot: 0 🪙'],
                ['♥️3', '♠️3', '1000 🪙'],
              ],
            },
          },
        ],
        [
          '12301',
          '@user\\-3\\-username, your turn\\!',
          {
            parse_mode: 'MarkdownV2',
            reply_markup: {
              keyboard: [
                ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
                ['Pot: 0 🪙'],
                ['♠️3', '♣️4', '1000 🪙'],
              ],
            },
          },
        ],
        [
          '12302',
          '@user\\-3\\-username, your turn\\!',
          {
            parse_mode: 'MarkdownV2',
            reply_markup: {
              keyboard: [
                ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
                ['Pot: 0 🪙'],
                ['♣️4', '♦️4', '1000 🪙'],
              ],
            },
          },
        ],
        [
          '12303',
          '@user\\-3\\-username, your turn\\!',
          {
            parse_mode: 'MarkdownV2',
            reply_markup: {
              keyboard: [
                ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
                ['Pot: 0 🪙'],
                ['♦️4', '♥️4', '1000 🪙'],
                ['❌ Fold', '✊ Check', '💰 All in'],
              ],
            },
          },
        ],
        [
          '12304',
          '@user\\-3\\-username, your turn\\!',
          {
            parse_mode: 'MarkdownV2',
            reply_markup: {
              keyboard: [
                ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
                ['Pot: 0 🪙'],
                ['♥️4', '♠️4', '1000 🪙'],
              ],
            },
          },
        ],
      ])
    })
  })
})
