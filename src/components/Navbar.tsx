import Image from 'next/image';
import Link from 'next/link';
import { ProjectRepoLink } from './ProjectRepoLink';

import SnailIcon from '../../public/snail.png';
import { useSession } from 'next-auth/react';

export function Navbar() {
    const { status } = useSession();

    return (
        <header className="navbar mt-8 px-4 py-4 bg-base-100 text-primary-content justify-between border-y-2 border-primary-content">
            <h1>
                <Link
                    href="/"
                    className="btn btn-ghost normal-case text-3xl font-extrabold gap-2"
                >
                    tiny snails
                    <Image
                        src={SnailIcon}
                        alt="snail icon"
                        width={36}
                        height={36}
                    />
                </Link>
            </h1>

            <section className="flex gap-4">
                {status === 'authenticated' && (
                    <Link href="/dashboard" className="btn btn-ghost">
                        my snails
                    </Link>
                )}

                {status === 'unauthenticated' && (
                    <Link
                        href="/auth"
                        className="btn btn-secondary flex-col px-6"
                    >
                        <p>sign in</p>
                        <small>(to save your snails)</small>
                    </Link>
                )}

                <ProjectRepoLink />
            </section>
        </header>
    );
}
