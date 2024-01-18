module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    es6: true,
    es2022: true,
  },
  globals: {
    window: true,
    module: true,
  },
  overrides: [
    {
      files: ['**/*.cjs'],
      env: {
        node: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
  },
  ignorePatterns: ['/build/*', 'craco.config.js'],
  rules: {
    'no-extra-boolean-cast': 'off',
    'no-useless-escape': 'off',
    'react/prop-types': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-case-declarations': 'off',
    'no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    'no-console': 'off',
    'typescript-eslint/no-unused-vars': 'off',
    'typescript-eslint': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
