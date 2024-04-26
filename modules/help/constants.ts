import { md } from '@vlad-yakovlev/telegram-md'

export const STRINGS = {
  help: md.join(
    [
      md`Welcome to the ${md.bold('Raxee Bot')}!`,
      '',
      'Explore the exciting features available:',
      '',
      md`${md.bold('Pumpkin of the Day')} (in group chats):`,
      '\u2022 To find the Pumpkin of the Day, type /pumpkin',
      '\u2022 To join the game, type /pumpkin_join',
      '\u2022 To see all-time statistics, type /pumpkin_stats',
      '\u2022 To see statistics for the current year, type /pumpkin_stats_year',
      '',
      md`${md.bold('Poker')} (in group chats):`,
      '\u2022 To join a game, type /poker_join',
      '\u2022 To start a game, type /poker_start',
      '\u2022 To stop a game, type /poker_stop',
      '',
      md.bold('Poker rules:'),
      md`The game follows the rules of ${md.link(
        "Texas Hold'em",
        'https://en.wikipedia.org/wiki/Texas_hold_%27em',
      )}.`,
      'When the game starts, the normal keyboard is replaced by a poker keyboard:',
      '\u2022 The first row shows the table cards;',
      '\u2022 The second row shows the total pot for the round;',
      '\u2022 The third row shows your cards and balance;',
      `\u2022 The fourth row shows the available actions: ❌ Fold, ✊ Check, ✅ Call, 💰 All in.`,
      `To make a ⏫ Raise, type a number in the chat. For example, "100" if you want to bet 100 🪙.`,
      '',
      'If you have any questions, feel free to contact me @vladiakovlevdev',
      '',
      md`Find the source code on ${md.link(
        'GitHub',
        'https://github.com/vlad-iakovlev/raxee-bot',
      )}`,
    ],
    '\n',
  ),
}
