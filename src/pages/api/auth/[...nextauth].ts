import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';

import { db } from '../../../utils/db';

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
        redirect: ({ url }) => {
            // Send users to the setup page on sign in
            if (url.includes('/auth/signin')) return '/setup';

            return '/';
        },
    },

    adapter: PrismaAdapter(db),

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
            maxAge: 5 * 60 * 60, // How long email links are valid for (5 hours),
        }),
    ],

    theme: {
        colorScheme: 'light',
    },

    pages: {
        signIn: '/auth/signin',
        verifyRequest: '/auth/verify-request', // (used for check email message)
        // error: '/auth/error', // Error code passed in query string as ?error=
    },
};

export default NextAuth(authOptions);
