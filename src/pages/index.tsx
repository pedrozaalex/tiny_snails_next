import { createProxySSGHelpers } from '@trpc/react-query/ssg';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import SuperJSON from 'superjson';
import { AppHero } from '../components/Hero';
import { PopularSnails } from '../components/PopularSnails';
import SnailForm from '../components/SnailForm';
import { appRouter } from '../server/routers/_app';
import { db } from '../utils/db';

type Props = {
    baseUrl: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const ssg = createProxySSGHelpers({
        router: appRouter,
        transformer: SuperJSON,
        ctx: { db, req: undefined },
    });

    await ssg.snail.getPopular.prefetch();

    return {
        props: {
            trpcState: ssg.dehydrate(),
            baseUrl: 'tny-snls.xyz/',
        },
        revalidate: 60,
    };
};

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { baseUrl } = props;

    return (
        <>
            <AppHero />

            <SnailForm baseUrl={baseUrl} />

            <PopularSnails />
        </>
    );
};

export default Home;
