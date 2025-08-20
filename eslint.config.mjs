// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 6,
            sourceType: 'module',
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-extraneous-class': 'off',
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'enumMember',
                    format: ['UPPER_CASE'],
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
                {
                    selector: 'variableLike',
                    format: ['camelCase'],
                },
                {
                    selector: 'parameter',
                    modifiers: ['unused'],
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'method',
                    format: ['camelCase'],
                },
            ],
            eqeqeq: ['error', 'smart'],
            curly: 'warn',
        },
    },
    {
        ignores: ['.vscode-test', '.vscode-test-web', 'node_modules', 'dist', '**/*.js', '**/*.d.ts'],
    }
);
