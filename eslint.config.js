import pluginVue from 'eslint-plugin-vue'
import prettierConfig from '@vue/eslint-config-prettier'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
    ignores: ['dist', 'coverage', 'test-results'],
  },
  prettierConfig,
)
