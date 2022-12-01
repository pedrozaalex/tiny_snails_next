import { router } from '../trpc';
import { clickRouter } from './click';
import { snailRouter } from './snail';

export const appRouter = router({
    snail: snailRouter,
    click: clickRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
