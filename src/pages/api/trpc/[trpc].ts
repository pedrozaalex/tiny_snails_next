import * as trpcNext from '@trpc/server/adapters/next';
import {
    createContext,
    setVisitorIdIfUnauthenticated,
} from '../../../server/context';
import { appRouter } from '../../../server/routers/_app';

export const config = {
    runtime: 'nodejs',
};

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
    responseMeta: setVisitorIdIfUnauthenticated,
    onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            // send to bug reporting
            console.error('Something went wrong', error);
        }
    },
});
