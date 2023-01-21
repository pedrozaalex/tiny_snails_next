import { Snail } from '@prisma/client';
import defaultUsers from './users';

const DEFAULT_SNAILS: Snail[] = [
    {
        alias: 'google',
        url: 'https://google.com',
        createdAt: new Date('2021-01-01'),
        userId: defaultUsers[0].id,
    },
];

export default DEFAULT_SNAILS;
