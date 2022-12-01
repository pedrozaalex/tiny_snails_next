import { z } from 'zod';
import { procedure, router } from '../trpc';

export const snailRouter = router({
    create: procedure
        .input(
            z.object({
                url: z.string().url(),
                alias: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (
                !input.alias ||
                typeof input.alias !== 'string' ||
                input.alias.length === 0
            ) {
                input.alias = Math.random().toString(36).substring(2, 8);
            }

            const snail = await ctx.db.snail.create({
                data: {
                    alias: input.alias,
                    url: input.url,
                },
            });

            return snail;
        }),

    getByAlias: procedure.input(z.string()).query(async ({ input, ctx }) => {
        const data = await ctx.db.snail.findFirst({
            where: { alias: { equals: input } },
        });

        if (!data) {
            return null;
        }

        return data;
    }),

    getPopular: procedure.query(({ ctx }) => {
        return ctx.db.snail.findMany({
            take: 10,
            orderBy: {
                clicks: {
                    _count: 'desc',
                },
            },
            select: {
                id: true,
                alias: true,
                _count: {
                    select: {
                        clicks: true,
                    },
                },
            },
        });
    }),
});
