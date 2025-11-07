import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  ...compat.config({
    env: { node: true, browser: true },
    extends: [
      'plugin:vue/vue3-recommended',
      '@vue/eslint-config-typescript',
      '@vue/eslint-config-prettier',
    ],
    parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
    rules: { 'vue/multi-word-component-names': 'off' },
  }),
]
