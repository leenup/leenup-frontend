module.exports = {
  root: true,
  env: { node: true, browser: true },
  extends: ['plugin:vue/vue3-recommended','@vue/eslint-config-typescript','@vue/eslint-config-prettier'],
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  rules: { 'vue/multi-word-component-names': 'off' },
}