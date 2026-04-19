import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    exclude: [...configDefaults.exclude, 'prisma/generated/**'],
    coverage: {
      exclude: ['eslint.config.ts', 'prisma/generated/**'],
    },
  },
})
