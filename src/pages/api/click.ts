import { NextApiHandler } from 'next';
import { z } from 'zod';

import { db } from '../../utils/db';

const bodySchema = z.object({
    snailAlias: z.string(),
    ip: z.string().optional(),
    secret: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = bodySchema.parse(
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    );

    const { snailAlias, ip, secret } = body;

    if (secret !== process.env.SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = await db.click.create({
        data: {
            alias: snailAlias,
            ip,
        },
    });

    return res.json(data);
};

export default handler;
