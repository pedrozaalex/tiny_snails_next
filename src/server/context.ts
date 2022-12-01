import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { db } from '../utils/db';

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (
    opts?: trpcNext.CreateNextContextOptions
) => {
    return {
        req: opts?.req,
        prisma: db,
        snail: db.snail,
        click: db.click,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
