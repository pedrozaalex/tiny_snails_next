import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { InferGetStaticPropsType } from 'next';
import { Hero } from '../components/Hero';
import SnailForm from '../components/SnailForm';
import { SnailList } from '../components/SnailList';
import { createContext } from '../server/context';
import { appRouter } from '../server/routers/_app';
import { trpc } from '../utils/trpc';

export const getStaticProps = async () => {
    const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: createContext(),
    });

    await ssg.snail.getPopular.prefetch();

    return {
        props: { baseUrl: process.env.BASE_URL, trpcState: ssg.dehydrate() },
        revalidate: 1,
    };
};

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { baseUrl } = props;

    const popularSnailsQuery = trpc.snail.getPopular.useQuery();

    const { mutate: createSnail, isLoading: isCreating } =
        trpc.snail.create.useMutation();

    if (popularSnailsQuery.status !== 'success') {
        return null;
    }

    const { data: snails } = popularSnailsQuery;

    return (
        <div className="container max-w-3xl mx-auto py-12 px-8 flex flex-col gap-12">
            <Hero />

            <SnailForm
                baseUrl={baseUrl}
                onSubmit={createSnail}
                loading={isCreating}
            />

            <SnailList snails={snails} />
        </div>
    );
};

export default Home;
