import Link from 'next/link';
import { ProjectRepoLink } from './ProjectRepoLink';

import { signIn, signOut, useSession } from 'next-auth/react';
import { SnailIcon } from './SnailIcon';

export function Navbar() {
    const { status } = useSession();

    return (
        <header className="navbar mt-8 justify-between border-y-2 border-primary-content bg-base-100 px-4 py-2 text-primary-content">
            <h1>
                <Link
                    href="/"
                    className="btn-ghost btn gap-2 text-3xl font-extrabold normal-case"
                >
                    tiny snails
                    <SnailIcon />
                </Link>
            </h1>

            <section className="flex gap-4">
                <span>you are {status}</span>

                {status === 'authenticated' && (
                    <>
                        <Link href="/dashboard" className="btn-ghost btn">
                            my snails
                        </Link>

                        <button
                            type="button"
                            className="btn-secondary btn flex-col px-6"
                            onClick={() => void signOut()}
                        >
                            <p>log out</p>
                        </button>
                    </>
                )}

                {status === 'unauthenticated' && (
                    <div className="flex flex-col">
                        <button
                            type="button"
                            className="btn-accent btn flex-col px-6"
                            onClick={() => void signIn()}
                        >
                            <p>sign in</p>
                        </button>
                        <small>(to save your snails)</small>
                    </div>
                )}

                <ProjectRepoLink />
            </section>
        </header>
    );
}
