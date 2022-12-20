import { NextPage } from 'next';
import NextHead from 'next/head';
import { useReducer } from 'react';
import { ArrowLeftIcon } from '../../components/ArrowLeftIcon';
import { ArrowRightIcon } from '../../components/ArrowRightIcon';
import { MySnailsStats } from '../../components/MySnailsStats';
import { Table } from '../../components/Table';
import { useAppNavigation } from '../../hooks/useNavigation';
import { trpc } from '../../utils/trpc';

const Head = () => (
    <NextHead>
        <title>your snails</title>
    </NextHead>
);

enum Actions {
    INCREMENT_PAGE,
    DECREMENT_PAGE,
}

function pageReducer(page = 0, action: Actions) {
    switch (action) {
        case Actions.INCREMENT_PAGE:
            return page + 1;
        case Actions.DECREMENT_PAGE:
            const newPage = page - 1;
            return newPage >= 0 ? newPage : 0;
        default:
            return page;
    }
}

const MySnailsPage: NextPage = () => {
    const { navigateTo } = useAppNavigation();

    const [page, dispatch] = useReducer(pageReducer, 0);

    const { data, error, isLoading } = trpc.snail.getMine.useQuery({ page });

    if (error) {
        return <>error: {error.message}</>;
    }

    if (data?.snails.length === 0) {
        return (
            <>
                <Head />

                <div className="flex h-full flex-col items-center justify-center gap-8 text-center">
                    <h1 className="text-4xl font-bold">
                        you have no snails yet :(
                    </h1>
                    <button
                        type="button"
                        className="btn-accent btn"
                        onClick={navigateTo.homepage}
                    >
                        create one
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Head />

            <h1 className="text-4xl font-bold">your snails</h1>

            <MySnailsStats />

            <Table
                loading={isLoading}
                objects={data?.snails ?? []}
                properties={['alias', 'url', 'clicks']}
            />

            <div className="flex justify-center gap-2">
                <button
                    type="button"
                    className="btn-accent btn-square btn"
                    disabled={isLoading || page === 0}
                    onClick={() => dispatch(Actions.DECREMENT_PAGE)}
                >
                    <ArrowLeftIcon />
                </button>

                <button
                    type="button"
                    className="btn-accent btn-square btn"
                    disabled={isLoading || data?.hasNextPage === false}
                    onClick={() => dispatch(Actions.INCREMENT_PAGE)}
                >
                    <ArrowRightIcon />
                </button>
            </div>
        </>
    );
};

export default MySnailsPage;
