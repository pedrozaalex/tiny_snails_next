import { FunctionComponent, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';

type Props = {
    snailId: number;
};

export const SnailInfo: FunctionComponent<Props> = ({ snailId }) => {
    const {
        data: snail,
        isLoading,
        error,
    } = trpc.snail.getById.useQuery(snailId);

    // Only show data after at least 500ms
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplay(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    if (isLoading || !display) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>error: {error.message}</p>;
    }

    if (!snail) {
        return <p>snail not found</p>;
    }

    return (
        <div className="m-auto flex flex-col gap-4">
            {Object.entries(snail).map(([key, value]) => (
                <div key={key} className="flex flex-row justify-between gap-8">
                    <p className="font-bold">{key}:</p>

                    <p>{value}</p>
                </div>
            ))}

            <div className="stat m-auto w-fit">
                <div className="stat-figure text-accent-focus">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title">clicks</div>
                <div className="stat-value text-accent-focus">
                    {snail.clicks}
                </div>
            </div>
        </div>
    );
};
