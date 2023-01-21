import { Click } from '@prisma/client';
import DEFAULT_SNAILS from './snails';

const DEFAULT_CLICKS: Click[] = [
    {
        alias: DEFAULT_SNAILS[0].alias,
        createdAt: new Date('2021-01-01'),
        id: 1,
        ip: '192.168.0.0',
    },
    {
        alias: DEFAULT_SNAILS[0].alias,
        createdAt: new Date('2021-01-02'),
        id: 2,
        ip: '192.168.0.0',
    },
    {
        alias: DEFAULT_SNAILS[0].alias,
        createdAt: new Date('2021-01-03'),
        id: 3,
        ip: '192.168.0.0',
    },
];

export default DEFAULT_CLICKS;
