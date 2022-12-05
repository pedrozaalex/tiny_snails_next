import { Snail } from '@prisma/client';
import Link from 'next/link';
import { FunctionComponent, ReactNode } from 'react';
import { XOR } from 'ts-xor';
import { formatDate } from '../utils/date';
import { trpc } from '../utils/trpc';

type ShowProps = {
    show: (keyof Snail)[];
};

type HideProps = {
    hide: (keyof Snail)[];
};

type Props = {
    snailId: number;
} & XOR<ShowProps, HideProps>;

const formatSnailInfo = ([key, value]: [string, unknown]): [
    string,
    ReactNode
] => {
    switch (key as keyof Snail) {
        case 'createdAt':
            const date = new Date(value as string);
            return ['created', formatDate(date)];

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

export const SnailInfo: FunctionComponent<Props> = ({
    snailId,
    hide,
    show,
}) => {
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

    const hiddenProperties = hide ?? [];

    if (show) {
        hiddenProperties.push(
            ...(Object.keys(snail).filter(
                (key) => !show.includes(key as keyof Snail)
            ) as (keyof Snail)[])
        );
    }

    return (
        <div className="m-auto flex flex-col gap-4">
            {Object.entries(snail).map((info) => {
                if (hiddenProperties.includes(info[0] as keyof Snail)) {
                    return null;
                }

                const [key, value] = formatSnailInfo(info);

                return (
                    <>
                        <div className="flex flex-row justify-between gap-8">
                            <p className="font-bold">{key}:</p>

                            <p>{value}</p>
                        </div>
                    </>
                );
            })}
        </div>
    );
};
