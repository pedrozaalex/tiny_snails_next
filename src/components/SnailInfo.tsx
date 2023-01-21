import { Snail } from '@prisma/client';
import { FunctionComponent, ReactNode } from 'react';
import { trpc } from '../utils/trpc';
import { DisplayDate } from './DisplayDate';
import { DisplayUrl } from './DisplayUrl';
import { Spinner } from './Spinner';

type BaseProps = {
    snailAlias: string;
    show?: never;
    hide?: never;
};

type ShowProps = {
    snailAlias: string;
    show: (keyof Snail)[];
    hide?: never;
};

type HideProps = {
    snailAlias: string;
    show?: never;
    hide: (keyof Snail)[];
};

type Props = BaseProps | ShowProps | HideProps;

const formatSnailInfo = ([key, value]: [string, unknown]): [string, ReactNode] => {
    switch (key as keyof Snail) {
        case 'createdAt':
            const date = new Date(value as string);
            return ['created', <DisplayDate date={date} key={date.toISOString()} />];

        case 'url':
            return [key, <DisplayUrl url={value as string} key={`${key} ${value as string}`} />];

        default:
            return [key, String(value)];
    }
};

const getShownProps = (props: { snail: Partial<Snail>; show: Props['show']; hide: Props['hide'] }) => {
    const { show, hide, snail } = props;

    if (show) {
        return show;
    }

    if (hide) {
        return Object.keys(snail).filter((key) => !hide.includes(key as keyof Snail)) as (keyof Snail)[];
    }

    return Object.keys(snail) as (keyof Snail)[];
};

export const SnailInfo: FunctionComponent<Props> = ({ snailAlias, hide, show }) => {
    const { data: snail, isLoading, error } = trpc.snail.getByAlias.useQuery(snailAlias);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <p>error: {error.message}</p>;
    }

    if (!snail) {
        return <p>snail not found</p>;
    }

    const shownProperties = getShownProps({ show, hide, snail });

    return (
        <div className="flex w-full flex-col gap-4" data-cy="snail-info-card">
            {Object.entries(snail)
                .filter(([key]) => shownProperties.includes(key as keyof Snail))
                .map((info) => {
                    const [key, value] = formatSnailInfo(info);

                    return (
                        <div className="flex flex-row justify-between gap-8" key={key}>
                            <p className="font-bold">{key}:</p>

                            <p>{value}</p>
                        </div>
                    );
                })}
        </div>
    );
};
