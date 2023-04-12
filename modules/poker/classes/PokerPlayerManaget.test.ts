import { POKER_ROUND, PokerPlayer, User } from '@prisma/client'
import { Api } from 'grammy'
import { md } from 'telegram-md'
import { POKER_COMBINATION_LEVEL } from '../types.js'
import { PokerCombination } from './PokerCombination.js'
import { PokerPlayerManager } from './PokerPlayerManger.js'
import { PokerStateManager } from './PokerStateManager.js'
import { PokerSubset } from './PokerSubset.js'

const mockUserId = jest.fn(() => 'user-id')
const mockUserTgUserId = jest.fn(() => 123456789)
const mockUserFirstName = jest.fn(() => 'FirstName')
const mockUserLastName = jest.fn(() => 'LastName')
const mockUserUsername = jest.fn(() => 'username')
const mockUser = jest.fn(
  () =>
    ({
      id: mockUserId(),
      tgUserId: mockUserTgUserId(),
      firstName: mockUserFirstName(),
      lastName: mockUserLastName(),
      username: mockUserUsername(),
    } as User)
)

const mockPlayerId = jest.fn(() => 'player-id')
const mockPlayerCards = jest.fn(() => [6, 7])
const mockPlayerBalance = jest.fn(() => 900)
const mockPlayerBetAmount = jest.fn(() => 10)
const mockPlayerHasFolded = jest.fn(() => false)
const mockPlayerHasLost = jest.fn(() => false)
const mockPlayerHasTurned = jest.fn(() => false)
const mockPokerPlayer = jest.fn(
  () =>
    ({
      id: mockPlayerId(),
      cards: mockPlayerCards(),
      balance: mockPlayerBalance(),
      betAmount: mockPlayerBetAmount(),
      hasFolded: mockPlayerHasFolded(),
      hasLost: mockPlayerHasLost(),
      hasTurned: mockPlayerHasTurned(),
      user: mockUser(),
    } as PokerPlayer & { user: User })
)

const mockSendMessage = jest.fn()
const mockSendSticker = jest.fn()
const mockTgApi = jest.fn(
  () =>
    ({
      sendMessage: mockSendMessage as Api['sendMessage'],
      sendSticker: mockSendSticker as Api['sendSticker'],
    } as Api)
)

const mockStateId = jest.fn(() => 'state-id')
const mockStateTgChatId = jest.fn(() => 123456789)
const mockStateCards = jest.fn(() => [1, 2, 3, 4, 5])
const mockStateRound = jest.fn(() => POKER_ROUND.TURN as POKER_ROUND)
const mockStateDealsCount = jest.fn(() => 3)
const mockStateDealerIndex = jest.fn(() => 0)
const mockStateSmallIndex = jest.fn(() => 1)
const mockStateBigIndex = jest.fn(() => 2)
const mockStateCurrentPlayerIndex = jest.fn(() => 3)
const mockBankAmount = jest.fn(() => 100)
const mockRequiredBetAmount = jest.fn(() => 20)
const mockIsAllIn = jest.fn(() => false)
const mockStateCurrentPlayer = jest.fn(
  () => ({ id: 'player-id' } as PokerPlayerManager)
)
const mockBestCombinationWeight = jest.fn(() => 1e12)
const mockPokerStateManager = jest.fn(
  () =>
    ({
      id: mockStateId(),
      tgChatId: mockStateTgChatId(),
      cards: mockStateCards(),
      round: mockStateRound(),
      dealsCount: mockStateDealsCount(),
      dealerIndex: mockStateDealerIndex(),
      smallIndex: mockStateSmallIndex(),
      bigIndex: mockStateBigIndex(),
      currentPlayerIndex: mockStateCurrentPlayerIndex(),
      tgApi: mockTgApi(),
      bankAmount: mockBankAmount(),
      requiredBetAmount: mockRequiredBetAmount(),
      isAllIn: mockIsAllIn(),
      currentPlayer: mockStateCurrentPlayer(),
      bestCombinationWeight: mockBestCombinationWeight(),
    } as PokerStateManager)
)

