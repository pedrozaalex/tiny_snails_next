import Link from 'next/link';
import { FunctionComponent } from 'react';
import { copyToClipboard } from '../utils/copy';
import { trpc } from '../utils/trpc';
import { REDIRECT_BASE_URL } from '../utils/urls';
import { Spinner } from './Spinner';
import { toast } from './ToastCenter';

type Props = {
    snailAlias: string;
};

export const DisplayShortlink: FunctionComponent<Props> = ({ snailAlias }) => {
    const {
        data: snail,
        error,
        isLoading,
    } = trpc.snail.getByAlias.useQuery(snailAlias);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <p>error: {error.message}</p>;
    }

    if (!snail) {
        return <p>snail not found</p>;
    }

    const url = REDIRECT_BASE_URL + snail.alias;

    return (
        <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-base-200 px-4 py-2">
            <Link href={url} target="_blank" rel="noreferrer" className="link">
                {url.length > 30 ? url.slice(0, 30) + '...' : url}
            </Link>

            <button
                className="btn-secondary btn ml-auto"
                type="button"
                onClick={() => {
                    void copyToClipboard(url).then(notify);
                }}
            >
                copy
            </button>
        </div>
    );
};

const notify = () =>
    toast({ message: 'copied to clipboard!', type: 'success' });
