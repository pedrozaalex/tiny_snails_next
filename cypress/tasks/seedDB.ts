import { db } from '../../src/utils/db';
import defaultSnails from '../fixtures/snails';
import defaultUsers from '../fixtures/users';
import defaultClicks from '../fixtures/clicks';

export default async function seedDB() {
    await db.user.createMany({ data: defaultUsers });
    await db.snail.createMany({ data: defaultSnails });
    await db.click.createMany({ data: defaultClicks });

    return true;
}
