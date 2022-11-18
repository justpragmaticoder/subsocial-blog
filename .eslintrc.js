module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: '.',
        createDefaultProgram: true,
    },
    extends: ['airbnb-typescript/base', 'plugin:prettier/recommended', 'plugin:security/recommended', 'plugin:@typescript-eslint/eslint-recommended', 'prettier'],
    env: {
        node: true,
        jest: true
    },
    root: true,
    plugins: ['import', 'prettier','@typescript-eslint/eslint-plugin']
};