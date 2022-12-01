import { NextApiHandler } from 'next';

import { db } from '../../utils/db';

const handler: NextApiHandler = async (req, res) => {
    const { snailId, ip } = JSON.parse(req.body);

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
