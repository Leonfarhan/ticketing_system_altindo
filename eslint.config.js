import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const config = {
    parser: parser.name,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: ['./tsconfig.json'], // Menyesuaikan path ke tsconfig.json
        tsconfigRootDir: __dirname,
    },
    extends: [
        js.configs.recommended.rules,
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ].map(c => (typeof c === 'string' ? c : c.extends)), // Flattening the extends

    plugins: {
        react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        '@typescript-eslint': tseslint,
    },

    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
            extends: [
                'plugin:react/jsx-runtime', //  menghilangkan react in jsx scope,
            ],
            rules: {
                'react/prop-types': 'off', // Menonaktifkan prop-types karena menggunakan TypeScript
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-empty-interface': 'off',


                // Menonaktifkan beberapa aturan unsafe-* untuk fleksibilitas:
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-floating-promises': 'off', //tambahan floating promises
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off', //tambahan restrict-template-expressions
                '@typescript-eslint/unbound-method': 'off', //tambahan unbound-method
                '@typescript-eslint/no-misused-promises': 'off', //tambahan no-misused-promises
                '@typescript-eslint/no-non-null-assertion': 'off', //tambahan no-non-null-assertion
                '@typescript-eslint/ban-ts-comment': 'off', //tambahan ban-ts-comment
                '@typescript-eslint/require-await': 'off', //tambahan require-await
                'react/jsx-key': ['warn', { "checkFragmentShorthand": true }], // Memeriksa juga fragment shorthand

                'no-console': 'warn',

            },
        },
        {
            files: ['backend/**/*.ts'],
            rules: {
            },
        },
    ],

    settings: {
        react: {
            version: 'detect',
        },
    },

    // Konfigurasi global (jika diperlukan)
    env: {
        browser: true,
        node: true, //tambahan node
    },

};

export default config;