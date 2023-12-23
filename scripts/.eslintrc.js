module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended', 
    'eslint:recommended'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-undef': 'off',
  }
}
