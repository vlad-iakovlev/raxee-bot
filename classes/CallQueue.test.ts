import { CallQueue } from './CallQueue.js'

describe('CallQueue', () => {
  let queue: CallQueue

  beforeEach(() => {
    queue = new CallQueue()
    jest.clearAllMocks()
  })

  describe('#add', () => {
    it('should add callback to queue', async () => {
      const cb = jest.fn().mockResolvedValue(undefined)

      queue.add(cb)
      queue.add(cb)
      queue.add(cb)

      await queue.queue

      expect(cb).toHaveBeenCalledTimes(3)
    })

    it('should not fail if callback fails', async () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {})

      const cb = jest.fn().mockRejectedValue('test-error')

      queue.add(cb)
      queue.add(cb)
      queue.add(cb)

      await queue.queue

      expect(cb).toHaveBeenCalledTimes(3)
      expect((console.error as jest.Mock).mock.calls).toStrictEqual([
        ['test-error'],
        ['test-error'],
        ['test-error'],
      ])
    })

    it('should wait for previous callbacks to finish', async () => {
      const cb = jest.fn().mockResolvedValue(undefined)

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
