import { NextApiHandler } from 'next';
import { createClickSchema } from '../../schemas';

import { db } from '../../utils/db';

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const reqBody = typeof req.body === 'string' ? (JSON.parse(req.body) as unknown) : (req.body as unknown);

    const parseResult = createClickSchema.safeParse(reqBody);

    if (!parseResult.success) {
        return res.status(400).json({ error: 'Bad request' });
    }

    const { snailAlias, ip, secret } = parseResult.data;

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
