import { InferGetServerSidePropsType } from 'next';
import { Hero } from '../components/Hero';
import SnailForm from '../components/SnailForm';
import { SnailList } from '../components/SnailList';
import { trpc } from '../utils/trpc';

export const getServerSideProps = () => {
    return {
        props: { baseUrl: process.env.BASE_URL },
    };
};

const Home = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { baseUrl } = props;

    const popularSnailsQuery = trpc.snail.getPopular.useQuery(undefined, {
        refetchInterval: 60 * 1000,
    });

    const { mutate: createSnail, isLoading: isCreating } =
        trpc.snail.create.useMutation();

    if (popularSnailsQuery.status !== 'success') {
        return null;
    }

    const { data: snails, refetch: refreshSnailList } = popularSnailsQuery;

    return (
        <div className="container max-w-3xl mx-auto py-12 px-8 flex flex-col gap-12">
            <Hero />

            <SnailForm
                baseUrl={baseUrl}
                onSubmit={createSnail}
                loading={isCreating}
            />

            <SnailList snails={snails} onRefresh={refreshSnailList} />
        </div>
    );
};

export default Home;
