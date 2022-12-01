import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import '../../styles/globals.css';
import Layout from '../components/layout';
import { trpc } from '../utils/trpc';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Analytics />
        </>
    );
};

export default trpc.withTRPC(App);
