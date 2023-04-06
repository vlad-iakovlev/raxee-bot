const mockSetMyCommands = jest.fn()
const mockUse = jest.fn()
const mockCatch = jest.fn()
const mockStart = jest.fn()
const mockBot = jest.fn(() => {
  return {
    api: {
      setMyCommands: mockSetMyCommands,
    },
    use: mockUse,
    catch: mockCatch,
    start: mockStart,
  }
})

jest.mock('grammy', () => ({
  Bot: mockBot,
}))

import { BotModule } from '../types/module'
import { handleError } from './handleError'
import { runBot } from './runBot'

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

    expect(mockBot).toBeCalledWith('12345')
    expect(mockSetMyCommands).toBeCalledWith([
      {
        command: 'test1',
        description: 'First test command',
      },
      {
        command: 'test2',
        description: 'Second test command',
      },
      {
        command: 'test3',
        description: 'Third test command',
      },
    ])
    expect(mockUse).toBeCalledWith(modules[0].composer, modules[1].composer)
    expect(mockCatch).lastCalledWith(handleError)
    expect(mockStart).toBeCalledWith()
  })
})
