import { BotError, Context } from 'grammy'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { handleError } from './handleError.js'

afterEach(() => {
  vi.spyOn(global.console, 'error').mockRestore()
})

describe('#handleError', () => {
  test('should console error and send reply', async () => {
    const error = new Error('some error')

    const consoleError = vi.fn()
    const reply = vi.fn()

    vi.spyOn(global.console, 'error').mockImplementation(consoleError)

    await handleError(
      new BotError(error, {
        reply,
        update: { update_id: 12345 },
      } as unknown as Context),
    )

    expect(consoleError).toHaveBeenCalledTimes(1)
    expect(consoleError).toHaveBeenCalledWith(
      'Error while handling update 12345:',
      error,
    )

    expect(reply).toHaveBeenCalledTimes(1)
    expect(reply).toHaveBeenCalledWith('Something went wrong ¯\\_(ツ)_/¯')
  })

  test('should handle send reply error', async () => {
    const error = new Error('some error')
    const replyError = new Error('reply error')

    const consoleError = vi.fn()
    const reply = vi.fn().mockImplementation(() => {
      throw replyError
    })

    vi.spyOn(global.console, 'error').mockImplementation(consoleError)

    await handleError(
      new BotError(error, {
        reply,
        update: { update_id: 12345 },
      } as unknown as Context),
    )

    expect(consoleError).toHaveBeenCalledTimes(2)
    expect(consoleError.mock.calls[0]).toStrictEqual([
      'Error while handling update 12345:',
      error,
    ])
    expect(consoleError.mock.calls[1]).toStrictEqual([replyError])

    expect(reply).toHaveBeenCalledTimes(1)
    expect(reply).toHaveBeenCalledWith('Something went wrong ¯\\_(ツ)_/¯')
  })
})
