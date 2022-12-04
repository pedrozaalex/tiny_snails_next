import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';
import { trpc } from '../utils/trpc';

type Props = {
    snailId: number;
};

const formatSnailInfo = ([key, value]: [string, unknown]): [
    string,
    ReactNode
] => {
    switch (key) {
        case 'createdAt':
            return ['created at', new Date(value as string).toLocaleString()];

        case 'url':
            return [
                key,
                <Link
                    key={key}
                    href={value as string}
                    className="link"
                    target="_blank"
                >
                    {String(value)}
                </Link>,
            ];

        case 'id':
            return [key, value as number];

        default:
            return [key, value as string];
    }
};

export const SnailInfo: FunctionComponent<Props> = ({ snailId }) => {
    const {
        data: snail,
        isLoading,
        error,
    } = trpc.snail.getById.useQuery(snailId);

    if (isLoading) {
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
            {Object.entries(snail).map((info, index) => {
                const [key, value] = formatSnailInfo(info);

                return (
                    <>
                        <div
                            key={key}
                            className="flex flex-row justify-between gap-8"
                        >
                            <p className="font-bold">{key}:</p>

                            <p>{value}</p>
                        </div>

                        {index !== Object.entries(snail).length - 1 && (
                            <hr className="border-accent-2" />
                        )}
                    </>
                );
            })}
        </div>
    );
};
