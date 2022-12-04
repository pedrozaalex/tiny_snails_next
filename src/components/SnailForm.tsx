import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createSnailSchema } from '../schemas';
import { ErrorIcon } from './ErrorIcon';

type SnailCreateDTO = z.infer<typeof createSnailSchema>;

type Props = {
    snail?: SnailCreateDTO;
    baseUrl?: string | null;
    loading?: boolean;
    error?: unknown;
    onSubmit?: (snail: SnailCreateDTO) => void;
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
    } = useForm<SnailCreateDTO>({
        resolver: zodResolver(createSnailSchema),
    });

    return (
        <div className="card card-compact bg-base-200 border-2 border-neutral-content">
            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">your big url</span>
                    </label>

                    <input
                        type="text"
                        placeholder="paste your long url here"
                        className={`input-bordered input ${
                            errors.url ? 'input-error' : ''
                        }`}
                        defaultValue={snail?.url}
                        {...register('url')}
                    />

                    {errors.url?.message ? (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                <p>{errors.url.message}</p>
                            </span>
                        </label>
                    ) : null}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">customize your link</span>
                    </label>
                    <label className="input-group">
                        <span className="bg-accent min-w-fit">{baseUrl}</span>

                        <input
                            type="text"
                            placeholder="alias"
                            className={`input-bordered input w-full min-w-0 ${
                                errors.alias ? 'input-error' : ''
                            }`}
                            defaultValue={snail?.alias}
                            {...register('alias')}
                        />

                        {errors.alias?.message ? (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    <p>{errors.alias.message}</p>
                                </span>
                            </label>
                        ) : null}
                    </label>
                </div>

                <button
                    type="button"
                    className={`btn btn-secondary mt-3 ${
                        loading ? ' loading' : ''
                    }`}
                    // This is a workaround for a bug in react-hook-form
                    // https://github.com/react-hook-form/react-hook-form/discussions/8020
                    // TODO: remove this when the bug is fixed
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
