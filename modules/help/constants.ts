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
      '\u2022 To see current year statistics, type /pumpkin_stats_year',
      '',
      md`${md.bold('Poker')} (in group chats):`,
      '\u2022 To join a game, type /poker_join',
      '\u2022 To start a game, type /poker_start',
      '\u2022 To end a game, type /poker_stop',
      '',
      md.bold('Poker Rules:'),
      md`The game follows ${md.link(
        "Texas Hold'em",
        'https://en.wikipedia.org/wiki/Texas_hold_%27em',
      )} rules.`,
      'Once the game starts, the normal keypad will be replaced with a poker keypad:',
      '\u2022 The first line displays the table cards;',
      '\u2022 The second line displays the total pot for the round;',
      '\u2022 The third line displays your cards and balance;',
      `\u2022 The fourth line displays available actions: ❌ Fold, ✊ Check, ✅ Call, 💰 All in.`,
      `To make a ⏫ Raise, type a number in the chat. For example, "100" if you want to bet 100 🪙.`,
      '',
      'If you have any questions, feel free to contact me @vladyakovlev',
      '',
      md`Find the source code on ${md.link(
        'GitHub',
        'https://github.com/vlad-yakovlev/raxee-bot',
      )}`,
    ],
    '\n',
  ),
}
