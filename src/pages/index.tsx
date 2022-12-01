import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import TrophyIcon from '../../public/trophy.png';
import { Hero } from '../components/Hero';
import SnailForm from '../components/SnailForm';
import { SnailList } from '../components/SnailList';
import { trpc } from '../utils/trpc';

export const getServerSideProps = () => {
    return {
        props: { baseUrl: 'tny-snls.xyz/' },
    };
};

const Home = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { baseUrl } = props;

    const popularSnailsQuery = trpc.snail.getPopular.useQuery(undefined, {
        refetchInterval: 60 * 1000,
    });

    const {
        mutate: createSnail,
        isLoading: isCreating,
        error,
        reset: clearCreateError,
    } = trpc.snail.create.useMutation();

    if (popularSnailsQuery.status !== 'success') {
        return null;
    }

    const {
        data: snails,
        refetch: refreshSnailList,
        isRefetching,
    } = popularSnailsQuery;

    return (
        <div className="container max-w-3xl mx-auto py-12 px-8 flex flex-col gap-12">
            <Hero />

            <SnailForm
                baseUrl={baseUrl}
                onSubmit={createSnail}
                loading={isCreating}
                error={error}
                clearError={clearCreateError}
            />

            <section className="flex flex-col items-center text-center">
                <h2 className="text-xl font-bold flex gap-2">
                    top snails
                    <Image
                        src={TrophyIcon}
                        alt="trophy icon"
                        width={24}
                        height={24}
                    />
                </h2>
                <p>see snails other people have created</p>
            </section>

            <SnailList
                snails={snails}
                loading={isRefetching}
                onRefresh={() => void refreshSnailList()}
            />
        </div>
    );
};

export default Home;
