import { db } from '../../src/utils/db';

export default async function resetDB() {
    await db.click.deleteMany({});
    await db.snail.deleteMany({});
    await db.user.deleteMany({});

    return true;
}
