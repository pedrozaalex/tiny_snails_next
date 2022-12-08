import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { nanoid } from 'nanoid';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { db } from '../utils/db';

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (
    opts?: trpcNext.CreateNextContextOptions
) => {
    const session = opts?.req
        ? await unstable_getServerSession(opts.req, opts.res, authOptions)
        : null;

    const visitorId = session
        ? undefined
        : opts?.req.cookies.visitorId ?? nanoid();

    return {
        req: opts?.req,
        db,
        session,
        visitorId,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
