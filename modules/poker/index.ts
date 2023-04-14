import { Composer, Context } from 'grammy'
import { replyWithMarkdownPlugin } from 'grammy-reply-with-markdown'
import { BotModule } from '../../types/module.js'
import { PokerStateManager } from './classes/PokerStateManager.js'
import { MESSAGES } from './constants.js'

const createComposer = () => {
  const bot = new Composer(replyWithMarkdownPlugin())

  bot.chatType('private').command('start', async (ctx, next) => {
    if (ctx.match === 'poker') {
      await ctx.replyWithMarkdown(MESSAGES.start.help, {
        disable_web_page_preview: true,
      })
      return
    }

    await next()
  })

  bot.chatType(['group', 'supergroup']).command('poker_join', async (ctx) => {
    const senderPokerState = await PokerStateManager.loadByTgUserId(
      ctx.from.id,
      ctx.api
    )

    if (senderPokerState) {
      if (senderPokerState.tgChatId === ctx.chat.id) {
        await ctx.replyWithMarkdown(MESSAGES.pokerReg.duplicateSameChat, {
          disable_notification: true,
          reply_to_message_id: ctx.message.message_id,
        })
      } else {
        await ctx.replyWithMarkdown(MESSAGES.pokerReg.duplicateOtherChat, {
          disable_notification: true,
          reply_to_message_id: ctx.message.message_id,
        })
      }
      return
    }

    const pokerState = await PokerStateManager.loadByTgChatIdOrCreate(
      ctx.chat.id,
      ctx.api
    )

    if (pokerState.dealsCount > 0) {
      await ctx.replyWithMarkdown(MESSAGES.pokerReg.alreadyStarted, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    if (pokerState.players.length >= 10) {
      await ctx.replyWithMarkdown(MESSAGES.pokerReg.tooMany, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    await pokerState.addPlayer(ctx.from.id)

    await ctx.replyWithMarkdown(MESSAGES.pokerReg.registered, {
      disable_notification: true,
      reply_to_message_id: ctx.message.message_id,
    })
  })

  bot.chatType(['group', 'supergroup']).command('poker_start', async (ctx) => {
    const pokerState = await PokerStateManager.loadByTgChatIdOrCreate(
      ctx.chat.id,
      ctx.api
    )

    if (pokerState.dealsCount > 0) {
      await ctx.replyWithMarkdown(MESSAGES.pokerStart.alreadyStarted, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    if (pokerState.players.length < 2) {
      await ctx.replyWithMarkdown(MESSAGES.pokerStart.tooFew, {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      })
      return
    }

    await pokerState.dealCards()

    await ctx.replyWithMarkdown(MESSAGES.pokerStart.started, {
      disable_notification: true,
      reply_to_message_id: ctx.message.message_id,
    })
  })

  bot.chatType(['group', 'supergroup']).command('poker_stop', async (ctx) => {
    const pokerState = await PokerStateManager.loadByTgChatIdOrCreate(
      ctx.chat.id,
      ctx.api
    )
    await pokerState.endGame()

    await ctx.replyWithMarkdown(
      pokerState.dealsCount > 0
        ? MESSAGES.pokerStopGroup.stopped
        : MESSAGES.pokerStopGroup.cancelled,
      {
        disable_notification: true,
        reply_to_message_id: ctx.message.message_id,
      }
    )
  })

  bot.chatType('private').command('poker_stop', async (ctx) => {
    const senderPokerState = await PokerStateManager.loadByTgUserId(
      ctx.from.id,
      ctx.api
    )

    if (senderPokerState) {
      await senderPokerState.endGame()
    } else {
      await ctx.replyWithMarkdown(MESSAGES.pokerStopPrivate.notFound)
    }
  })

  bot.chatType('private').on('message:text', async (ctx, next) => {
    const senderPokerState = await PokerStateManager.loadByTgUserId(
      ctx.from.id,
      ctx.api
    )

    if (senderPokerState) {
      const sender = senderPokerState.players.find(
        (player) => player.user.tgUserId === ctx.from.id
      )
      // istanbul ignore next
      if (!sender) throw new Error('Player not found')

      const message = ctx.message.text

      if (senderPokerState.currentPlayer.id === sender.id) {
        const reply = await senderPokerState.handleMessage(sender, message)
        if (reply) await ctx.replyWithMarkdown(reply)
      } else {
        await ctx.replyWithMarkdown(MESSAGES.onMessage.wrongTurn)
        await senderPokerState.broadcastPlayerMessage(sender, message)
      }
    }

    await next()
  })

  return bot as unknown as Composer<Context>
}

export const createPokerModule = (): BotModule => ({
  commands: [
    {
      command: 'poker_join',
      description: 'Join the game [group]',
    },
    {
      command: 'poker_start',
      description: 'Start the game [group]',
    },
    {
      command: 'poker_stop',
      description: 'Stop the game [private/group]',
    },
  ],
  composer: createComposer(),
})
