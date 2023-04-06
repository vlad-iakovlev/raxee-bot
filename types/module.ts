import { Composer, Context } from 'grammy'
import { BotCommand } from 'grammy/types'

export interface BotModule {
  commands: BotCommand[]
  composer: Composer<Context>
}
