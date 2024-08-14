module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/prettier"
  ],

  parserOptions: {
    parser: '@babel/eslint-parser',
  },

  rules: {
    'prettier/prettier': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    "no-unused-vars": "off",
    "no-unused-components": "off",
    'vue/multi-word-component-names': 'off'
  },
};
