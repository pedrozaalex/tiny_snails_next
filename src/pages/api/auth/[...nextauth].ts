import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verify } from 'argon2';

import { db as prisma } from '../../../utils/db';
import { loginSchema } from '../../../schemas';

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },

    adapter: PrismaAdapter(prisma),

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        }),

        EmailProvider({
            name: 'email',
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            maxAge: 5 * 60 * 60, // How long email links are valid for (5 hours)
        }),

        // CredentialsProvider({
        //     name: 'email and password',
        //     credentials: {
        //         email: {
        //             label: 'email',
        //             type: 'text',
        //             placeholder: 'jsmith@example.com',
        //         },
        //         password: { label: 'password', type: 'password' },
        //     },
        //     async authorize(credentials) {
        //         const creds = await loginSchema.parseAsync(credentials);

        //         const user = await prisma.user.findFirst({
        //             where: { email: creds.email },
        //         });

        //         if (!user) {
        //             return null;
        //         }

        //         const isValidPassword = await verify(
        //             user.password ?? '',
        //             creds.password
        //         );

        //         if (!isValidPassword) {
        //             return null;
        //         }

        //         return {
        //             id: user.id,
        //             email: user.email,
        //         };
        //     },
        // }),
    ],
    theme: {
        colorScheme: 'light',
    },
};

export default NextAuth(authOptions);
