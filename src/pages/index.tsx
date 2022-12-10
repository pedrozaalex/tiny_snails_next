import { createProxySSGHelpers } from '@trpc/react-query/ssg';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import SuperJSON from 'superjson';
import { AppHero } from '../components/Hero';
import { PopularSnails } from '../components/PopularSnails';
import SnailForm from '../components/SnailForm';
import { appRouter } from '../server/routers/_app';
import { db } from '../utils/db';
import { REDIRECT_BASE_URL } from '../utils/urls';

type Props = {
    baseUrl: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const ssg = createProxySSGHelpers({
        router: appRouter,
        transformer: SuperJSON,
        ctx: {
            db,
            req: undefined,
            session: null,
            visitorId: undefined,
            isNewUser: false,
        },
    });

    await ssg.snail.getPopular.prefetch();

    return {
        props: {
            trpcState: ssg.dehydrate(),
            baseUrl: REDIRECT_BASE_URL,
        },
        revalidate: 60,
    };
};

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { baseUrl } = props;

    return (
        <>
            <Head>
                <title>tiny snails</title>
            </Head>

            <AppHero />

            <SnailForm baseUrl={baseUrl} />

            <PopularSnails />
        </>
    );
};

export default Home;
