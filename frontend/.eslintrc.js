module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
    serviceworker: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jest/all',
    'plugin:testing-library/react',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true,
  rules: {
    camelcase: 'error',
    'no-console': 'warn',
    'jest/no-hooks': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'jest/prefer-expect-assertions': 0,
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};
