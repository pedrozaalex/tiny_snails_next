import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { trpc } from '../utils/trpc';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default trpc.withTRPC(App);
