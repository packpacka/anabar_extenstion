module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "tsconfig.json"
  },
  extends: [
    require.resolve('@csssr/linters/eslint/base'),
    require.resolve('@csssr/linters/eslint/react'),
    require.resolve('@csssr/linters/eslint/typescript'),
  ],
  plugins: ['@typescript-eslint', 'eslint-plugin-import', 'react-hooks'],
  rules: {
    /** Непонятно зачем нужно, TS и так хорошо выводит типы */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',

    /** Не особо понятно зачем нужно если есть правило @typescript-eslint/no-floating-promises */
    'promise/catch-or-return': 'off',

    eqeqeq: 'error',
    'prefer-named-capture-group': 'error',
  },
  "globals": {
    "chrome": true
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
}
