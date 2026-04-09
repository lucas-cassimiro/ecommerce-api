import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts', 'src/**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'test/', '**/*.d.ts', '**/*.interface.ts'],
    },
    silent: false,
    watch: false,
  },
})
