import { router } from '../trpc';
import { snailRouter } from './snail';

export const appRouter = router({
    snail: snailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
