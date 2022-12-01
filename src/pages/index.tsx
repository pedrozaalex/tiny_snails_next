import { GetServerSideProps, NextPage } from 'next';
import { Hero } from '../components/Hero';
import SnailForm from '../components/SnailForm';
import { SnailList } from '../components/SnailList';
import { trpc } from '../utils/trpc';

type Props = { baseUrl: string | null };

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => ({ props: { baseUrl: 'tny.xyz' } });

const Home: NextPage<Props> = ({ baseUrl }) => {
    const utils = trpc.useContext();

    const createSnail = trpc.snail.create.useMutation({
        onMutate: () => utils.snail.invalidate(),
    });

    return (
        <div className="container max-w-3xl mx-auto py-12 px-8 flex flex-col gap-12">
            <Hero />

            <SnailForm onSubmit={createSnail.mutate} baseUrl={baseUrl} />

            <SnailList />
        </div>
    );
};

export default Home;
