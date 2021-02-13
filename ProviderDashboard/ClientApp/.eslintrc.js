module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    window: true,
    document: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  extends: ['plugin:react/recommended', 'airbnb', 'eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    'max-depth': ['error', 4],
    'max-len': ['error', { code: 120, ignoreTrailingComments: true, ignoreStrings: true }],
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-children-prop': 'error',
    'react/no-danger': 'off',
    'react/no-did-update-set-state': 'warn',
    'react/prop-types': 0,
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'react/static-property-placement': 'off',
    'spaced-comment': 'error',
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],

    // Remove following rules disabling, when related errors are fixed
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'no-restricted-syntax': 'off',
    'no-prototype-builtins': 'off',
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off',
  },
};
