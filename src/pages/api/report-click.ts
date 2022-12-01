import { NextApiHandler } from 'next';

import { db } from '../../utils/db';

const handler: NextApiHandler = async (req, res) => {
    const { snailId, ip, secret } = JSON.parse(req.body);

    if (secret !== process.env.SECRET_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('report click handler', snailId, ip);

    if (!snailId) {
        return res.status(400).json({ error: 'Missing snail id' });
    }

    const data = await db.click.create({
        data: {
            snailId: parseInt(snailId),
            ip,
        },
    });

    return res.json(data);
};

export default handler;
