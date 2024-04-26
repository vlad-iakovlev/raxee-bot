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
            business_connection_id: undefined,
            chat_id: 123456789,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: [
              'Welcome to the *Raxee Bot*\\!',
              '',
              'Explore the exciting features available:',
              '',
              '*Pumpkin of the Day* \\(in group chats\\):',
              '\u2022 To find the Pumpkin of the Day, type /pumpkin',
              '\u2022 To join the game, type /pumpkin\\_join',
              '\u2022 To see all\\-time statistics, type /pumpkin\\_stats',
              '\u2022 To see statistics for the current year, type /pumpkin\\_stats\\_year',
              '',
              '*Poker* \\(in group chats\\):',
              '\u2022 To join a game, type /poker\\_join',
              '\u2022 To start a game, type /poker\\_start',
              '\u2022 To stop a game, type /poker\\_stop',
              '',
              '*Poker rules:*',
              "The game follows the rules of [Texas Hold'em](https://en\\.wikipedia\\.org/wiki/Texas\\_hold\\_%27em)\\.",
              'When the game starts, the normal keyboard is replaced by a poker keyboard:',
              '\u2022 The first row shows the table cards;',
              '\u2022 The second row shows the total pot for the round;',
              '\u2022 The third row shows your cards and balance;',
              `\u2022 The fourth row shows the available actions: ❌ Fold, ✊ Check, ✅ Call, 💰 All in\\.`,
              `To make a ⏫ Raise, type a number in the chat\\. For example, "100" if you want to bet 100 🪙\\.`,
              '',
              'If you have any questions, feel free to contact me @vladiakovlevdev',
              '',
              'Find the source code on [GitHub](https://github\\.com/vlad\\-iakovlev/raxee\\-bot)',
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
            business_connection_id: undefined,
            chat_id: 123456789,
            disable_notification: true,
            parse_mode: 'MarkdownV2',
            text: [
              'Welcome to the *Raxee Bot*\\!',
              '',
              'Explore the exciting features available:',
              '',
              '*Pumpkin of the Day* \\(in group chats\\):',
              '\u2022 To find the Pumpkin of the Day, type /pumpkin',
              '\u2022 To join the game, type /pumpkin\\_join',
              '\u2022 To see all\\-time statistics, type /pumpkin\\_stats',
              '\u2022 To see statistics for the current year, type /pumpkin\\_stats\\_year',
              '',
              '*Poker* \\(in group chats\\):',
              '\u2022 To join a game, type /poker\\_join',
              '\u2022 To start a game, type /poker\\_start',
              '\u2022 To stop a game, type /poker\\_stop',
              '',
              '*Poker rules:*',
              "The game follows the rules of [Texas Hold'em](https://en\\.wikipedia\\.org/wiki/Texas\\_hold\\_%27em)\\.",
              'When the game starts, the normal keyboard is replaced by a poker keyboard:',
              '\u2022 The first row shows the table cards;',
              '\u2022 The second row shows the total pot for the round;',
              '\u2022 The third row shows your cards and balance;',
              `\u2022 The fourth row shows the available actions: ❌ Fold, ✊ Check, ✅ Call, 💰 All in\\.`,
              `To make a ⏫ Raise, type a number in the chat\\. For example, "100" if you want to bet 100 🪙\\.`,
              '',
              'If you have any questions, feel free to contact me @vladiakovlevdev',
              '',
              'Find the source code on [GitHub](https://github\\.com/vlad\\-iakovlev/raxee\\-bot)',
            ].join('\n'),
          },
          signal: undefined,
        },
      ])
    })
  })
})
