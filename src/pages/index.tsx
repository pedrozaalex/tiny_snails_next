import { InferGetServerSidePropsType } from 'next';
import { AppHero } from '../components/Hero';
import { PopularSnails } from '../components/PopularSnails';
import SnailForm from '../components/SnailForm';
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
