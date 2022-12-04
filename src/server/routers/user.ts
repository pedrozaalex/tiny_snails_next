import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { signupSchema } from '../../schemas';
import { procedure, router } from '../trpc';

export const userRouter = router({
    signup: procedure.input(signupSchema).mutation(async ({ input, ctx }) => {
        const { email, password } = input;

        const exists = await ctx.db.user.findFirst({
            where: { email },
        });

        if (exists) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'User already exists.',
            });
        }

        const hashedPassword = await hash(password);

        const result = await ctx.db.user.create({
            data: { email, password: hashedPassword },
        });

        return {
            status: 201,
            message: 'Account created successfully',
            result: result.email,
        };
    }),
});
