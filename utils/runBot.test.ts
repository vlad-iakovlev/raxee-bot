import { initUserMiddleware } from '../middleware/initUser.js'
import { BotModule } from '../types/module.js'
import { handleError } from './handleError.js'
import { runBot } from './runBot.js'

jest.mock('grammy')
const { Bot } = jest.requireMock('grammy')
Bot.prototype.api = {
  setMyCommands: jest.fn(),
}

describe('#runBot', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create bot', async () => {
    const modules: BotModule[] = [
      {
        commands: [
          {
            command: 'test1',
            description: 'First test command',
          },
          {
            command: 'test2',
            description: 'Second test command',
          },
        ],
        composer: jest.fn() as unknown as BotModule['composer'],
      },
      {
        commands: [
          {
            command: 'test3',
            description: 'Third test command',
          },
        ],
        composer: jest.fn() as unknown as BotModule['composer'],
      },
    ]

    await runBot({
      botToken: '12345',
      modules,
    })

    expect(Bot).toBeCalledWith('12345')
    expect(Bot.prototype.api.setMyCommands).toBeCalledWith([
      ...modules[0].commands,
      ...modules[1].commands,
    ])
    expect(Bot.prototype.use).toBeCalledWith(
      initUserMiddleware,
      modules[0].composer,
      modules[1].composer
    )
    expect(Bot.prototype.catch).lastCalledWith(handleError)
    expect(Bot.prototype.start).toBeCalledWith()
  })
})
