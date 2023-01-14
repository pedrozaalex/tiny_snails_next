import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { SnailIcon } from './icons/SnailIcon';

export function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSignOutDialog, setShowSignOutDialog] = useState(false);

    const { status: authSessionStatus } = useSession();

    return (
        <>
            <header className="navbar mt-8 justify-between border-y-2 border-primary-content bg-base-100 px-4 py-2 text-primary-content">
                <h1>
                    <Link href="/" className="btn-ghost btn gap-2 text-3xl font-extrabold normal-case">
                        tiny snails
                        <SnailIcon />
                    </Link>
                </h1>

                {/* The desktop navbar, that stays at the top */}
                <section className="hidden gap-4 sm:flex">
                    <Link href="/snails" className="btn-ghost btn">
                        your snails
                    </Link>

                    {authSessionStatus === 'authenticated' && (
                        <>
                            <button
                                type="button"
                                className="btn-secondary btn flex-col px-6"
                                onClick={() => setShowSignOutDialog(true)}
                            >
                                <p>log out</p>
                            </button>
                        </>
                    )}

                    {authSessionStatus === 'unauthenticated' && (
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
                </section>

                {/* The mobile navbar, that shows up when the screen is small */}
                <section className="flex sm:hidden">
                    <button type="button" className="btn-ghost btn-square btn" onClick={() => setShowSidebar(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="4" y1="8" x2="20" y2="8" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="16" x2="20" y2="16" />
                        </svg>
                    </button>

                    <div
                        className={`fixed inset-0 z-10 h-full overflow-hidden transition-transform ${
                            showSidebar ? 'translate-x-0 transform' : '-translate-x-full transform'
                        }`}
                        onClick={() => setShowSidebar(false)}
                    >
                        <div className="flex h-full w-64 flex-col bg-base-100 text-primary-content shadow-2xl">
                            <div className="flex-none">
                                <h1 className="flex h-20 items-center justify-center">
                                    <Link href="/" className="btn-ghost btn gap-2 text-3xl font-extrabold normal-case">
                                        tiny snails
                                        <SnailIcon />
                                    </Link>
                                </h1>

                                <div className="flex flex-col gap-4 px-4 py-2">
                                    <Link href="/snails" className="btn-ghost btn">
                                        your snails
                                    </Link>

                                    {authSessionStatus === 'authenticated' && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn-secondary btn flex-col px-6"
                                                onClick={() => setShowSignOutDialog(true)}
                                            >
                                                <p>log out</p>
                                            </button>

                                            <Dialog
                                                title="log out"
                                                body={<p className="text-center">are you sure you want to log out?</p>}
                                                isOpen={showSignOutDialog}
                                                onClose={() => setShowSignOutDialog(false)}
                                                actions={[
                                                    {
                                                        label: 'cancel',
                                                        onClick: () => setShowSignOutDialog(false),
                                                    },
                                                    {
                                                        label: 'log out',
                                                        onClick: () => void signOut(),
                                                        color: 'warning',
                                                    },
                                                ]}
                                            />
                                        </>
                                    )}

                                    {authSessionStatus === 'unauthenticated' && (
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </>
    );
}
