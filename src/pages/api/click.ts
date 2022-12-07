import { NextApiHandler } from 'next';
import SuperJSON from 'superjson';
import { z } from 'zod';

import { db } from '../../utils/db';

const bodySchema = z.object({
    snailId: z.number(),
    ip: z.string().optional(),
    secret: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = bodySchema.parse(
        typeof req.body === 'string' ? SuperJSON.parse(req.body) : req.body
    );

    const { snailId, ip, secret } = body;

    if (secret !== process.env.SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
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
