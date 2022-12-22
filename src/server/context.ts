import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { nanoid } from 'nanoid';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { db } from '../utils/db';

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
    const session = opts?.req ? await unstable_getServerSession(opts.req, opts.res, authOptions) : null;

    const isAuthenticated = !!session?.user;
    const hasVisitorId = opts?.req.cookies.visitorId;

    const visitorId = (() => {
        // If the user already has a visitorId, we don't need to generate a new one.
        if (hasVisitorId) {
            return opts.req.cookies.visitorId;
        }

        // If the user already is authenticated, we don't need to generate a new visitorId.
        if (isAuthenticated) {
            return undefined;
        }

        return nanoid();
    })();

    return {
        req: opts?.req,
        db,
        session,
        visitorId,
        isNewUser: !hasVisitorId && isAuthenticated,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function setVisitorIdIfUnauthenticated({ ctx }: { ctx?: Context }) {
    if (!ctx) return {};

    if (ctx.session) return {};

    // If the user is not authenticated, the visitorId should always be set.
    if (!ctx.visitorId) {
        throw new Error('Failed to generate visitorId');
    }

    if (ctx.isNewUser) {
        return {
            headers: {
                'Set-Cookie':
                    'visitorId=null; path=/; HttpOnly; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT',
            },
        };
    }

    return {
        headers: {
            'Set-Cookie': `visitorId=${ctx.visitorId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000`,
        },
    };
}
