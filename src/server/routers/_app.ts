import { router } from '../trpc';
import { clickRouter } from './click';
import { snailRouter } from './snail';
import { userRouter } from './user';

export const appRouter = router({
    snail: snailRouter,
    click: clickRouter,
    user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
