module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'operator-linebreak': 'off',
    'react/prop-types': 0,
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'react/no-array-index-key': 'off',
  },
};
