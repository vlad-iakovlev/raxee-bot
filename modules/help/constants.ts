import { md } from 'telegram-md'

export const STRINGS = {
  help: md.join(
    [
      md`Welcome to the ${md.bold('Raxee Bot')}!`,
      '',
      'Explore the exciting features available in group chats:',
      '\u2022 Enjoy the "Pumpkin of the Day" game by typing /pumpkin',
      '\u2022 Engage in a game of Poker with /poker_start',
      '',
      md`Find the source code on ${md.link(
        'GitHub',
        'https://github.com/vlad-yakovlev/raxee-bot'
      )}`,
    ],
    '\n'
  ),
}
