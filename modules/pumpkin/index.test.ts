import { Composer } from 'grammy'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import '../../utils/prisma.mock.js'
import { mockGrammyBot } from '../../testUtils/mockGrammyBot.js'
import { createPumpkinModule } from './index.js'
import { PumpkinPlayerWithUser } from './types.js'
import { addWinner } from './utils/addWinner.js'
import { getOrAddPlayer } from './utils/getOrAddPlayer.js'
import { getPlayers } from './utils/getPlayers.js'
import { getPumpkinOfYear } from './utils/getPumpkinOfYear.js'
import { getStatsMessage } from './utils/getStatsMessage.js'
import { getWinner } from './utils/getWinner.js'

vi.mock(import('./utils/addWinner.js'))
const addWinnerMocked = vi.mocked(addWinner)
beforeEach(() => addWinnerMocked.mockReset())

vi.mock(import('./utils/getOrAddPlayer.js'))
const getOrAddPlayerMocked = vi.mocked(getOrAddPlayer)
beforeEach(() => getOrAddPlayerMocked.mockReset())

vi.mock(import('./utils/getPlayers.js'))
const getPlayersMocked = vi.mocked(getPlayers)
beforeEach(() => getPlayersMocked.mockReset())

vi.mock(import('./utils/getPumpkinOfYear.js'))
const getPumpkinOfYearMocked = vi.mocked(getPumpkinOfYear)
beforeEach(() => getPumpkinOfYearMocked.mockReset())

vi.mock(import('./utils/getStatsMessage.js'))
const getStatsMessageMocked = vi.mocked(getStatsMessage)
beforeEach(() => getStatsMessageMocked.mockReset())

vi.mock(import('./utils/getWinner.js'))
const getWinnerMocked = vi.mocked(getWinner)
beforeEach(() => getWinnerMocked.mockReset())

