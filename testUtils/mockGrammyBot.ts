/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbortSignal } from 'abort-controller'
import { Bot } from 'grammy'

interface MockGrammyBotRequest {
  method: string
  payload: any
  signal: AbortSignal | undefined
}

export const mockGrammyBot = () => {
  const requests: MockGrammyBotRequest[] = []

  const bot = new Bot('test')

  bot.api.config.use((prev, method, payload, signal) => {
    requests.push({ method, payload, signal })

    return Promise.resolve({
      ok: true,
      // TODO: make responses more compatible with Telegram API
      result: true as any,
    })
  })

  return {
    bot,
    requests,
  }
}
