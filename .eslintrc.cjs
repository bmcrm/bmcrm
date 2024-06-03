module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks'],
  rules: {
    indent: [2, 2],
    quotes: [2, 'single'],
    'react-refresh/only-export-components': [
      1,
      { allowConstantExport: true },
    ],
    'react-hooks/rules-of-hooks': 2,
    'object-curly-spacing': [2, 'always'],
    '@typescript-eslint/indent': [2, 2],
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'max-len': [2, { code: 150, ignoreComments: true }],
  },
}
