module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-undef": "off",
    "no-restricted-properties": "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    // "no-unused-vars": ["error", {"argsIgnorePattern": "next"}]
  },
};
