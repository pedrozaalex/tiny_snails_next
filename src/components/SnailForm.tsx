import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createSnailSchema } from '../schemas';
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
    const router = useRouter();
    const [errorContainerRef] = useAutoAnimate<HTMLDivElement>();

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
        onSuccess: ({ id }) => router.push(`/snail/${id}`),
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

                <button
                    type="submit"
                    className={`btn-accent btn mt-3 ${
                        isLoading ? ' loading' : ''
                    }`}
                    // This is a workaround for a bug in react-hook-form
                    // https://github.com/react-hook-form/react-hook-form/discussions/8020
                    // TODO: when this bug is fixed, replace with "onClick={handleSubmit(onSubmit)}"
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
