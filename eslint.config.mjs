import { defineConfig, globalIgnores } from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': ['error', 'app/'],
    },
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  },
  {
    files: ['**/*.{js,cjs}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
