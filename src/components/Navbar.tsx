import Image from 'next/image';
import Link from 'next/link';
import { ProjectRepoLink } from './ProjectRepoLink';

import SnailIcon from '../../public/snail.png';

export function Navbar() {
    return (
        <header className="navbar bg-primary text-primary-content justify-between">
            <h1>
                <Link
                    href="/"
                    className="btn btn-ghost normal-case text-3xl font-extrabold gap-2"
                >
                    tiny snails
                    <Image
                        src={SnailIcon}
                        alt="snail icon"
                        width={32}
                        height={32}
                    />
                </Link>
            </h1>

            <ProjectRepoLink />
        </header>
    );
}
