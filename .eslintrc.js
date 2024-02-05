module.exports = {
  extends: eslintExtends(),
  parser: '@typescript-eslint/parser',
  plugins: eslintPlugins(),
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
  rules: eslintRules(),
};

function eslintPlugins() {
  return ['react', 'react-hooks', '@typescript-eslint'];
}

function eslintExtends() {
  return [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ];
}

function eslintRules() {
  return {
    'no-undef': 'off',
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
    'react/jsx-no-undef': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
  };
}
