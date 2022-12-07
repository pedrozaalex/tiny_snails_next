import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Table } from '../../components/Table';
import { useAppNavigation } from '../../hooks/useNavigation';
import { getVisitorId } from '../../utils/cookies';
import { trpc } from '../../utils/trpc';

const MySnailsPage: NextPage = () => {
    const { navigateTo } = useAppNavigation();
    const { data: sessionData } = useSession();

    const {
        data: mySnails,
        error,
        isLoading,
    } = trpc.snail.getMine.useQuery(sessionData?.user?.id ?? getVisitorId());

    if (error) {
        return <>error: {error.message}</>;
    }

    if (isLoading) {
        return <>loading...</>;
    }

    if (mySnails.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-8 text-center">
                <h1 className="text-4xl font-bold">
                    you have no snails yet :(
                </h1>
                <button
                    type="button"
                    className="btn-accent btn"
                    onClick={() => void navigateTo.home()}
                >
                    create one
                </button>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-4xl font-bold">my snails</h1>

            <Table
                objects={mySnails}
                properties={[
                    {
                        key: 'alias',
                        label: 'alias',
                    },
                    {
                        key: 'url',
                        label: 'url',
                    },
                    {
                        key: 'clicks',
                        label: 'clicks',
                    },
                ]}
            />
        </>
    );
};

export default MySnailsPage;
