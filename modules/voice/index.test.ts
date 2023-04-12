import { Composer } from 'grammy'
import { mockGrammyBot } from '~/testUtils/mockGrammyBot.js'
import { createVoiceModule } from './index.js'

describe('#createVoiceModule', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should return a voice module', () => {
    const module = createVoiceModule()

    expect(module.commands).toStrictEqual([])
    expect(module.composer).toBeInstanceOf(Composer)
  })

  describe('on:message:voice, on:message:video_note', () => {
    it('should reply with sticker when receiving a voice message', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createVoiceModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test Group',
          },
          message_id: 1365,
          from: {
            id: 1111111,
            is_bot: false,
            first_name: 'John',
          },
          voice: {
            file_id: 'AwACAgIAAxkBA',
            file_unique_id: 'AgADpQVgLwQAAg',
            duration: 5,
          },
        },
      })

      expect(requests).toStrictEqual([
        {
          method: 'sendSticker',
          payload: {
            chat_id: 1111111,
            sticker:
              'CAACAgIAAxkBAAITWWOsE-EpAkaSTjmANDWs-qKOFQO8AAKfDAACFDf4Shf94QABMrpFZCwE',
          },
          signal: undefined,
        },
      ])
    })

    it('should reply with sticker when receiving a video_note message', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createVoiceModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test Group',
          },
          message_id: 1365,
          from: {
            id: 1111111,
            is_bot: false,
            first_name: 'John',
          },
          video_note: {
            file_id: 'AwACAgIAAxkBA',
            file_unique_id: 'AgADpQVgLwQAAg',
            duration: 5,
            length: 10,
          },
        },
      })

      expect(requests).toStrictEqual([
        {
          method: 'sendSticker',
          payload: {
            chat_id: 1111111,
            sticker:
              'CAACAgIAAxkBAAITWWOsE-EpAkaSTjmANDWs-qKOFQO8AAKfDAACFDf4Shf94QABMrpFZCwE',
          },
          signal: undefined,
        },
      ])
    })

    it('should not reply with sticker when receiving a text message', async () => {
      const { bot, requests } = mockGrammyBot()
      const module = createVoiceModule()
      bot.use(module.composer)
      await bot.init()

      await bot.handleUpdate({
        update_id: 10000,
        message: {
          date: 1441645532,
          chat: {
            id: 1111111,
            type: 'group',
            title: 'Test Group',
          },
          message_id: 1365,
          from: {
            id: 1111111,
            is_bot: false,
            first_name: 'John',
          },
          text: 'Hello',
        },
      })

      expect(requests).toStrictEqual([])
    })
  })
})
