import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Session {
        user?: {
            id: string;
        } & DefaultSession['user'];
    }
}
