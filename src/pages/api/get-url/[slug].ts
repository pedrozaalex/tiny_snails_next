import { NextApiHandler } from 'next';

import { db } from '../../../utils/db';

const handler: NextApiHandler = async (req, res) => {
    const slug = req.query['slug'];

    if (!slug || typeof slug !== 'string') {
        return res.status(404).json({ error: 'Missing slug' });
    }

    const data = await db.snail.findFirst({
        where: { alias: { equals: slug } },
    });

    if (!data) {
        return res.status(404).json({ error: 'Not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=300'); // Cache for 5 minutes, swr for another 5

    return res.json(data);
};

export default handler;
