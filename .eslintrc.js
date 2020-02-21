// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  // Settings for TypeScript linting
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  env: {
    browser: true,
    jest: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/base',
    'plugin:vue/strongly-recommended',
    'prettier',
    'prettier/vue'
  ],
  // required to lint *.vue files
  plugins: ['@typescript-eslint', 'vue'],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-return-await': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    '@typescript-eslint/member-delimiter-style': 'off'
  }
}
