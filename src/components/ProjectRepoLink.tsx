import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import GitHubIcon from '../../public/github.png';

export const ProjectRepoLink: FC = () => {
    return (
        <Link
            className="btn-ghost btn-square btn text-black"
            href="https://github.com/pedrozaalex/tiny_snails/"
        >
            <Image src={GitHubIcon} alt="GitHub" width={36} />
        </Link>
    );
};
