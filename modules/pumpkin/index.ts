import { asyncPause } from 'async-pause'
import * as fns from 'date-fns'
import { Composer, Context } from 'grammy'
import { replyWithMarkdownPlugin } from 'grammy-reply-with-markdown'
import { BotModule } from '../../types/module.js'
import { getMention } from '../../utils/getMention.js'
import { getRandomItem } from '../../utils/getRandomItem.js'
import { interpolate } from '../../utils/interpolate.js'
import { PumpkinManager } from './classes/PumpkinManager.js'
import { STRINGS } from './constants.js'
import { getIsDec31 } from './utils/getIsDec31.js'
import { getStatsMessage } from './utils/getStatsMessage.js'
import { getWinnerOfYearMessage } from './utils/getWinnerOfYearMessage.js'

const createComposer = () => {
  const bot = new Composer(replyWithMarkdownPlugin())

  bot.chatType(['group', 'supergroup']).command('pumpkin', async (ctx) => {
    const players = await PumpkinManager.findPlayers(ctx.chat.id)
    if (!players.length) {
      await ctx.replyWithMarkdown(STRINGS.notEnoughPlayers, {
        disable_notification: true,
      })
      return
    }

    const date = new Date()

    const earlyWinner = await PumpkinManager.findWinner(ctx.chat.id, date)
    if (earlyWinner) {
      await ctx.replyWithMarkdown(
        interpolate(STRINGS.earlyWinner, getMention(earlyWinner.user)),
        { disable_notification: true }
      )
      return
    }

    const winner = getRandomItem(players)
    await PumpkinManager.createWinner(winner.id, date)

    await ctx.replyWithMarkdown(
      interpolate(getRandomItem(STRINGS.newWinner1), getMention(winner.user)),
      { disable_notification: true }
    )
    await asyncPause(2500)
    await ctx.replyWithMarkdown(
      interpolate(getRandomItem(STRINGS.newWinner2), getMention(winner.user)),
      { disable_notification: true }
    )
    await asyncPause(2500)
    await ctx.replyWithMarkdown(
      interpolate(getRandomItem(STRINGS.newWinner3), getMention(winner.user)),
      { disable_notification: true }
    )
    await asyncPause(4000)
    await ctx.replyWithMarkdown(
      interpolate(getRandomItem(STRINGS.newWinner4), getMention(winner.user)),
      { disable_notification: true }
    )

    if (getIsDec31(date)) {
      await asyncPause(10000)
      await ctx.replyWithMarkdown(
        interpolate(
          STRINGS.newWinnerNewYear,
          getMention(winner.user),
          fns.getYear(date)
        ),
        { disable_notification: true }
      )
    }
  })

  bot.chatType(['group', 'supergroup']).command('pumpkin_join', async (ctx) => {
    await PumpkinManager.findOrCreatePlayer(ctx.chat.id, ctx.from.id)
    await ctx.replyWithMarkdown(getRandomItem(STRINGS.hello), {
      disable_notification: true,
      reply_to_message_id: ctx.message.message_id,
    })
  })

  bot
    .chatType(['group', 'supergroup'])
    .command('pumpkin_stats', async (ctx) => {
      await ctx.replyWithMarkdown(await getStatsMessage(ctx.chat.id), {
        disable_notification: true,
      })
    })

  bot
    .chatType(['group', 'supergroup'])
    .command('pumpkin_stats_year', async (ctx) => {
      await ctx.replyWithMarkdown(
        await getStatsMessage(ctx.chat.id, fns.getYear(new Date())),
        { disable_notification: true }
      )
    })

  // TODO: https://grammy.dev/plugins/command-filter.html
  void [2020, 2021, 2022, 2023].forEach((year) => {
    bot
      .chatType(['group', 'supergroup'])
      .command(`pumpkin_${year}`, async (ctx) => {
        await ctx.replyWithMarkdown(
          await getWinnerOfYearMessage(ctx.chat.id, year),
          { disable_notification: true }
        )
      })
  })

  bot.chatType(['group', 'supergroup']).on('message', async (ctx, next) => {
    const winner = await PumpkinManager.findWinner(ctx.chat.id, new Date())

    if (winner?.user.tgUserId === ctx.from.id && Math.random() < 0.1) {
      await ctx.replyWithMarkdown(getRandomItem(STRINGS.replyWinner), {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
    }

    await next()
  })

  return bot as unknown as Composer<Context>
}

export const createPumpkinModule = (): BotModule => ({
  commands: [
    {
      command: 'pumpkin',
      description: 'Search for pumpkin of the day [group]',
    },
    {
      command: 'pumpkin_join',
      description: 'Join pumpkin of the day [group]',
    },
    {
      command: 'pumpkin_stats',
      description: 'See pumpkin statistics [group]',
    },
    {
      command: 'pumpkin_stats_year',
      description: 'See pumpkin statistics for current year [group]',
    },
  ],
  composer: createComposer(),
})
