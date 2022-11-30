import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../db/client';

const handler: NextApiHandler = async (req, res) => {
    const slug = req.query['slug'];

    if (!slug || typeof slug !== 'string') {
        return res.status(404).json({ error: 'Missing slug' });
    }

    const data = await prisma.snail.findFirst({
        where: { alias: { equals: slug } },
    });

    if (!data) {
        return res.status(404).json({ error: 'Not found' });
    }

    return res.json(data);
};

export default handler;
