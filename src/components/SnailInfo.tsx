import { Snail } from '@prisma/client';
import { FunctionComponent, ReactNode } from 'react';
import { trpc } from '../utils/trpc';
import { DisplayDate } from './DisplayDate';
import { DisplayUrl } from './DisplayUrl';

type BaseProps = {
    snailId: number;
    show?: never;
    hide?: never;
};

type ShowProps = {
    snailId: number;
    show: Readonly<(keyof Snail)[]>;
    hide?: never;
};

type HideProps = {
    snailId: number;
    show?: never;
    hide: Readonly<(keyof Snail)[]>;
};

type Props = BaseProps | ShowProps | HideProps;

const formatSnailInfo = ([key, value]: [string, unknown]): [
    string,
    ReactNode
] => {
    switch (key as keyof Snail) {
        case 'createdAt':
            const date = new Date(value as string);
            return [
                'created',
                <DisplayDate date={date} key={date.toISOString()} />,
            ];

        case 'url':
            return [
                key,
                <DisplayUrl
                    url={value as string}
                    key={`${key} ${value as string}`}
                />,
            ];

        case 'id':
            return [key, <code key={key}>{Number(value)}</code>];

        default:
            return [key, String(value)];
    }
};

const getShownProps = (props: {
    show: Props['show'];
    hide: Props['hide'];
    snail: Snail;
}) => {
    const { show, hide, snail } = props;

    if (show) {
        return show;
    }

    if (hide) {
        return Object.keys(snail).filter(
            (key) => !hide.includes(key as keyof Snail)
        ) as (keyof Snail)[];
    }

    return Object.keys(snail) as (keyof Snail)[];
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

    const shownProperties = getShownProps({ show, hide, snail });

    return (
        <div className="flex w-full flex-col gap-4">
            {Object.entries(snail)
                .filter(([key]) => shownProperties.includes(key as keyof Snail))
                .map((info) => {
                    const [key, value] = formatSnailInfo(info);

                    return (
                        <div
                            className="flex flex-row justify-between gap-8"
                            key={key}
                        >
                            <p className="font-bold">{key}:</p>

                            <p>{value}</p>
                        </div>
                    );
                })}
        </div>
    );
};
