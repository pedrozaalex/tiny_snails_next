import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from 'next';
import {
    ClientSafeProvider,
    getCsrfToken,
    getProviders,
    signIn,
} from 'next-auth/react';
import Head from 'next/head';
import { ReactNode } from 'react';
import { GitHubIcon } from '../../components/GithubIcon';

type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
    csrfToken: Awaited<ReturnType<typeof getCsrfToken>>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    const csrfToken = await getCsrfToken(context);
    const providers = await getProviders();

    return {
        props: { providers, csrfToken },
    };
};

const SignInPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers, csrfToken }) => {
    if (!providers) {
        return null;
    }

    return (
        <>
            <Head>
                <title>sign in</title>
            </Head>

            <div className="m-auto flex flex-col items-center text-center">
                <h1 className="text-3xl font-extrabold normal-case">sign in</h1>

                <br />

                <div className="flex w-fit flex-col gap-4">
                    {Object.values(providers)
                        .sort(leaveEmailForLast)
                        .map((p) => getSignInFormForProvider(p, csrfToken))}
                </div>
            </div>
        </>
    );
};

const getSignInFormForProvider = (
    provider: ClientSafeProvider,
    csrfToken: string | undefined
): ReactNode => {
    const providerSignInButtons: Partial<
        Record<ClientSafeProvider['id'], ReactNode>
    > = {
        email: (
            <>
                <div className="mb-4 flex items-center">
                    <hr className="inline-block w-1/2 border-black" />
                    <span className="inline-block w-1/4 text-center">or</span>
                    <hr className="inline-block w-1/2 border-black" />
                </div>

                <form
                    className="form-control"
                    method="post"
                    action="/api/auth/signin/email"
                >
                    <input
                        name="csrfToken"
                        type="hidden"
                        defaultValue={csrfToken}
                    />

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        className="input-bordered input w-full max-w-xs"
                    />

                    <button
                        className="btn-secondary btn-block btn mt-4"
                        type="submit"
                    >
                        Sign in with Email
                    </button>
                </form>
            </>
        ),

        github: (
            <button
                type="button"
                className="btn gap-2 bg-black px-6 text-white hover:bg-gray-800"
                onClick={() => void signIn('github')}
            >
                github
                <GitHubIcon />
            </button>
        ),
    };

    return (
        <div key={provider.id} className="flex flex-col">
            {providerSignInButtons[provider.id] ?? (
                <button
                    type="button"
                    className="btn-secondary btn flex-col px-6"
                    onClick={() => void signIn(provider.id)}
                >
                    sign in with {provider.name}
                </button>
            )}
        </div>
    );
};

const leaveEmailForLast = (a: ClientSafeProvider, b: ClientSafeProvider) => {
    if (a.id === 'email') {
        return 1;
    }

    if (b.id === 'email') {
        return -1;
    }

    return 0;
};

export default SignInPage;
