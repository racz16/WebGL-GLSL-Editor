import { IRedirection } from '../interfaces';

export const documentationRedirections: Array<IRedirection> = [
    {
        from: 'dFdy',
        to: 'dFdx',
    },
    {
        from: 'floatBitsToUint',
        to: 'floatBitsToInt',
    },
    {
        from: 'uintBitsToFloat',
        to: 'intBitsToFloat',
    },
    {
        from: 'packUnorm2x16',
        to: 'packUnorm',
    },
    {
        from: 'packSnorm2x16',
        to: 'packUnorm',
    },
    {
        from: 'unpackUnorm2x16',
        to: 'unpackUnorm',
    },
    {
        from: 'unpackSnorm2x16',
        to: 'unpackUnorm',
    },
];
