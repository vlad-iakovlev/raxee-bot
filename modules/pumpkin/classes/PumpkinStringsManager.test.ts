import { md } from '@vlad-yakovlev/telegram-md'
import { PumpkinStringsManager } from './PumpkinStringsManager.js'

jest.mock('../../../utils/prisma.js', () => ({
  prisma: {
    pumpkinStrings: {
      findFirst: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.js')

describe('PumpkinStringsManager', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#constructor', () => {
    it('should set chatStrings', () => {
      const chatStrings = { hello: ['hello'] }
      const manager = new PumpkinStringsManager(chatStrings)

      expect(manager.chatStrings).toBe(chatStrings)
    })
  })

  describe('#load', () => {
    it('should load chat strings', async () => {
      const tgChatId = '123'
      const chatStrings = { hello: ['hello'] }
      prisma.pumpkinStrings.findFirst.mockResolvedValue(chatStrings)

      const manager = await PumpkinStringsManager.load(tgChatId)

      expect(manager.chatStrings).toBe(chatStrings)
    })

    it('should set empty object if no chat strings', async () => {
      const tgChatId = '123'
      prisma.pumpkinStrings.findFirst.mockResolvedValue(null)

      const manager = await PumpkinStringsManager.load(tgChatId)

      expect(manager.chatStrings).toEqual({})
    })
  })

  describe('#get', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
    })

    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore()
    })

    it('should return random chat string', () => {
      const manager = new PumpkinStringsManager({
        hello: ['hello *world*', 'hello *test*', 'hello *foo*', 'hello *bar*'],
      })

      expect(manager.get('hello')).toStrictEqual(md`hello ${md.bold('test')}`)
    })

    it('should return random string if no chat string', () => {
      const manager = new PumpkinStringsManager({})

      expect(manager.get('hello')).toStrictEqual('Jambo')
    })

    it('should return random string if chat strings array is empty', () => {
      const manager = new PumpkinStringsManager({ hello: [] })

      expect(manager.get('hello')).toStrictEqual('Jambo')
    })
  })
})
