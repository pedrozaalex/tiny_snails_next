import { createProxySSGHelpers } from '@trpc/react-query/ssg';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AppHero } from '../components/Hero';
import { PopularSnails } from '../components/PopularSnails';
import SnailForm from '../components/SnailForm';
import { appRouter } from '../server/routers/_app';
import { trpc } from '../utils/trpc';
import { db } from '../utils/db';
import SuperJSON from 'superjson';

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

    const {
        mutate: createSnail,
        isLoading: isCreating,
        error,
        reset: clearCreateError,
    } = trpc.snail.create.useMutation();

    return (
        <>
            <AppHero />

            <SnailForm
                baseUrl={baseUrl}
                onSubmit={createSnail}
                loading={isCreating}
                error={error}
                clearError={clearCreateError}
            />

            <PopularSnails />
        </>
    );
};

export default Home;
