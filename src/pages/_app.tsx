import { Analytics } from '@vercel/analytics/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../../styles/globals.css';
import Layout from '../components/layout';
import { ToastCenter } from '../components/ToastCenter';
import { trpc } from '../utils/trpc';

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
                <ToastCenter />
            </Layout>
            <Analytics />
        </SessionProvider>
    );
};

export default trpc.withTRPC(App);
