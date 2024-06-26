import { Composer } from 'grammy'
import { mockGrammyBot } from '../../testUtils/mockGrammyBot.js'
import { createPumpkinModule } from './index.js'
import { PumpkinPlayerWithUser } from './types.js'

jest.mock('../../utils/prisma.js', () => ({
  prisma: {
    pumpkinStrings: {
      findFirst: jest.fn(),
    },
  },
}))

jest.mock('./utils/addWinner.js')
const { addWinner } = jest.requireMock('./utils/addWinner.js')

jest.mock('./utils/getOrAddPlayer.js')
const { getOrAddPlayer } = jest.requireMock('./utils/getOrAddPlayer.js')

jest.mock('./utils/getPlayers.js')
const { getPlayers } = jest.requireMock('./utils/getPlayers.js')

jest.mock('./utils/getPumpkinOfYear.js')
const { getPumpkinOfYear } = jest.requireMock('./utils/getPumpkinOfYear.js')

jest.mock('./utils/getStatsMessage.js')
const { getStatsMessage } = jest.requireMock('./utils/getStatsMessage.js')

jest.mock('./utils/getWinner.js')
const { getWinner } = jest.requireMock('./utils/getWinner.js')

describe('#createPumpkinModule', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a pumpkin module', () => {
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
      jest.useFakeTimers()
      jest
        .spyOn(global, 'setTimeout')
        .mockImplementation((cb) => cb() as unknown as NodeJS.Timeout)
      jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
    })

    afterEach(() => {
      jest.useRealTimers()
      jest.spyOn(global.Math, 'random').mockRestore()
    })

    it('should set winner and reply with winner', async () => {
      jest.setSystemTime(new Date('2023-04-14T22:08:00'))
      getPlayers.mockResolvedValueOnce([
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Feeling pumpkiny today? You should, @john\\_doe',
          },
          signal: undefined,
        },
      ])
      expect(getPlayers).toHaveBeenCalledWith('123')
      expect(getWinner).toHaveBeenCalledWith('123', new Date())
      expect(addWinner).toHaveBeenCalledWith('player-1-id', new Date())
    })

    it('should do nothing in private chat', async () => {
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

    it('should reply with earlier winner', async () => {
      jest.setSystemTime(new Date('2023-04-14T22:08:00'))
      getPlayers.mockResolvedValueOnce([
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
      getWinner.mockResolvedValueOnce({
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: "As I see, today's pumpkin is @jane\\_doe\\!",
          },
          signal: undefined,
        },
      ])
      expect(getPlayers).toHaveBeenCalledWith('123')
      expect(getWinner).toHaveBeenCalledWith('123', new Date())
      expect(addWinner).not.toHaveBeenCalled()
    })

    it('should reply with suggestion to add players', async () => {
      getPlayers.mockResolvedValueOnce([])
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Add with /pumpkin\\_join',
          },
          signal: undefined,
        },
      ])
      expect(getPlayers).toHaveBeenCalledWith('123')
      expect(getWinner).not.toHaveBeenCalled()
      expect(addWinner).not.toHaveBeenCalled()
    })

    it('should reply with suggestion to see year winner', async () => {
      jest.setSystemTime(new Date('2023-12-31T22:08:00'))
      getPlayers.mockResolvedValueOnce([
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'Almost forgot\\.\\.\\. Happy New Year, pumpkins\\!\nFind out who won: /pumpkin\\_2023',
          },
          signal: undefined,
        },
      ])
      expect(getPlayers).toHaveBeenCalledWith('123')
      expect(getWinner).toHaveBeenCalledWith('123', new Date())
      expect(addWinner).toHaveBeenCalledWith('player-1-id', new Date())
    })
  })

  describe('/pumpkin_join', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
    })

    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore()
    })

    it('should call getOrAddPlayer and reply with hello', async () => {
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            text: 'Jambo',
          },
          signal: undefined,
        },
      ])
      expect(getOrAddPlayer).toHaveBeenCalledWith('123', '1')
    })

    it('should do nothing in private chat', async () => {
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
    it('should call getStatsMessage and reply with its result', async () => {
      getStatsMessage.mockResolvedValueOnce('stats message')
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'stats message',
          },
          signal: undefined,
        },
      ])
      expect(getStatsMessage).toHaveBeenCalledWith('123')
    })

    it('should do nothing in private chat', async () => {
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
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should call getStatsMessage with current year and reply with its result', async () => {
      jest.setSystemTime(new Date('2023-04-14T22:08:00'))
      getStatsMessage.mockResolvedValueOnce('stats message')
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'stats message',
          },
          signal: undefined,
        },
      ])
      expect(getStatsMessage).toHaveBeenCalledWith('123', 2023)
    })

    it('should do nothing in private chat', async () => {
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
    it('should call getPumpkinOfYear and reply with its result', async () => {
      getPumpkinOfYear.mockResolvedValueOnce('winner message')
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: 'winner message',
          },
          signal: undefined,
        },
      ])
      expect(getPumpkinOfYear).toHaveBeenCalledWith('123', 2023)
    })

    it('should do nothing in private chat', async () => {
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
      jest.spyOn(global.Math, 'random').mockRestore()
    })

    it('should reply if user is winner and random < 0.1', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.05)
      getWinner.mockResolvedValueOnce({
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
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            reply_to_message_id: 1365,
            text: 'Another day, another pumpkin\\!',
          },
          signal: undefined,
        },
      ])
    })

    it('should not reply if user is winner but random > 0.1', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.2)
      getWinner.mockResolvedValueOnce({
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

    it('should not reply if user is not winner', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.05)
      getWinner.mockResolvedValueOnce({
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

    it('should not reply if no winner selected', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.05)
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

    it('should do nothing in private chat', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.05)
      getWinner.mockResolvedValueOnce({
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
      expect(getWinner).not.toHaveBeenCalled()
    })
  })
})
