import { NextPage } from 'next';
import { useEffect } from 'react';
import { Spinner } from '../components/Spinner';
import { useAppNavigation } from '../hooks/useNavigation';
import { trpc } from '../utils/trpc';

const SetupPage: NextPage = () => {
    const { navigateTo } = useAppNavigation();
    const { error, mutate: sendRequest } =
        trpc.snail.requestVisitorSnailOwnership.useMutation({
            onSuccess: navigateTo.homepage,
        });

    useEffect(sendRequest, [sendRequest]);

    if (error)
        return (
            <>
                <h1 className="text-2xl font-bold">something went wrong</h1>

                <p>{error.message}</p>
            </>
        );

    return (
        <>
            <h1 className="text-2xl font-bold">setting things up for you...</h1>

            <Spinner />
        </>
    );
};

export default SetupPage;
