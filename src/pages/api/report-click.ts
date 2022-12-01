import { NextApiHandler } from 'next';
import { z } from 'zod';

import { db } from '../../utils/db';

const bodySchema = z.object({
    snailId: z.number(),
    ip: z.string().optional(),
    secret: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
    const body = bodySchema.parse(
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    );

    console.log('report click body', body);

    const { snailId, ip, secret } = body;

    if (secret !== process.env.SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('report click handler', snailId, ip);

    if (!snailId) {
        return res.status(400).json({ error: 'Missing snail id' });
    }

    const data = await db.click.create({
        data: {
            snailId,
            ip,
        },
    });

    return res.json(data);
};

export default handler;
