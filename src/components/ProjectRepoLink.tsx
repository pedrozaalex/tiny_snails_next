import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import GitHubIcon from '../../public/github.png';

export const ProjectRepoLink: FC = () => {
    return (
        <Link
            className="btn btn-ghost btn-square"
            href="https://github.com/pedrozaalex/tiny_snails/"
        >
            <Image
                className="mask mask-circle bg-black p-[2px] w-10"
                src={GitHubIcon}
                alt="GitHub"
            />
        </Link>
    );
};
