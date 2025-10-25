import { PumpkinStrings } from '@prisma/client'
import { md } from '@vlad-yakovlev/telegram-md'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { prisma } from '../../../utils/prisma.mock.js'
import { PumpkinStringsManager } from './PumpkinStringsManager.js'

describe('PumpkinStringsManager', () => {
  describe('#constructor', () => {
    test('should set chatStrings', () => {
      const chatStrings = { hello: ['hello'] }
      const manager = new PumpkinStringsManager(chatStrings)

      expect(manager.chatStrings).toBe(chatStrings)
    })
  })

  describe('#load', () => {
    test('should load chat strings', async () => {
      const tgChatId = '123'
      const chatStrings = { hello: ['hello'] } as PumpkinStrings
      prisma.pumpkinStrings.findFirst.mockResolvedValue(chatStrings)

      const manager = await PumpkinStringsManager.load(tgChatId)

      expect(manager.chatStrings).toBe(chatStrings)
    })

    test('should set empty object if no chat strings', async () => {
      const tgChatId = '123'
      prisma.pumpkinStrings.findFirst.mockResolvedValue(null)

      const manager = await PumpkinStringsManager.load(tgChatId)

      expect(manager.chatStrings).toEqual({})
    })
  })

  describe('#get', () => {
    beforeEach(() => {
      vi.spyOn(global.Math, 'random').mockReturnValue(0.3)
    })

    afterEach(() => {
      vi.spyOn(global.Math, 'random').mockRestore()
    })

    test('should return random chat string', () => {
      const manager = new PumpkinStringsManager({
        hello: ['hello *world*', 'hello *test*', 'hello *foo*', 'hello *bar*'],
      })

      expect(manager.get('hello')).toStrictEqual(md`hello ${md.bold('test')}`)
    })

    test('should return random string if no chat string', () => {
      const manager = new PumpkinStringsManager({})

      expect(manager.get('hello')).toStrictEqual('Jambo')
    })

    test('should return random string if chat strings array is empty', () => {
      const manager = new PumpkinStringsManager({ hello: [] })

      expect(manager.get('hello')).toStrictEqual('Jambo')
    })
  })
})
