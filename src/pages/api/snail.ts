import { Snail } from '@prisma/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../utils/db';

const filterableProperties: (keyof Snail)[] = ['alias', 'url'];

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const params = req.query;

    const query = Object.fromEntries(
        Object.entries(params).filter(([key]) => filterableProperties.includes(key as keyof Snail))
    );

    const data = await db.snail.findMany({
        where: query,
    });

    if (data.length === 0) {
        return res.status(404).json({ error: 'Not found' });
    }

    // Cache for 5 minutes, swr for another 5
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=3600');

    return res.json(data);
};

export default handler;
