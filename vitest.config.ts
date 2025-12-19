import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/test/setup.ts'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html', 'lcov'],
                exclude: [
                    'node_modules/',
                    'src/test/',
                    '**/*.spec.ts',
                    '**/*.spec.tsx',
                    '**/*.d.ts',
                    'vite.config.ts',
                    'vitest.config.ts',
                    'panda.config.ts',
                    'postcss.config.cjs',
                    '.prettierrc.cjs',
                    'leather-styles/',
                ],
                thresholds: {
                    lines: 60,
                    functions: 60,
                    branches: 60,
                    statements: 60,
                },
            },
        },
    })
);
