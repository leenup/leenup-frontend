module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'jest',
        'unused-imports',
        'tailwindcss',
    ],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'warn',
        'tailwindcss/no-custom-classname': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}