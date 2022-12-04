import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import GitHubIcon from '../../public/github.png';

export const ProjectRepoLink: FC = () => {
    return (
        <Link
            className="btn-ghost btn-square btn"
            href="https://github.com/pedrozaalex/tiny_snails/"
        >
            <Image
                className="mask mask-circle w-10 bg-black p-[2px]"
                src={GitHubIcon}
                alt="GitHub"
            />
        </Link>
    );
};
