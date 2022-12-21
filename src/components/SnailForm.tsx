import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useAppNavigation } from '../hooks/useNavigation';
import { CreateSnailDTO, createSnailSchema } from '../schemas';
import { trpc } from '../utils/trpc';
import { ErrorIcon } from './ErrorIcon';
import { Input } from './Input';

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

                <button
                    type="submit"
                    className={`btn-accent btn mt-3 ${
                        isLoading ? ' loading' : ''
                    }`}
                >
                    {snail ? 'update' : 'create it!'}
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
                                error:{' '}
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
