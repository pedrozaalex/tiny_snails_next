import { inferRouterInputs } from '@trpc/server';
import { NextPage } from 'next';
import NextHead from 'next/head';
import { useCallback, useState } from 'react';
import { ArrowLeftIcon } from '../../components/ArrowLeftIcon';
import { ArrowRightIcon } from '../../components/ArrowRightIcon';
import { SnailsAnalytics } from '../../components/SnailsAnalytics';
import { Table } from '../../components/Table';
import { useAppNavigation } from '../../hooks/useNavigation';
import { AppRouter } from '../../server/routers/_app';
import { trpc } from '../../utils/trpc';

type GetMySnailsInput = inferRouterInputs<AppRouter>['snail']['getMine'];

const useMySnailsState = () => {
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState<GetMySnailsInput['sortBy']>('alias');
    const [order, setOrder] = useState<GetMySnailsInput['order']>('asc');

    const onPrevPageClick = useCallback(() => {
        setPage((p) => Math.max(0, p - 1));
    }, []);

    const onNextPageClick = useCallback(() => {
        setPage((p) => p + 1);
    }, []);

    const onTableHeaderClick = useCallback(
        (clickedProp: GetMySnailsInput['sortBy']) => {
            setOrder((o) =>
                sortBy === clickedProp ? toggleAscDesc(o) : 'asc'
            );
            setSortBy(clickedProp);
        },
        [sortBy]
    );

    return {
        page,
        sortBy,
        order,
        onPrevPageClick,
        onNextPageClick,
        onTableHeaderClick,
    };
};

const toggleAscDesc = (order: GetMySnailsInput['order']) =>
    order === 'asc' ? 'desc' : 'asc';

const Head = () => (
    <NextHead>
        <title>your snails</title>
    </NextHead>
);

const MySnailsPage: NextPage = () => {
    const { navigateTo } = useAppNavigation();

    const {
        page,
        sortBy,
        order,
        onPrevPageClick,
        onNextPageClick,
        onTableHeaderClick,
    } = useMySnailsState();

    const { data, error, isLoading } = trpc.snail.getMine.useQuery({
        page,
        sortBy,
        order,
    });

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

            <SnailsAnalytics />

            <Table
                loading={isLoading}
                objects={data?.snails ?? []}
                properties={['alias', 'url', 'clicks']}
                onHeaderClick={onTableHeaderClick}
                selectedSortBy={sortBy}
                order={order}
            />

            <div className="flex justify-center gap-2">
                <button
                    type="button"
                    className="btn-accent btn-square btn"
                    disabled={isLoading || page === 0}
                    onClick={onPrevPageClick}
                >
                    <ArrowLeftIcon />
                </button>

                <button
                    type="button"
                    className="btn-accent btn-square btn"
                    disabled={isLoading || data?.hasNextPage === false}
                    onClick={onNextPageClick}
                >
                    <ArrowRightIcon />
                </button>
            </div>
        </>
    );
};

export default MySnailsPage;
