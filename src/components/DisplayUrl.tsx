import Link from 'next/link';
import { FunctionComponent } from 'react';

type Props = {
    url: string;
};

export const DisplayUrl: FunctionComponent<Props> = ({ url }) => {
    return (
        <Link href={url} target="_blank" rel="noreferrer" className="link">
            {url.length > 30 ? url.slice(0, 30) + '...' : url}
        </Link>
    );
};
