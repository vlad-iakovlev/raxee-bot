import { createVoiceModule } from '.'

jest.mock('grammy')
const { Composer } = jest.requireMock('grammy')

describe('#createVoiceModule', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should reply with sticker', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)

    // Step 1: check the return value of the function
    const module = createVoiceModule()

    expect(module.commands).toStrictEqual([])
    expect(module.composer).toBeInstanceOf(Composer)
    expect(Composer).toBeCalledWith()
    expect(Composer.prototype.on).toBeCalledWith(
      ['message:voice', 'message:video_note'],
      expect.any(Function)
    )

    // Step 2: Check sticker sending
    const ctx = { replyWithSticker: jest.fn() } as any
    const next = jest.fn()

    await Composer.prototype.on.mock.calls[0][1](ctx, next)

    expect(ctx.replyWithSticker).toBeCalledWith(
      'CAACAgIAAxkBAAITWWOsE-EpAkaSTjmANDWs-qKOFQO8AAKfDAACFDf4Shf94QABMrpFZCwE'
    )
    expect(next).toBeCalledWith()
  })
})
