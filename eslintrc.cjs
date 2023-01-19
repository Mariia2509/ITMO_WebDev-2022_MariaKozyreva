module.exports = {
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        //'prettier', //отключаем prettier если подключен eslint
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        // override/add rules settings here, such as:
        //'no-unused-vars': 'warn',
        //'vue/no-unused-vars': 'error',
        //'vue/no-multiple-template-root': 'off',
        // 'prettier/prettier': 'error',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
    },
}