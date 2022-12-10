import { NextPage } from 'next';
import NextHead from 'next/head';
import { useState } from 'react';
import { ArrowLeftIcon } from '../../components/ArrowLeftIcon';
import { ArrowRightIcon } from '../../components/ArrowRightIcon';
import { Table } from '../../components/Table';
import { useAppNavigation } from '../../hooks/useNavigation';
import { trpc } from '../../utils/trpc';

const Head = () => (
    <NextHead>
        <title>your snails</title>
    </NextHead>
);

const MySnailsPage: NextPage = () => {
    const { navigateTo } = useAppNavigation();

    const [page, setPage] = useState(0);

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
                        onClick={() => void navigateTo.home()}
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

            <Table
                loading={isLoading}
                objects={data?.snails ?? []}
                properties={[
                    {
                        key: 'alias',
                        label: 'alias',
                    },
                    {
                        key: 'clicks',
                        label: 'clicks',
                    },
                ]}
            />

            <div className="flex justify-center gap-2">
                <button
                    type="button"
                    className="btn-accent btn-square btn"
                    disabled={page === 0}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    <ArrowLeftIcon />
                </button>

                <button
                    type="button"
                    className="btn-accent btn-square btn"
                    disabled={data?.hasNextPage === false}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    <ArrowRightIcon />
                </button>
            </div>
        </>
    );
};

export default MySnailsPage;
