import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createSnailSchema } from '../../schemas';
import { procedure, router } from '../trpc';

export const snailRouter = router({
    create: procedure
        .input(createSnailSchema)
        .mutation(async ({ input, ctx }) => {
            if (
                !input.alias ||
                typeof input.alias !== 'string' ||
                input.alias.length === 0
            ) {
                input.alias = Math.random().toString(36).substring(2, 8);
            }

            const userId = ctx.session?.user?.id ?? ctx.visitorId;

            if (!userId) {
                // We throw because either the user is not authenticated and we
                // failed to generate a visitorId.
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message:
                        'An unexpected error occurred, please try again later.',
                });
            }

            try {
                const snail = await ctx.db.snail.create({
                    data: {
                        alias: input.alias,
                        url: input.url,
                        userId,
                    },
                    select: {
                        alias: true,
                        createdAt: true,
                        url: true,
                    },
                });

                return snail;
            } catch (error) {
                if (
                    error instanceof PrismaClientKnownRequestError &&
                    error.code === 'P2002'
                ) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'alias already in use!',
                        cause: error,
                    });
                }

                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message:
                        'An unexpected error occurred, please try again later.',
                    cause: error,
                });
            }
        }),

    getByAlias: procedure.input(z.string()).query(async ({ input, ctx }) => {
        const data = await ctx.db.snail.findFirst({
            where: { alias: { equals: input } },
            select: {
                alias: true,
                createdAt: true,
                url: true,
                owner: {
                    select: {
                        name: true,
                    },
                },
                _count: {
                    select: {
                        clicks: true,
                    },
                },
            },
        });

        if (!data) {
            return null;
        }

        return {
            alias: data.alias,
            createdAt: data.createdAt,
            url: data.url,
            clicks: data._count.clicks,
            owner: data.owner?.name ?? 'anonymous',
        };
    }),

    getPopular: procedure.query(async ({ ctx }) => {
        const data = await ctx.db.snail.findMany({
            take: 10,
            orderBy: {
                clicks: {
                    _count: 'desc',
                },
            },
            select: {
                alias: true,
                createdAt: true,
                url: true,
                _count: {
                    select: {
                        clicks: true,
                    },
                },
            },
        });

        return data.map((snail) => ({
            alias: snail.alias,
            createdAt: snail.createdAt,
            url: snail.url,
            clicks: snail._count.clicks,
        }));
    }),

    getMine: procedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user?.id ?? ctx.visitorId;

        if (!userId) return [];

        const data = await ctx.db.snail.findMany({
            where: { userId },
            select: {
                alias: true,
                createdAt: true,
                url: true,
                _count: {
                    select: {
                        clicks: true,
                    },
                },
            },
        });

        return data.map((snail) => ({
            alias: snail.alias,
            createdAt: snail.createdAt,
            url: snail.url,
            clicks: snail._count.clicks,
        }));
    }),

    delete: procedure.input(z.string()).mutation(async ({ input, ctx }) => {
        await ctx.db.click.deleteMany({
            where: { alias: input },
        });

        const data = await ctx.db.snail.delete({
            where: { alias: input },
            select: {
                alias: true,
                createdAt: true,
                url: true,
            },
        });

        return data;
    }),

    requestVisitorSnailOwnership: procedure.mutation(async ({ ctx }) => {
        const visitorId = ctx.visitorId;

        if (!visitorId) {
            return null;
        }

        const userId = ctx.session?.user?.id;

        if (!userId) {
            return null;
        }

        const data = await ctx.db.snail.updateMany({
            where: { userId: visitorId },
            data: { userId },
        });

        return data;
    }),
});
