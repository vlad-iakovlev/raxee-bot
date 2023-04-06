import { BotError } from 'grammy'

export const handleError = async (err: BotError) => {
  try {
    const { ctx, error } = err
    console.error(`Error while handling update ${ctx.update.update_id}:`, error)
    await ctx.reply('Something went wrong ¯\\_(ツ)_/¯')
  } catch (error) {
    console.error(error)
  }
}
