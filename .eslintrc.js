module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    uni: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 'off',
  },
}
