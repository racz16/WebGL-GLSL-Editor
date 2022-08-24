import { IKeyword } from '../interfaces';

export const keywords = new Map<string, Array<IKeyword>>([
    [
        '100',
        [
            {
                name: 'break',
            },
            {
                name: 'continue',
            },
            {
                name: 'do',
            },
            {
                name: 'for',
            },
            {
                name: 'while',
            },
            {
                name: 'if',
            },
            {
                name: 'else',
            },
            {
                name: 'discard',
                stage: 'fragment',
            },
            {
                name: 'return',
            },
            {
                name: 'struct',
            },
            {
                name: 'void',
            },
            {
                name: 'true',
            },
            {
                name: 'false',
            },
        ],
    ],
    [
        '300',
        [
            {
                name: 'break',
            },
            {
                name: 'continue',
            },
            {
                name: 'do',
            },
            {
                name: 'for',
            },
            {
                name: 'while',
            },
            {
                name: 'switch',
            },
            {
                name: 'case',
            },
            {
                name: 'default',
            },
            {
                name: 'if',
            },
            {
                name: 'else',
            },
            {
                name: 'discard',
                stage: 'fragment',
            },
            {
                name: 'return',
            },
            {
                name: 'struct',
            },
            {
                name: 'void',
            },
            {
                name: 'true',
            },
            {
                name: 'false',
            },
        ],
    ],
]);
