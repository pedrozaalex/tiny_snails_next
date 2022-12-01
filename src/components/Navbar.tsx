import Image from 'next/image';
import Link from 'next/link';
import { ProjectRepoLink } from './ProjectRepoLink';

import SnailIcon from '../../public/snail.png';
import { useSession } from 'next-auth/react';

export function Navbar() {
    const { data: session, status } = useSession();

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

            <div className="flex gap-2">
                {status === 'authenticated' && (
                    <Link href="/dashboard" className="btn btn-ghost">
                        dashboard
                    </Link>
                )}

                {status === 'unauthenticated' && (
                    <Link href="/api/auth/signin" className="btn btn-ghost">
                        sign in
                    </Link>
                )}

                <ProjectRepoLink />
            </div>
        </header>
    );
}
