import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createSnailSchema } from '../schemas';
import { ErrorIcon } from './ErrorIcon';
import { Input } from './Input';

type CreateSnailDTO = z.infer<typeof createSnailSchema>;

type Props = {
    snail?: CreateSnailDTO;
    baseUrl?: string | null;
    loading?: boolean;
    error?: unknown;
    onSubmit?: (snail: CreateSnailDTO) => void;
    clearError?: () => void;
};

const SnailForm: FunctionComponent<Props> = ({
    snail,
    baseUrl = 'tny.xyz/',
    loading = false,
    error = null,
    onSubmit = () => {
        // noop
    },
    clearError = () => {
        // noop
    },
}) => {
    const [errorContainerRef] = useAutoAnimate<HTMLDivElement>();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateSnailDTO>({
        resolver: zodResolver(createSnailSchema),
        defaultValues: snail,
    });

    return (
        <div className="card card-compact border-2 border-neutral-content bg-base-200">
            <form className="card-body">
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
                    type="button"
                    className={`btn-accent btn mt-3 ${
                        loading ? ' loading' : ''
                    }`}
                    // This is a workaround for a bug in react-hook-form
                    // https://github.com/react-hook-form/react-hook-form/discussions/8020
                    // TODO: when this bug is fixed, replace with "onClick={handleSubmit(onSubmit)}"
                    onClick={(...args) => void handleSubmit(onSubmit)(...args)}
                >
                    {snail === undefined ? 'create it!' : 'update'}
                </button>
            </form>

            <div className={error ? 'm-4' : ''} ref={errorContainerRef}>
                {error ? (
                    <div
                        className="alert alert-error cursor-pointer shadow-lg"
                        onClick={clearError}
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
