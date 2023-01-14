import { Poppins } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps as NextProps } from 'next/app';
import '../../styles/globals.css';
import { Layout } from '../components/Layout';
import { ToastProvider } from '../contexts/ToastContext';
import { trpc } from '../utils/trpc';

type AppProps = NextProps<{ session: Session }>;

const poppins = Poppins({
    weight: ['400', '700'],
    display: 'swap',
});

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${poppins.style.fontFamily};
                }
            `}</style>

            <SessionProvider session={pageProps.session}>
                <ToastProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <Analytics />
                </ToastProvider>
            </SessionProvider>
        </>
    );
};

export default trpc.withTRPC(App);
