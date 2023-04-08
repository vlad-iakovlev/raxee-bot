import { Composer } from 'grammy'
import { createVoiceModule } from '.'
import { mockGrammyBot } from '../../testUtils/mockGrammyBot'

describe('#createVoiceModule', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should return a voice module', () => {
    const module = createVoiceModule()

    expect(module.commands).toStrictEqual([])
    expect(module.composer).toBeInstanceOf(Composer)
  })

  it('should reply with sticker when receiving a voice message', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
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
      { method: 'getMe', payload: undefined, signal: undefined },
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
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
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
      { method: 'getMe', payload: undefined, signal: undefined },
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
})
