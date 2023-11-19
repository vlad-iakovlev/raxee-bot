import { replyWithMarkdownPlugin } from '@vlad-yakovlev/grammy-reply-with-markdown'
import * as fns from 'date-fns'
import { Composer, Context } from 'grammy'
import { BotModule } from '../../types/module.js'
import { getMention } from '../../utils/getMention.js'
import { getRandomItem } from '../../utils/getRandomItem.js'
import { interpolate } from '../../utils/interpolate.js'
import { PumpkinStringsManager } from './classes/PumpkinStringsManager.js'
import { addWinner } from './utils/addWinner.js'
import { getIsDec31 } from './utils/getIsDec31.js'
import { getOrAddPlayer } from './utils/getOrAddPlayer.js'
import { getPlayers } from './utils/getPlayers.js'
import { getPumpkinOfYear } from './utils/getPumpkinOfYear.js'
import { getStatsMessage } from './utils/getStatsMessage.js'
import { getWinner } from './utils/getWinner.js'

const createComposer = () => {
  const bot = new Composer(replyWithMarkdownPlugin())

  bot.chatType(['group', 'supergroup']).command('pumpkin', async (ctx) => {
    const strings = await PumpkinStringsManager.load(String(ctx.chat.id))
    const players = await getPlayers(String(ctx.chat.id))

    if (!players.length) {
      await ctx.replyWithMarkdown(strings.get('notEnoughPlayers'), {
        disable_notification: true,
      })
      return
    }

    const date = new Date()

    const earlyWinner = await getWinner(String(ctx.chat.id), date)
    if (earlyWinner) {
      await ctx.replyWithMarkdown(
        interpolate(strings.get('earlyWinner'), getMention(earlyWinner.user)),
        { disable_notification: true },
      )
      return
    }

    const winner = getRandomItem(players)
    await addWinner(winner.id, date)

    await ctx.replyWithMarkdown(
      interpolate(strings.get('newWinner1'), getMention(winner.user)),
      { disable_notification: true },
    )

    await new Promise((resolve) => setTimeout(resolve, 2500))
    await ctx.replyWithMarkdown(
      interpolate(strings.get('newWinner2'), getMention(winner.user)),
      { disable_notification: true },
    )

    await new Promise((resolve) => setTimeout(resolve, 2500))
    await ctx.replyWithMarkdown(
      interpolate(strings.get('newWinner3'), getMention(winner.user)),
      { disable_notification: true },
    )

    await new Promise((resolve) => setTimeout(resolve, 4000))
    await ctx.replyWithMarkdown(
      interpolate(strings.get('newWinner4'), getMention(winner.user)),
      { disable_notification: true },
    )

    if (getIsDec31(date)) {
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await ctx.replyWithMarkdown(
        interpolate(
          strings.get('newWinnerNewYear'),
          getMention(winner.user),
          fns.getYear(date),
        ),
        { disable_notification: true },
      )
    }
  })

  bot.chatType(['group', 'supergroup']).command('pumpkin_join', async (ctx) => {
    const strings = await PumpkinStringsManager.load(String(ctx.chat.id))

    await getOrAddPlayer(String(ctx.chat.id), String(ctx.from.id))

    await ctx.replyWithMarkdown(strings.get('hello'), {
      disable_notification: true,
      reply_to_message_id: ctx.message.message_id,
    })
  })

  bot
    .chatType(['group', 'supergroup'])
    .command('pumpkin_stats', async (ctx) => {
      await ctx.replyWithMarkdown(await getStatsMessage(String(ctx.chat.id)), {
        disable_notification: true,
      })
    })

  bot
    .chatType(['group', 'supergroup'])
    .command('pumpkin_stats_year', async (ctx) => {
      await ctx.replyWithMarkdown(
        await getStatsMessage(String(ctx.chat.id), fns.getYear(new Date())),
        { disable_notification: true },
      )
    })

  // TODO: https://grammy.dev/plugins/command-filter.html
  ;[2020, 2021, 2022, 2023].forEach((year) => {
    bot
      .chatType(['group', 'supergroup'])
      .command(`pumpkin_${year}`, async (ctx) => {
        await ctx.replyWithMarkdown(
          await getPumpkinOfYear(String(ctx.chat.id), year),
          {
            disable_notification: true,
          },
        )
      })
  })

  bot.chatType(['group', 'supergroup']).on('message', async (ctx, next) => {
    const strings = await PumpkinStringsManager.load(String(ctx.chat.id))
    const winner = await getWinner(String(ctx.chat.id), new Date())

    if (winner?.user.tgUserId === String(ctx.from.id) && Math.random() < 0.1) {
      await ctx.replyWithMarkdown(strings.get('replyForWinner'), {
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
      description: 'Find the Pumpkin of the Day [group]',
    },
    {
      command: 'pumpkin_join',
      description: 'Join the Pumpkin of the Day game [group]',
    },
    {
      command: 'pumpkin_stats',
      description: 'View Pumpkin of the Day statistics [group]',
    },
    {
      command: 'pumpkin_stats_year',
      description:
        'View Pumpkin of the Day statistics for the current year [group]',
    },
  ],
  composer: createComposer(),
})
