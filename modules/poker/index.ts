import { replyWithMarkdownPlugin } from '@vlad-yakovlev/grammy-reply-with-markdown'
import assert from 'assert'
import { Composer, Context } from 'grammy'
import { BotModule } from '../../types/module.js'
import { PokerAdapter } from './classes/PokerAdapter.js'
import { MESSAGES } from './constants.js'

const createComposer = () => {
  const bot = new Composer(replyWithMarkdownPlugin())

  bot.chatType(['group', 'supergroup']).command('poker_join', async (ctx) => {
    const senderAdapter = await PokerAdapter.loadByTgUserId(
      String(ctx.from.id),
      ctx.api,
    )

    if (senderAdapter) {
      if (senderAdapter.tgChatId === String(ctx.chat.id)) {
        await ctx.replyWithMarkdown(MESSAGES.pokerJoin.duplicateSameChat, {
          disable_notification: true,
          reply_to_message_id: ctx.message.message_id,
        })
      } else {
        await ctx.replyWithMarkdown(MESSAGES.pokerJoin.duplicateOtherChat, {
          disable_notification: true,
          reply_to_message_id: ctx.message.message_id,
        })
      }
      return
    }

    const adapter = await PokerAdapter.loadByTgChatIdOrCreate(
      String(ctx.chat.id),
      ctx.api,
    )

    if (adapter.dealsCount > 0) {
      await ctx.replyWithMarkdown(MESSAGES.pokerJoin.alreadyStarted, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    if (adapter.players.length >= 10) {
      await ctx.replyWithMarkdown(MESSAGES.pokerJoin.tooMany, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    await adapter.addPlayer(String(ctx.from.id))

    await ctx.replyWithMarkdown(MESSAGES.pokerJoin.registered, {
      disable_notification: true,
      reply_to_message_id: ctx.message.message_id,
    })
  })

  bot.chatType(['group', 'supergroup']).command('poker_start', async (ctx) => {
    const adapter = await PokerAdapter.loadByTgChatIdOrCreate(
      String(ctx.chat.id),
      ctx.api,
    )

    if (adapter.dealsCount > 0) {
      await ctx.replyWithMarkdown(MESSAGES.pokerStart.alreadyStarted, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    if (adapter.players.length < 2) {
      await ctx.replyWithMarkdown(MESSAGES.pokerStart.tooFew, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    await adapter.dealCards()

    await ctx.replyWithMarkdown(MESSAGES.pokerStart.started, {
      disable_notification: true,
      reply_to_message_id: ctx.message.message_id,
    })
  })

  bot.chatType(['group', 'supergroup']).command('poker_stop', async (ctx) => {
    const adapter = await PokerAdapter.loadByTgChatIdOrCreate(
      String(ctx.chat.id),
      ctx.api,
    )
    await adapter.endGame()

    await ctx.replyWithMarkdown(
      adapter.dealsCount > 0
        ? MESSAGES.pokerStopGroup.stopped
        : MESSAGES.pokerStopGroup.cancelled,
      {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      },
    )
  })

  bot.chatType('private').command('poker_stop', async (ctx) => {
    const senderAdapter = await PokerAdapter.loadByTgUserId(
      String(ctx.from.id),
      ctx.api,
    )

    if (senderAdapter) {
      await senderAdapter.endGame()
    } else {
      await ctx.replyWithMarkdown(MESSAGES.pokerStopPrivate.notFound)
    }
  })

  bot.chatType('private').on('message:text', async (ctx, next) => {
    const senderAdapter = await PokerAdapter.loadByTgUserId(
      String(ctx.from.id),
      ctx.api,
    )

    if (senderAdapter) {
      const sender = senderAdapter.players.find(
        (player) => player.payload.tgUserId === String(ctx.from.id),
      )
      assert(sender, 'Player not found')

      const reply = await senderAdapter.handleMessage(sender, ctx.message.text)
      if (reply) await ctx.replyWithMarkdown(reply)
    }

    await next()
  })

  return bot as unknown as Composer<Context>
}

export const createPokerModule = (): BotModule => ({
  commands: [
    {
      command: 'poker_join',
      description: 'Join the Poker game [group]',
    },
    {
      command: 'poker_start',
      description: 'Begin the Poker game [group]',
    },
    {
      command: 'poker_stop',
      description: 'End the Poker game [private/group]',
    },
  ],
  composer: createComposer(),
})
