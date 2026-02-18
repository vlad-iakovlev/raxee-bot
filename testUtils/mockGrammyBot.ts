import { AbortSignal } from 'abort-controller'
import { Bot } from 'grammy'

type MockGrammyBotRequest = {
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

  bot.botInfo = {
    id: 42,
    first_name: 'Test Bot',
    is_bot: true,
    username: 'bot',
    can_join_groups: true,
    can_read_all_group_messages: true,
    supports_inline_queries: false,
    can_connect_to_business: false,
    has_main_web_app: false,
    has_topics_enabled: false,
    allows_users_to_create_topics: false,
  }

  return {
    bot,
    requests,
  }
}
