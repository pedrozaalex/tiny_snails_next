import * as trpcNext from '@trpc/server/adapters/next';
import { nanoid } from 'nanoid';
import { createContext } from '../../../server/context';
import { appRouter } from '../../../server/routers/_app';

export const config = {
    runtime: 'nodejs',
};

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
    responseMeta: function setVisitorIdIfUnauthenticated({ ctx }) {
        if (!ctx?.session && !ctx?.visitorId) {
            return {
                headers: {
                    'Set-Cookie': `visitorId=${nanoid()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=31536000`,
                },
            };
        }

        return {};
    },
    onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            // send to bug reporting
            console.error('Something went wrong', error);
        }
    },
});
