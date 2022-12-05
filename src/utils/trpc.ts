import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { BASE_URL } from './urls';
import type { AppRouter } from '../server/routers/_app';
import SuperJSON from 'superjson';

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            transformer: SuperJSON,
            links: [
                // adds pretty logs in development and logs errors in production
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === 'development' ||
                        (opts.direction === 'down' &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${BASE_URL}/api/trpc`,
                }),
            ],
        };
    },
});
