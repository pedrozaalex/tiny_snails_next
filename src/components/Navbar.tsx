import Image from 'next/image';
import Link from 'next/link';
import { ProjectRepoLink } from './ProjectRepoLink';

import SnailIcon from '../../public/snail.png';
import { useSession } from 'next-auth/react';

export function Navbar() {
    const { status } = useSession();

    return (
        <header className="navbar mt-8 justify-between border-y-2 border-primary-content bg-base-100 px-4 py-4 text-primary-content">
            <h1>
                <Link
                    href="/"
                    className="btn-ghost btn gap-2 text-3xl font-extrabold normal-case"
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
                {/* Disable the dashboard link for now */}
                {/* {status === 'authenticated' && (
                    <Link href="/dashboard" className="btn-ghost btn">
                        my snails
                    </Link>
                )}

                {status === 'unauthenticated' && (
                    <Link
                        href="/auth"
                        className="btn-secondary btn flex-col px-6"
                    >
                        <p>sign in</p>
                        <small>(to save your snails)</small>
                    </Link>
                )} */}

                <ProjectRepoLink />
            </section>
        </header>
    );
}
