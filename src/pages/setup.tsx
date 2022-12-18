import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { useAppNavigation } from '../hooks/useNavigation';
import { trpc } from '../utils/trpc';

const SetupPage: NextPage = () => {
    const [isSetupReady, setIsSetupReady] = useState(false);

    const { navigateTo } = useAppNavigation();
    const { error, mutate: sendRequest } =
        trpc.snail.requestVisitorSnailOwnership.useMutation({
            onSuccess: () => {
                setIsSetupReady(true);
            },
        });

    useEffect(() => {
        sendRequest();

        const interval = setInterval(() => {
            if (isSetupReady) {
                clearInterval(interval);
                navigateTo.homepage();
            }
        }, 1000);
    }, [isSetupReady, navigateTo, sendRequest]);

    if (error)
        return (
            <>
                <h1 className="text-2xl font-bold">Something went wrong</h1>
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
