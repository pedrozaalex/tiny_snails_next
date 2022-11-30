import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import GitHubIcon from '../public/github.png';

export const ProjectRepoLink: FC = (_props) => {
    return (
        <Link
            className="btn btn-ghost"
            href="https://github.com/pedrozaalex/tiny_snails/"
        >
            <Image src={GitHubIcon} alt="GitHub" width={32} height={32} />
        </Link>
    );
};
