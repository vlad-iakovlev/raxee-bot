import { Composer } from 'grammy'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mockGrammyBot } from '../../testUtils/mockGrammyBot.js'
import { PokerAdapter } from './classes/PokerAdapter.js'
import { createPokerModule } from './index.js'

vi.mock(import('./classes/PokerAdapter.js'))
const PokerAdapterMocked = vi.mocked(PokerAdapter, true)
beforeEach(() => vi.resetAllMocks())

describe('#createPokerModule', () => {
  test('should return a poker module', () => {
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
    test('should register user', async () => {
      const mockAddPlayer = vi.fn<PokerAdapter['addPlayer']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce(undefined)
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 0,
        players: {
          length: 2,
        },
        addPlayer: mockAddPlayer as PokerAdapter['addPlayer'],
      } as PokerAdapter)
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

      expect(mockAddPlayer).toHaveBeenCalledWith('123456789')
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: "Get ready, you've joined the game\\. To communicate with me, [start a chat](https://t\\.me/raxee\\_bot)",
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should do nothing in private chat', async () => {
      const mockAddPlayer = vi.fn<PokerAdapter['addPlayer']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce(undefined)
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 0,
        players: {
          length: 2,
        },
        addPlayer: mockAddPlayer as PokerAdapter['addPlayer'],
      } as PokerAdapter)
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

      expect(mockAddPlayer).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([])
    })

    test('should reply with error if user is already registered (same chat)', async () => {
      const mockAddPlayer = vi.fn<PokerAdapter['addPlayer']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce({
        tgChatId: '1111111',
      } as PokerAdapter)
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        addPlayer: mockAddPlayer as PokerAdapter['addPlayer'],
      } as PokerAdapter)
      const { bot, requests } = mockGrammyBot()
      const module = createPokerModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          business_connection_id: undefined,
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

      expect(mockAddPlayer).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: 'You are already in a game in this chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should reply with error if user is already registered (other chat)', async () => {
      const mockAddPlayer = vi.fn<PokerAdapter['addPlayer']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce({
        tgChatId: '2222222',
      } as PokerAdapter)
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        addPlayer: mockAddPlayer as PokerAdapter['addPlayer'],
      } as PokerAdapter)
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

      expect(mockAddPlayer).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: 'You are already in a game in another chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should reply with error if game is already started', async () => {
      const mockAddPlayer = vi.fn<PokerAdapter['addPlayer']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce(undefined)
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 1,
        players: {
          length: 2,
        },
        addPlayer: mockAddPlayer as PokerAdapter['addPlayer'],
      } as PokerAdapter)
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

      expect(mockAddPlayer).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: 'A game is already in progress in this chat',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should reply with error if too many players', async () => {
      const mockAddPlayer = vi.fn<PokerAdapter['addPlayer']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce(undefined)
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 0,
        players: {
          length: 10,
        },
        addPlayer: mockAddPlayer as PokerAdapter['addPlayer'],
      } as PokerAdapter)
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

      expect(mockAddPlayer).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
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
    test('should deal cards', async () => {
      const mockDealCards = vi.fn<PokerAdapter['dealCards']>()
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 0,
        players: {
          length: 5,
        },
        dealCards: mockDealCards as PokerAdapter['dealCards'],
      } as PokerAdapter)
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

      expect(mockDealCards).toHaveBeenCalledWith()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: 'Go to the [PM](https://t\\.me/raxee\\_bot), the game has started',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should do nothing in private chat', async () => {
      const mockDealCards = vi.fn<PokerAdapter['dealCards']>()
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 0,
        players: {
          length: 5,
        },
        dealCards: mockDealCards as PokerAdapter['dealCards'],
      } as PokerAdapter)
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

      expect(mockDealCards).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([])
    })

    test('should reply with error if game is already started', async () => {
      const mockDealCards = vi.fn<PokerAdapter['dealCards']>()
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 1,
        players: {
          length: 5,
        },
        dealCards: mockDealCards as PokerAdapter['dealCards'],
      } as PokerAdapter)
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

      expect(mockDealCards).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: 'A game is already in progress in this chat, please wait for it to finish',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should reply with error if not enough players', async () => {
      const mockDealCards = vi.fn<PokerAdapter['dealCards']>()
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 0,
        players: {
          length: 1,
        },
        dealCards: mockDealCards as PokerAdapter['dealCards'],
      } as PokerAdapter)
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

      expect(mockDealCards).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
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
    test('should stop the game', async () => {
      const mockEndGame = vi.fn<PokerAdapter['endGame']>()
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 1,
        endGame: mockEndGame as PokerAdapter['endGame'],
      } as PokerAdapter)
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

      expect(mockEndGame).toHaveBeenCalledWith()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: 'The game in this chat has been stopped',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should cancel the game if test is not started', async () => {
      const mockEndGame = vi.fn<PokerAdapter['endGame']>()
      PokerAdapterMocked.loadByTgChatIdOrCreate.mockResolvedValueOnce({
        dealsCount: 0,
        endGame: mockEndGame as PokerAdapter['endGame'],
      } as PokerAdapter)
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

      expect(mockEndGame).toHaveBeenCalledWith()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 1111111,
            direct_messages_topic_id: undefined,
            text: 'The game in this chat has been cancelled',
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            disable_notification: true,
          },
          signal: undefined,
        },
      ])
    })

    test('should stop game in private chat', async () => {
      const mockEndGame = vi.fn<PokerAdapter['endGame']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce({
        endGame: mockEndGame as PokerAdapter['endGame'],
      } as PokerAdapter)
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

      expect(mockEndGame).toHaveBeenCalledWith()
      expect(requests).toStrictEqual([])
    })

    test('should reply with error in private chat if game not found', async () => {
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce(undefined)
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
            business_connection_id: undefined,
            chat_id: 123456789,
            direct_messages_topic_id: undefined,
            text: 'You are not currently in a game',
            parse_mode: 'MarkdownV2',
          },
          signal: undefined,
        },
      ])
    })
  })

  describe('on:message', () => {
    test('should call handleMessage', async () => {
      const mockHandleMessage = vi.fn<PokerAdapter['handleMessage']>()
      const mockBroadcastPlayerMessage =
        vi.fn<PokerAdapter['broadcastPlayerMessage']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce({
        players: [
          {
            id: 'player-1-id',
            payload: { tgUserId: '123456789' },
          },
        ],
        currentPlayer: { id: 'player-1-id' } as PokerAdapter['currentPlayer'],
        handleMessage: mockHandleMessage as PokerAdapter['handleMessage'],
        broadcastPlayerMessage:
          mockBroadcastPlayerMessage as PokerAdapter['broadcastPlayerMessage'],
      } as PokerAdapter)
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

      expect(mockHandleMessage).toHaveBeenCalledWith(
        { id: 'player-1-id', payload: { tgUserId: '123456789' } },
        'test',
      )
      expect(mockBroadcastPlayerMessage).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([])
    })

    test('should call handleMessage and reply with response from handleMessage', async () => {
      const mockHandleMessage = vi.fn<PokerAdapter['handleMessage']>(() =>
        Promise.resolve('test response'),
      )
      const mockBroadcastPlayerMessage =
        vi.fn<PokerAdapter['broadcastPlayerMessage']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce({
        players: [
          { id: 'player-1-id', payload: { tgUserId: '123456789' } },
        ] as PokerAdapter['players'],
        currentPlayer: { id: 'player-1-id' } as PokerAdapter['currentPlayer'],
        handleMessage: mockHandleMessage as PokerAdapter['handleMessage'],
        broadcastPlayerMessage:
          mockBroadcastPlayerMessage as PokerAdapter['broadcastPlayerMessage'],
      } as PokerAdapter)
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

      expect(mockHandleMessage).toHaveBeenCalledWith(
        { id: 'player-1-id', payload: { tgUserId: '123456789' } },
        'test',
      )
      expect(mockBroadcastPlayerMessage).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123456789,
            direct_messages_topic_id: undefined,
            parse_mode: 'MarkdownV2',
            text: 'test response',
          },
          signal: undefined,
        },
      ])
    })

    test('should do nothing if game not found', async () => {
      const mockHandleMessage = vi.fn<PokerAdapter['handleMessage']>()
      const mockBroadcastPlayerMessage =
        vi.fn<PokerAdapter['broadcastPlayerMessage']>()
      PokerAdapterMocked.loadByTgUserId.mockResolvedValueOnce(undefined)
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

      expect(mockHandleMessage).not.toHaveBeenCalled()
      expect(mockBroadcastPlayerMessage).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([])
    })

    test('should do nothing in group chat', async () => {
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

      expect(PokerAdapterMocked.loadByTgUserId).not.toHaveBeenCalled()
      expect(requests).toStrictEqual([])
    })
  })
})
