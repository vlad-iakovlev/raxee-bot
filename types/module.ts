import { Composer, Context } from 'grammy'
import { BotCommand } from 'grammy/types'

export type BotModule = {
  commands: BotCommand[]
  composer: Composer<Context>
}
