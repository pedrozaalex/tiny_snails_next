import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppNavigation } from '../hooks/useNavigation';
import { createSnailSchema } from '../schemas';
import { getVisitorId } from '../utils/cookies';
import { trpc } from '../utils/trpc';
import { ErrorIcon } from './ErrorIcon';
import { Input } from './Input';

type CreateSnailDTO = z.infer<typeof createSnailSchema>;

type Props = {
    snail?: CreateSnailDTO;
    baseUrl?: string | null;
};

const SnailForm: FunctionComponent<Props> = ({
    snail,
    baseUrl = 'tny.xyz/',
}) => {
    const { navigateTo } = useAppNavigation();
    const [errorContainerRef] = useAutoAnimate<HTMLDivElement>();

    const { data: sessionData } = useSession();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateSnailDTO>({
        resolver: zodResolver(createSnailSchema),
        defaultValues: snail,
    });

    const {
        mutate: createSnail,
        isLoading,
        error,
        reset,
    } = trpc.snail.create.useMutation({
        onSuccess: ({ alias }) => navigateTo.showSnail(alias),
    });

    return (
        <div className="card card-compact border-2 border-neutral-content bg-base-200">
            <form
                className="card-body"
                onSubmit={(...args) => {
                    return void handleSubmit((data) => {
                        createSnail(data);
                    })(...args);
                }}
            >
                <Input
                    label="your big url"
                    placeholder="paste your long url here"
                    error={errors.url?.message}
                    {...register('url')}
                />

                <Input
                    label="customize your link"
                    placeholder="alias"
                    error={errors.alias?.message}
                    leftLabel={baseUrl}
                    color="accent"
                    {...register('alias')}
                />

                <Input
                    type="hidden"
                    value={sessionData?.user?.id ?? getVisitorId()}
                    {...register('userId')}
                />

                <button
                    type="submit"
                    className={`btn-accent btn mt-3 ${
                        isLoading ? ' loading' : ''
                    }`}
                >
                    {snail === undefined ? 'create it!' : 'update'}
                </button>
            </form>

            <div className={error ? 'm-4' : ''} ref={errorContainerRef}>
                {error ? (
                    <div
                        className="alert alert-error cursor-pointer shadow-lg"
                        onClick={reset}
                    >
                        <div>
                            <ErrorIcon />
                            <span>
                                Error:{' '}
                                {error instanceof TRPCClientError
                                    ? error.message
                                    : 'unknown error occurred'}
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SnailForm;
