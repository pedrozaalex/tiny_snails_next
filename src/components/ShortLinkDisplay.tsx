import { FunctionComponent } from 'react';
import { copyToClipboard } from '../utils/copy';
import { trpc } from '../utils/trpc';
import { REDIRECT_BASE_URL } from '../utils/urls';
import { toast } from './ToastCenter';

type Props = {
    snailId: number;
};

export const ShortLinkDisplay: FunctionComponent<Props> = ({ snailId }) => {
    const {
        data: snail,
        error,
        isLoading,
    } = trpc.snail.getById.useQuery(snailId);

    const baseUrl = REDIRECT_BASE_URL;

    if (isLoading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>error: {error.message}</p>;
    }

    if (!snail) {
        return <p>snail not found</p>;
    }

    const alias = snail.alias;

    return (
        <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-base-200 px-4 py-2">
            <span>
                {baseUrl}
                {alias}
            </span>

            <button
                className="btn-secondary btn ml-auto"
                type="button"
                onClick={() => {
                    void copyToClipboard(`${baseUrl}${alias}`).then(notify);
                }}
            >
                copy
            </button>
        </div>
    );
};

const notify = () => toast({ message: 'copied!' });