describe('PokerPlayerManager', () => {
  let player: PokerPlayerManager
  const resetPlayer = () => {
    player = new PokerPlayerManager(mockPokerStateManager(), mockPokerPlayer())
  }

  beforeEach(() => {
    jest.clearAllMocks()
    resetPlayer()
  })

  describe('#constructor', () => {
    it('should set all props', () => {
      expect(player.id).toBe(mockPlayerId())
      expect(player.cards).toStrictEqual(mockPlayerCards())
      expect(player.balance).toBe(mockPlayerBalance())
      expect(player.betAmount).toBe(mockPlayerBetAmount())
      expect(player.hasFolded).toBe(mockPlayerHasFolded())
      expect(player.hasLost).toBe(mockPlayerHasLost())
      expect(player.hasTurned).toBe(mockPlayerHasTurned())
      expect(player.user).toStrictEqual(mockUser())
      expect(player.pokerState).toStrictEqual(mockPokerStateManager())
    })
  })

  describe('#callAmount', () => {
    it('should return topBetAmount - player.betAmount', () => {
      expect(player.callAmount).toBe(10)
    })
  })

  describe('#canFold', () => {
    it('should return true if not isAllIn', () => {
      expect(player.canFold).toBe(true)
    })

    it('should return true if isAllIn and player balance is bigger than 0', () => {
      mockIsAllIn.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.canFold).toBe(true)
    })

    it('should return false if isAllIn and player balance is 0', () => {
      mockIsAllIn.mockReturnValueOnce(true)
      mockPlayerBalance.mockReturnValueOnce(0)
      resetPlayer()

      expect(player.canFold).toBe(false)
    })
  })

  describe('#canCheck', () => {
    it('should return true if player.callAmount is 0', () => {
      mockPlayerBetAmount.mockReturnValueOnce(20)
      resetPlayer()

      expect(player.canCheck).toBe(true)
    })

    it('should return false if player.callAmount is not 0', () => {
      expect(player.canCheck).toBe(false)
    })
  })

  describe('#canCall', () => {
    it('should return true if player has enough balance', () => {
      expect(player.canCall).toBe(true)
    })

    it('should return false if player has not enough balance', () => {
      mockPlayerBalance.mockReturnValueOnce(5)
      resetPlayer()

      expect(player.canCall).toBe(false)
    })
  })

  describe('#canAllIn', () => {
    it('should return true is not isAllIn', () => {
      expect(player.canAllIn).toBe(true)
    })

    it('should return true if isAllIn and player cannot check or call', () => {
      mockIsAllIn.mockReturnValueOnce(true)
      mockPlayerBalance.mockReturnValueOnce(5)
      resetPlayer()

      expect(player.canAllIn).toBe(true)
    })

    it('should return false if isAllIn and player can check', () => {
      mockIsAllIn.mockReturnValueOnce(true)
      mockPlayerBetAmount.mockReturnValueOnce(20)
      resetPlayer()

      expect(player.canAllIn).toBe(false)
    })

    it('should return false if isAllIn and player can call', () => {
      mockIsAllIn.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.canAllIn).toBe(false)
    })
  })

  describe('#canRaise', () => {
    it('should return true if not isAllIn', () => {
      expect(player.canRaise).toBe(true)
    })

    it('should return false if isAllIn', () => {
      mockIsAllIn.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.canRaise).toBe(false)
    })
  })

  describe('#bestCombination', () => {
    it('should return best combination', () => {
      expect(player.bestCombination).toStrictEqual(
        new PokerCombination(
          POKER_COMBINATION_LEVEL.FOUR_OF_KIND,
          new PokerSubset([7, 6, 5, 4, 1])
        )
      )
    })

    it('should return undefined if player has lost', () => {
      mockPlayerHasLost.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.bestCombination).toBeUndefined()
    })

    it('should return undefined if player has folded', () => {
      mockPlayerHasFolded.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.bestCombination).toBeUndefined()
    })
  })

  describe('#isWinner', () => {
    it("should return true if player's best combination is a top on", () => {
      mockBestCombinationWeight.mockReturnValueOnce(70101010100)
      resetPlayer()

      expect(player.isWinner).toBe(true)
    })

    it("should return false if player's best combination is not a top on", () => {
      expect(player.isWinner).toBe(false)
    })

    it('should return false if player has no best combination', () => {
      mockPlayerHasLost.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.isWinner).toBe(false)
    })
  })

  describe('#keyboardCards', () => {
    describe('#keyboardCards', () => {
      it('should return preflop on preflop', () => {
        mockStateRound.mockReturnValueOnce(POKER_ROUND.PREFLOP)
        resetPlayer()

        expect(player.keyboardCards).toStrictEqual(['Preflop'])
      })

      it('should return 3 cards and 2 blank spots on flop', () => {
        mockStateRound.mockReturnValueOnce(POKER_ROUND.FLOP)
        resetPlayer()

        expect(player.keyboardCards).toStrictEqual([
          '♦️2',
          '♥️2',
          '♠️2',
          ' ',
          ' ',
        ])
      })

      it('should return 4 cards and 1 blank spot on turn', () => {
        mockStateRound.mockReturnValueOnce(POKER_ROUND.TURN)
        resetPlayer()

        expect(player.keyboardCards).toStrictEqual([
          '♦️2',
          '♥️2',
          '♠️2',
          '♣️3',
          ' ',
        ])
      })

      it('should return 5 cards on river', () => {
        mockStateRound.mockReturnValueOnce(POKER_ROUND.RIVER)
        resetPlayer()

        expect(player.keyboardCards).toStrictEqual([
          '♦️2',
          '♥️2',
          '♠️2',
          '♣️3',
          '♦️3',
        ])
      })
    })
  })

  describe('#keyboardBank', () => {
    it('should return bank', () => {
      expect(player.keyboardBank).toStrictEqual(['Bank: 100 🪙'])
    })
  })

  describe('#keyboardBalance', () => {
    it('should return player cards and balance', () => {
      expect(player.keyboardBalance).toStrictEqual(['♥️3', '♠️3', '900 🪙'])
    })

    it('should return undefined if player has lost', () => {
      mockPlayerHasLost.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.keyboardBalance).toBeUndefined()
    })
  })

  describe('#keyboardActions', () => {
    it('should return undefined if now is not player turn', () => {
      mockStateCurrentPlayer.mockReturnValueOnce({
        id: 'player2',
      } as PokerPlayerManager)
      resetPlayer()

      expect(player.keyboardActions).toBeUndefined()
    })

    it('should return fold, call and all in', () => {
      expect(player.keyboardActions).toStrictEqual([
        '❌ Fold',
        '✅ 10',
        '💰 All in',
      ])
    })

    it('should return fold, check and all in', () => {
      mockPlayerBetAmount.mockReturnValueOnce(20)
      resetPlayer()

      expect(player.keyboardActions).toStrictEqual([
        '❌ Fold',
        '✊ Check',
        '💰 All in',
      ])
    })

    it('should return fold and all in', () => {
      mockPlayerBalance.mockReturnValueOnce(5)
      resetPlayer()

      expect(player.keyboardActions).toStrictEqual(['❌ Fold', '💰 All in'])
    })

    it('should return check', () => {
      mockIsAllIn.mockReturnValueOnce(true)
      mockPlayerBetAmount.mockReturnValueOnce(20)
      mockPlayerBalance.mockReturnValueOnce(0)
      resetPlayer()

      expect(player.keyboardActions).toStrictEqual(['✊ Check'])
    })
  })

  describe('#keyboard', () => {
    it('should return keyboard', () => {
      expect(player.keyboard).toStrictEqual([
        ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
        ['Bank: 100 🪙'],
        ['♥️3', '♠️3', '900 🪙'],
        ['❌ Fold', '✅ 10', '💰 All in'],
      ])
    })

    it('should return keyboard without action', () => {
      mockStateCurrentPlayer.mockReturnValueOnce({
        id: 'player2',
      } as PokerPlayerManager)
      resetPlayer()

      expect(player.keyboard).toStrictEqual([
        ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
        ['Bank: 100 🪙'],
        ['♥️3', '♠️3', '900 🪙'],
      ])
    })

    it('should return keyboard without balance and actions', () => {
      mockStateCurrentPlayer.mockReturnValueOnce({
        id: 'player2',
      } as PokerPlayerManager)
      mockPlayerHasLost.mockReturnValueOnce(true)
      resetPlayer()

      expect(player.keyboard).toStrictEqual([
        ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
        ['Bank: 100 🪙'],
      ])
    })
  })

  describe('#increaseBet', () => {
    it('should increase bet', () => {
      player.increaseBet(100)

      expect(player.betAmount).toBe(110)
    })

    it('should not exceed player balance', () => {
      player.increaseBet(100500)

      expect(player.betAmount).toBe(910)
    })
  })

  describe('#sendMessage', () => {
    it('should send message without keyboard', () => {
      // prettier-ignore
      player.sendMessage(md`Hello, World!`)

      expect(mockSendMessage).toHaveBeenCalledWith(
        123456789,
        'Hello, World\\!',
        { parse_mode: 'MarkdownV2' }
      )
    })

    it('should send message with keyboard', () => {
      // prettier-ignore
      player.sendMessage(md`Hello, World!`, true)

      expect(mockSendMessage).toHaveBeenCalledWith(
        123456789,
        'Hello, World\\!',
        {
          parse_mode: 'MarkdownV2',
          reply_markup: {
            keyboard: [
              ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
              ['Bank: 100 🪙'],
              ['♥️3', '♠️3', '900 🪙'],
              ['❌ Fold', '✅ 10', '💰 All in'],
            ],
          },
        }
      )
    })
  })

  describe('#sendStickerAndRemoveKeyboard', () => {
    it('should send sticker and remove keyboard', () => {
      player.sendStickerAndRemoveKeyboard('sticker')

      expect(mockSendSticker).toHaveBeenCalledWith(123456789, 'sticker', {
        reply_markup: { remove_keyboard: true },
      })
    })
  })

  describe('#sendCurrentTurn', () => {
    it('should send current turn', () => {
      mockStateCurrentPlayer.mockReturnValueOnce(player)
      resetPlayer()

      player.sendCurrentTurn()

      expect(mockSendMessage).toHaveBeenCalledWith(
        123456789,
        '@username, your turn\\!',
        {
          parse_mode: 'MarkdownV2',
          reply_markup: {
            keyboard: [
              ['♦️2', '♥️2', '♠️2', '♣️3', ' '],
              ['Bank: 100 🪙'],
              ['♥️3', '♠️3', '900 🪙'],
              ['❌ Fold', '✅ 10', '💰 All in'],
            ],
          },
        }
      )
    })
  })
})