describe('#createPumpkinModule', () => {
  test('should return a pumpkin module', () => {
    const module = createPumpkinModule()

    expect(module.commands).toStrictEqual([
      {
        command: 'pumpkin',
        description: 'Find the Pumpkin of the Day [group]',
      },
      {
        command: 'pumpkin_join',
        description: 'Join the Pumpkin of the Day game [group]',
      },
      {
        command: 'pumpkin_stats',
        description: 'View Pumpkin of the Day statistics [group]',
      },
      {
        command: 'pumpkin_stats_year',
        description:
          'View Pumpkin of the Day statistics for the current year [group]',
      },
    ])
    expect(module.composer).toBeInstanceOf(Composer)
  })

  describe('/pumpkin', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.spyOn(global, 'setTimeout').mockImplementation((cb) => {
        cb()
        return {} as NodeJS.Timeout
      })
      vi.spyOn(global.Math, 'random').mockReturnValue(0.3)
    })

    afterEach(() => {
      vi.useRealTimers()
      vi.spyOn(global.Math, 'random').mockRestore()
    })

    test('should set winner and reply with winner', async () => {
      vi.setSystemTime(new Date('2023-04-14T22:08:00'))
      getPlayersMocked.mockResolvedValueOnce([
        {
          id: 'player-1-id',
          user: {
            id: 'user-1-id',
            tgUserId: '1',
            firstName: 'John',
            lastName: 'Doe',
            username: 'john_doe',
          },
        },
        {
          id: 'player-2-id',
          user: {
            id: 'user-2-id',
            tgUserId: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            username: 'jane_doe',
          },
        },
      ] as PumpkinPlayerWithUser[])
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin',
          entities: [
            {
              offset: 0,
              length: 8,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: "Hold on to your stems\\! It's pumpkin time\\!",
          },
          signal: undefined,
        },
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: '_Heading to the scene\\.\\.\\._',
          },
          signal: undefined,
        },
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Hmm\\.\\.\\.',
          },
          signal: undefined,
        },
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Feeling pumpkiny today? You should, @john\\_doe',
          },
          signal: undefined,
        },
      ])
      expect(getPlayersMocked).toHaveBeenCalledWith('123')
      expect(getWinnerMocked).toHaveBeenCalledWith('123', new Date())
      expect(addWinnerMocked).toHaveBeenCalledWith('player-1-id', new Date())
    })

    test('should do nothing in private chat', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'private',
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin',
          entities: [
            {
              offset: 0,
              length: 8,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([])
    })

    test('should reply with earlier winner', async () => {
      vi.setSystemTime(new Date('2023-04-14T22:08:00'))
      getPlayersMocked.mockResolvedValueOnce([
        {
          id: 'player-1-id',
          user: {
            id: 'user-1-id',
            tgUserId: '1',
            firstName: 'John',
            lastName: 'Doe',
            username: 'john_doe',
          },
        },
        {
          id: 'player-2-id',
          user: {
            id: 'user-2-id',
            tgUserId: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            username: 'jane_doe',
          },
        },
      ] as PumpkinPlayerWithUser[])
      getWinnerMocked.mockResolvedValueOnce({
        id: 'player-2-id',
        user: {
          id: 'user-2-id',
          tgUserId: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          username: 'jane_doe',
        },
      } as PumpkinPlayerWithUser)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin',
          entities: [
            {
              offset: 0,
              length: 8,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: "As I see, today's pumpkin is @jane\\_doe\\!",
          },
          signal: undefined,
        },
      ])
      expect(getPlayersMocked).toHaveBeenCalledWith('123')
      expect(getWinnerMocked).toHaveBeenCalledWith('123', new Date())
      expect(addWinnerMocked).not.toHaveBeenCalled()
    })

    test('should reply with suggestion to add players', async () => {
      getPlayersMocked.mockResolvedValueOnce([])
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin',
          entities: [
            {
              offset: 0,
              length: 8,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Add with /pumpkin\\_join',
          },
          signal: undefined,
        },
      ])
      expect(getPlayersMocked).toHaveBeenCalledWith('123')
      expect(getWinnerMocked).not.toHaveBeenCalled()
      expect(addWinnerMocked).not.toHaveBeenCalled()
    })

    test('should reply with suggestion to see year winner', async () => {
      vi.setSystemTime(new Date('2023-12-31T22:08:00'))
      getPlayersMocked.mockResolvedValueOnce([
        {
          id: 'player-1-id',
          user: {
            id: 'user-1-id',
            tgUserId: '1',
            firstName: 'John',
            lastName: 'Doe',
            username: 'john_doe',
          },
        },
        {
          id: 'player-2-id',
          user: {
            id: 'user-2-id',
            tgUserId: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            username: 'jane_doe',
          },
        },
      ] as PumpkinPlayerWithUser[])
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin',
          entities: [
            {
              offset: 0,
              length: 8,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: "Hold on to your stems\\! It's pumpkin time\\!",
          },
          signal: undefined,
        },
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: '_Heading to the scene\\.\\.\\._',
          },
          signal: undefined,
        },
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Hmm\\.\\.\\.',
          },
          signal: undefined,
        },
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Feeling pumpkiny today? You should, @john\\_doe',
          },
          signal: undefined,
        },
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Almost forgot\\.\\.\\. Happy New Year, pumpkins\\!\nFind out who won: /pumpkin\\_2023',
          },
          signal: undefined,
        },
      ])
      expect(getPlayersMocked).toHaveBeenCalledWith('123')
      expect(getWinnerMocked).toHaveBeenCalledWith('123', new Date())
      expect(addWinnerMocked).toHaveBeenCalledWith('player-1-id', new Date())
    })
  })

  describe('/pumpkin_join', () => {
    beforeEach(() => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.3)
    })

    afterEach(() => {
      vi.spyOn(global.Math, 'random').mockRestore()
    })

    test('should call getOrAddPlayer and reply with hello', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_join',
          entities: [
            {
              offset: 0,
              length: 14,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            text: 'Jambo',
          },
          signal: undefined,
        },
      ])
      expect(getOrAddPlayerMocked).toHaveBeenCalledWith('123', '1')
    })

    test('should do nothing in private chat', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'private',
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_join',
          entities: [
            {
              offset: 0,
              length: 14,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([])
    })
  })

  describe('/pumpkin_stats', () => {
    test('should call getStatsMessage and reply with its result', async () => {
      getStatsMessageMocked.mockResolvedValueOnce('stats message' as any)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_stats',
          entities: [
            {
              offset: 0,
              length: 14,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'stats message',
          },
          signal: undefined,
        },
      ])
      expect(getStatsMessageMocked).toHaveBeenCalledWith('123')
    })

    test('should do nothing in private chat', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'private',
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_stats',
          entities: [
            {
              offset: 0,
              length: 14,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([])
    })
  })

  describe('/pumpkin_stats_year', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    test('should call getStatsMessage with current year and reply with its result', async () => {
      vi.setSystemTime(new Date('2023-04-14T22:08:00'))
      getStatsMessageMocked.mockResolvedValueOnce('stats message' as any)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_stats_year',
          entities: [
            {
              offset: 0,
              length: 19,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'stats message',
          },
          signal: undefined,
        },
      ])
      expect(getStatsMessageMocked).toHaveBeenCalledWith('123', 2023)
    })

    test('should do nothing in private chat', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'private',
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_stats_year',
          entities: [
            {
              offset: 0,
              length: 19,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([])
    })
  })

  describe('/pumpkin_2023', () => {
    test('should call getPumpkinOfYear and reply with its result', async () => {
      getPumpkinOfYearMocked.mockResolvedValueOnce('winner message' as any)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_2023',
          entities: [
            {
              offset: 0,
              length: 13,
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
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'winner message',
          },
          signal: undefined,
        },
      ])
      expect(getPumpkinOfYearMocked).toHaveBeenCalledWith('123', 2023)
    })

    test('should do nothing in private chat', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'private',
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: '/pumpkin_2023',
          entities: [
            {
              offset: 0,
              length: 13,
              type: 'bot_command',
            },
          ],
        },
      })

      expect(requests).toStrictEqual([])
    })
  })

  describe('on:message', () => {
    afterEach(() => {
      vi.spyOn(global.Math, 'random').mockRestore()
    })

    test('should reply if user is winner and random < 0.1', async () => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.05)
      getWinnerMocked.mockResolvedValueOnce({
        id: 'player-1-id',
        user: {
          id: 'user-1-id',
          tgUserId: '1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
      } as PumpkinPlayerWithUser)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: 'Hello',
        },
      })

      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            business_connection_id: undefined,
            chat_id: 123,
            direct_messages_topic_id: undefined,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            text: 'Another day, another pumpkin\\!',
          },
          signal: undefined,
        },
      ])
    })

    test('should not reply if user is winner but random > 0.1', async () => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.2)
      getWinnerMocked.mockResolvedValueOnce({
        id: 'player-1-id',
        user: {
          id: 'user-1-id',
          tgUserId: '1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
      } as PumpkinPlayerWithUser)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: 'Hello',
        },
      })

      expect(requests).toStrictEqual([])
    })

    test('should not reply if user is not winner', async () => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.05)
      getWinnerMocked.mockResolvedValueOnce({
        id: 'player-2-id',
        user: {
          id: 'user-2-id',
          tgUserId: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          username: 'jane_doe',
        },
      } as PumpkinPlayerWithUser)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: 'Hello',
        },
      })

      expect(requests).toStrictEqual([])
    })

    test('should not reply if no winner selected', async () => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.05)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'group',
            title: 'Test group',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: 'Hello',
        },
      })

      expect(requests).toStrictEqual([])
    })

    test('should do nothing in private chat', async () => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.05)
      getWinnerMocked.mockResolvedValueOnce({
        id: 'player-1-id',
        user: {
          id: 'user-1-id',
          tgUserId: '1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
      } as PumpkinPlayerWithUser)
      const { bot, requests } = mockGrammyBot()
      const module = createPumpkinModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 123,
            type: 'private',
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          message_id: 1365,
          from: {
            id: 1,
            is_bot: false,
            first_name: 'John',
            last_name: 'Doe',
            username: 'john_doe',
          },
          text: 'Hello',
        },
      })

      expect(requests).toStrictEqual([])
      expect(getWinnerMocked).not.toHaveBeenCalled()
    })
  })
})
