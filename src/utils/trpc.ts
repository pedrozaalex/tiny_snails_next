import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { BASE_URL } from './index';
import type { AppRouter } from '../server/routers/_app';

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            links: [
                // adds pretty logs to your console in development and logs errors in production
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
            /**
             * @link https://tanstack.com/query/v4/docs/reference/QueryClient
             **/
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     **/
    ssr: true,
});
