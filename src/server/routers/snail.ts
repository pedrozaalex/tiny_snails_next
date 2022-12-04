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

            try {
                const snail = await ctx.db.snail.create({
                    data: {
                        alias: input.alias,
                        url: input.url,
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

    getById: procedure.input(z.number().int()).query(async ({ input, ctx }) => {
        const data = await ctx.db.snail.findFirst({
            where: { id: { equals: input } },
            select: {
                id: true,
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

        if (!data) {
            return null;
        }

        return {
            id: data.id,
            alias: data.alias,
            createdAt: data.createdAt,
            url: data.url,
            clicks: data._count.clicks,
        };
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

    getPopular: procedure.query(async ({ ctx }) => {
        const data = await ctx.db.snail.findMany({
            take: 10,
            orderBy: {
                clicks: {
                    _count: 'desc',
                },
            },
            select: {
                id: true,
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
            id: snail.id,
            alias: snail.alias,
            createdAt: snail.createdAt,
            url: snail.url,
            clicks: snail._count.clicks,
        }));
    }),
});
