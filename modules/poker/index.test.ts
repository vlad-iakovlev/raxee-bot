import { Composer } from 'grammy'
import { mockGrammyBot } from '../../testUtils/mockGrammyBot.ts'
import { createPokerModule } from './index.ts'

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
        description: 'Join the Poker game [group]',
      },
      {
        command: 'poker_start',
        description: 'Begin the Poker game [group]',
      },
      {
        command: 'poker_stop',
        description: 'End the Poker game [private/group]',
      },
    ])
    expect(module.composer).toBeInstanceOf(Composer)
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
            text: "Get ready, you've joined the game\\. To communicate with me, [start a chat](https://t\\.me/raxee\\_bot)",
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            text: 'You are already in a game in this chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            text: 'You are already in a game in another chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            text: 'A game is already in progress in this chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            text: 'There are too many players in this chat, wait for the current game to end',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            text: 'Proceed to the [PM](https://t\\.me/raxee\\_bot), the game has begun',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            text: 'A game is already in progress in this chat, please wait for it to finish',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            text: 'Not enough players, use /poker\\_join to add more',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
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
            disable_notification: true,
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
            disable_notification: true,
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
            text: 'You are not currently in a game',
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
          text: 'test',
        },
      })

      expect(mockHandleMessage).toBeCalledWith(
        { id: 'player-1-id', user: { tgUserId: 123456789 } },
        'test',
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
          text: 'test',
        },
      })

      expect(mockHandleMessage).toBeCalledWith(
        { id: 'player-1-id', user: { tgUserId: 123456789 } },
        'test',
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
          text: 'test',
        },
      })

      expect(mockHandleMessage).not.lastCalledWith()
      expect(mockBroadcastPlayerMessage).toBeCalledWith(
        { id: 'player-1-id', user: { tgUserId: 123456789 } },
        'test',
      )
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 123456789,
            parse_mode: 'MarkdownV2',
            text: "It's not your turn now, but I shared your message with everyone",
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
          text: 'test',
        },
      })

      expect(PokerStateManager.loadByTgUserId).not.toBeCalled()
      expect(requests).toStrictEqual([])
    })
  })
})
