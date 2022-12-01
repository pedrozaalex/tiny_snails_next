import { z } from 'zod';
import { procedure, router } from '../trpc';

export const clickRouter = router({
    report: procedure
        .input(
            z.object({
                snailId: z.number().int(),
                ip: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const click = await ctx.db.click.create({
                data: {
                    ip: input.ip,
                    snailId: input.snailId,
                },
            });

            return click;
        }),
});
