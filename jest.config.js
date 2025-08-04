/** @type {import("jest").Config} */
const jestConfig = {
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@vlad-yakovlev/grammy-reply-with-markdown|@vlad-yakovlev/poker|@vlad-yakovlev/telegram-md)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['!**/node_modules/**', '**/*.ts', '!bin/*.ts'],
  coverageProvider: 'v8',
}

export default jestConfig
