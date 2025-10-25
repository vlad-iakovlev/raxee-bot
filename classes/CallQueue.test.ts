import { Mock, beforeEach, describe, expect, test, vi } from 'vitest'
import { CallQueue } from './CallQueue.js'

describe('CallQueue', () => {
  let queue: CallQueue

  beforeEach(() => {
    queue = new CallQueue()
  })

  describe('#add', () => {
    test('should add callback to queue', async () => {
      const cb = vi.fn().mockResolvedValue(undefined)

      queue.add(cb)
      queue.add(cb)
      queue.add(cb)

      await queue.queue

      expect(cb).toHaveBeenCalledTimes(3)
    })

    test('should not fail if callback fails', async () => {
      vi.spyOn(global.console, 'error').mockImplementation(() => {})

      const cb = vi.fn().mockRejectedValue('test-error')

      queue.add(cb)
      queue.add(cb)
      queue.add(cb)

      await queue.queue

      expect(cb).toHaveBeenCalledTimes(3)
      expect((console.error as Mock).mock.calls).toStrictEqual([
        ['test-error'],
        ['test-error'],
        ['test-error'],
      ])
    })

    test('should wait for previous callbacks to finish', async () => {
      const cb = vi.fn().mockResolvedValue(undefined)

      queue.add(cb)

      await queue.queue

      queue.add(cb)
      queue.add(cb)

      expect(cb).toHaveBeenCalledTimes(1)

      await queue.queue

      expect(cb).toHaveBeenCalledTimes(3)
    })
  })
})
