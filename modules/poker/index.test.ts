import { Composer } from 'grammy'
import { createPokerModule } from '.'
import { mockGrammyBot } from '../../testUtils/mockGrammyBot'

jest.mock('./classes/PokerStateManager')
const { PokerStateManager } = jest.requireMock('./classes/PokerStateManager')

describe('#createPokerModule', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return a poker module', () => {
    const module = createPokerModule()

    expect(module.commands).toStrictEqual([
      {
        command: 'poker_join',
        description: 'Join the game [group]',
      },
      {
        command: 'poker_start',
        description: 'Start the game [group]',
      },
      {
        command: 'poker_stop',
        description: 'Stop the game [private/group]',
      },
    ])
    expect(module.composer).toBeInstanceOf(Composer)
  })

  describe('/start', () => {
    it('should reply with help message if requested with poker', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/start poker',
          entities: [
            {
              offset: 0,
              length: 6,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 123456789,
            text: [
              "I see you want to play poker\\. All right, well, let me tell you what's what\\.",
              '',
              "The game is played by [Texas Hold'em](https://en\\.wikipedia\\.org/wiki/Texas\\_hold\\_%27em) rules\\.",
              '',
              'Once the game starts, the normal keypad will be replaced by a poker keypad:',
              '• in the first line, the cards that are on the table are displayed;',
              '• in the second line, the bank is displayed — the amount of all bets for the round;',
              '• in the third line, your cards and balance are displayed;',
              '• in the fourth line, available actions are displayed: ❌ Fold, ✊ Check, ✅ Call, 💰 All in\\.',
              '',
              'To make a ⏫ Raise, write a number in the chat room\\. For example, "100" if you want to bet 100 🪙\\.',
            ].join('\n'),
            parse_mode: 'MarkdownV2',
          },
          signal: undefined,
        },
      ])
    })

    it('should not reply in group chat', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/start poker',
          entities: [
            {
              offset: 0,
              length: 6,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([])
    })

    it('should not reply with help message if requested without poker', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/start',
          entities: [
            {
              offset: 0,
              length: 6,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([])
    })
  })

  describe('/poker_join', () => {
    it('should register user', async () => {
      const mockAddPlayer = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce(undefined)
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 0,
        players: {
          length: 2,
        },
        addPlayer: mockAddPlayer,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_join',
          entities: [
            {
              offset: 0,
              length: 11,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockAddPlayer).toBeCalledWith(123456789)
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: "Get ready, you're in the game\\. So that I can communicate with you, [start a chat with me](https://t\\.me/raxee\\_bot?start\\=poker)",
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should do nothing in private chat', async () => {
      const mockAddPlayer = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce(undefined)
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 0,
        players: {
          length: 2,
        },
        addPlayer: mockAddPlayer,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_join',
          entities: [
            {
              offset: 0,
              length: 11,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockAddPlayer).not.toBeCalled()
      expect(requests).toStrictEqual([])
    })

    it('should reply with error if user is already registered (same chat)', async () => {
      const mockAddPlayer = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce({
        tgChatId: 1111111,
      })
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        mockAddPlayer,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_join',
          entities: [
            {
              offset: 0,
              length: 11,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockAddPlayer).not.toBeCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'You are already in the game in this chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should reply with error if user is already registered (other chat)', async () => {
      const mockAddPlayer = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce({
        tgChatId: 2222222,
      })
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        mockAddPlayer,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_join',
          entities: [
            {
              offset: 0,
              length: 11,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockAddPlayer).not.toBeCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'You are already in the game in another chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should reply with error if game is already started', async () => {
      const mockAddPlayer = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce(undefined)
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 1,
        players: {
          length: 2,
        },
        addPlayer: mockAddPlayer,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_join',
          entities: [
            {
              offset: 0,
              length: 11,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockAddPlayer).not.toBeCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'The game in this chat has already started',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should reply with error if too many players', async () => {
      const mockAddPlayer = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce(undefined)
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 0,
        players: {
          length: 10,
        },
        addPlayer: mockAddPlayer,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_join',
          entities: [
            {
              offset: 0,
              length: 11,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockAddPlayer).not.toBeCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'Too many players in this chat, wait for the game to end',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })
  })

  describe('/poker_start', () => {
    it('should deal cards', async () => {
      const mockDealCards = jest.fn()
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 0,
        players: {
          length: 5,
        },
        dealCards: mockDealCards,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_start',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockDealCards).toBeCalledWith()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'Go to the [PM](https://t\\.me/raxee\\_bot), the game is on',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should do nothing in private chat', async () => {
      const mockDealCards = jest.fn()
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 0,
        players: {
          length: 5,
        },
        dealCards: mockDealCards,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_start',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockDealCards).not.toBeCalled()
      expect(requests).toStrictEqual([])
    })

    it('should reply with error if game is already started', async () => {
      const mockDealCards = jest.fn()
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 1,
        players: {
          length: 5,
        },
        dealCards: mockDealCards,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_start',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockDealCards).not.toBeCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'The game in this chat has already started, wait for it to end',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should reply with error if not enough players', async () => {
      const mockDealCards = jest.fn()
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 0,
        players: {
          length: 1,
        },
        dealCards: mockDealCards,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_start',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockDealCards).not.toBeCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'Not enough players, add via /poker\\_join',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })
  })

  describe('/poker_stop', () => {
    it('should stop the game', async () => {
      const mockEndGame = jest.fn()
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 1,
        endGame: mockEndGame,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_stop',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockEndGame).toBeCalledWith()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'The game in this chat has been stopped',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should cancel the game if it is not started', async () => {
      const mockEndGame = jest.fn()
      PokerStateManager.loadByTgChatIdOrCreate.mockReturnValueOnce({
        dealsCount: 0,
        endGame: mockEndGame,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_stop',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockEndGame).toBeCalledWith()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 1111111,
            text: 'The game in this chat has been cancelled',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
          },
          signal: undefined,
        },
      ])
    })

    it('should stop game in private chat', async () => {
      const mockEndGame = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce({
        endGame: mockEndGame,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_stop',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(mockEndGame).toBeCalledWith()
      expect(requests).toStrictEqual([])
    })

    it('should reply with error in private chat if game not found', async () => {
      PokerStateManager.loadByTgUserId.mockReturnValueOnce(null)
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: '/poker_stop',
          entities: [
            {
              offset: 0,
              length: 12,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 123456789,
            text: 'You are not in the game',
            parse_mode: 'MarkdownV2',
          },
          signal: undefined,
        },
      ])
    })
  })

  describe('on:message', () => {
    it('should call handleMessage if user is currentPlayer', async () => {
      const mockHandleMessage = jest.fn()
      const mockBroadcastPlayerMessage = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce({
        players: [{ id: 'player-1-id', user: { tgUserId: 123456789 } }],
        currentPlayer: { id: 'player-1-id' },
        handleMessage: mockHandleMessage,
        broadcastPlayerMessage: mockBroadcastPlayerMessage,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: 'test',
        },
      })

      expect(mockHandleMessage).toBeCalledWith(
        { id: 'player-1-id', user: { tgUserId: 123456789 } },
        'test'
      )
      expect(mockBroadcastPlayerMessage).not.toBeCalled()
      expect(requests).toStrictEqual([])
    })

    it('should call handleMessage and reply with response from handleMessage if user is currentPlayer', async () => {
      const mockHandleMessage = jest.fn(() => 'test response')
      const mockBroadcastPlayerMessage = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce({
        players: [{ id: 'player-1-id', user: { tgUserId: 123456789 } }],
        currentPlayer: { id: 'player-1-id' },
        handleMessage: mockHandleMessage,
        broadcastPlayerMessage: mockBroadcastPlayerMessage,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: 'test',
        },
      })

      expect(mockHandleMessage).toBeCalledWith(
        { id: 'player-1-id', user: { tgUserId: 123456789 } },
        'test'
      )
      expect(mockBroadcastPlayerMessage).not.toBeCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 123456789,
            parse_mode: 'MarkdownV2',
            text: 'test response',
          },
          signal: undefined,
        },
      ])
    })

    it('should reply and broadcast user message if user is not currentPlayer', async () => {
      const mockHandleMessage = jest.fn()
      const mockBroadcastPlayerMessage = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce({
        players: [{ id: 'player-1-id', user: { tgUserId: 123456789 } }],
        currentPlayer: { id: 'player-2-id' },
        handleMessage: mockHandleMessage,
        broadcastPlayerMessage: mockBroadcastPlayerMessage,
      })
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: 'test',
        },
      })

      expect(mockHandleMessage).not.lastCalledWith()
      expect(mockBroadcastPlayerMessage).toBeCalledWith(
        { id: 'player-1-id', user: { tgUserId: 123456789 } },
        'test'
      )
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 123456789,
            parse_mode: 'MarkdownV2',
            text: "It's not your turn now, but I told everyone",
          },
          signal: undefined,
        },
      ])
    })

    it('should do nothing if game not found', async () => {
      const mockHandleMessage = jest.fn()
      const mockBroadcastPlayerMessage = jest.fn()
      PokerStateManager.loadByTgUserId.mockReturnValueOnce(undefined)
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123456789,
            type: 'private',
            first_name: 'John',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: 'test',
        },
      })

      expect(mockHandleMessage).not.toBeCalled()
      expect(mockBroadcastPlayerMessage).not.toBeCalled()
      expect(requests).toStrictEqual([])
    })

    it('should do nothing in group chat', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 123456789,
            is_bot: false,
            first_name: 'John',
          },
          text: 'test',
        },
      })

      expect(PokerStateManager.loadByTgUserId).not.toBeCalled()
      expect(requests).toStrictEqual([])
    })
  })
})
