import { Composer } from 'grammy'
import { mockGrammyBot } from '../../testUtils/mockGrammyBot.js'
import { createHelpModule } from './index.js'

describe('#createPokerModule', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return a help module', () => {
    const module = createHelpModule()

    expect(module.commands).toStrictEqual([
      {
        command: 'help',
        description: 'Show help',
      },
    ])
    expect(module.composer).toBeInstanceOf(Composer)
  })

  describe('/start', () => {
    it('should reply with help message', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createHelpModule()
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

      expect(requests).toStrictEqual([
        {
          method: 'sendMessage',
          payload: {
            chat_id: 123456789,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: 'MarkdownV2',
            text: [
              'Welcome to the *Raxee Bot*\\!',
              '',
              'Explore the exciting features available in group chats:',
              '\u2022 Enjoy the "Pumpkin of the Day" game by typing /pumpkin',
              '\u2022 Engage in a game of Poker with /poker\\_start',
              '',
              'Find the source code on [GitHub](https://github\\.com/vlad\\-yakovlev/raxee\\-bot)',
            ].join('\n'),
          },
          signal: undefined,
        },
      ])
    })
  })

  describe('/help', () => {
    it('should reply with help message', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createHelpModule()
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
          text: '/help',
          entities: [
            {
              offset: 0,
              length: 5,
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
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: 'MarkdownV2',
            text: [
              'Welcome to the *Raxee Bot*\\!',
              '',
              'Explore the exciting features available in group chats:',
              '\u2022 Enjoy the "Pumpkin of the Day" game by typing /pumpkin',
              '\u2022 Engage in a game of Poker with /poker\\_start',
              '',
              'Find the source code on [GitHub](https://github\\.com/vlad\\-yakovlev/raxee\\-bot)',
            ].join('\n'),
          },
          signal: undefined,
        },
      ])
    })
  })
})
