import { useAutoAnimate } from '@formkit/auto-animate/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { FormEventHandler, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useAppNavigation } from '../hooks/useNavigation';
import { CreateSnailDTO, createSnailSchema } from '../schemas';
import { trpc } from '../utils/trpc';
import { ErrorIcon } from './icons/ErrorIcon';
import { Input } from './Input';

type Props = {
    snail?: CreateSnailDTO;
    baseUrl?: string | null;
};

const SnailForm: FunctionComponent<Props> = ({ snail, baseUrl = 'tny.xyz/' }) => {
    const { navigateTo } = useAppNavigation();
    const [errorContainerRef] = useAutoAnimate<HTMLDivElement>();

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
    } = useForm<CreateSnailDTO>({
        resolver: zodResolver(createSnailSchema),
        defaultValues: snail,
    });

    const {
        mutate: createSnail,
        isLoading,
        error: mutationError,
        reset,
    } = trpc.snail.create.useMutation({
        onSuccess: ({ alias }) => navigateTo.showSnail(alias),
    });

    const onSubmit: FormEventHandler<HTMLFormElement> = (...args) => {
        return void handleSubmit((data) => {
            createSnail(data);
        })(...args);
    };

    return (
        <div className="card card-compact border-2 border-neutral-content bg-base-200">
            <form className="card-body" onSubmit={onSubmit}>
                <Input
                    label="your big url"
                    placeholder="paste your long url here"
                    error={formErrors.url?.message}
                    {...register('url')}
                />

                <Input
                    label="customize your link"
                    placeholder="alias"
                    error={formErrors.alias?.message}
                    leftLabel={baseUrl}
                    color="accent"
                    {...register('alias')}
                />

                <button type="submit" className={`btn-accent btn mt-3 ${isLoading ? ' loading' : ''}`}>
                    {snail ? 'update' : 'create it!'}
                </button>
            </form>

            <div className={mutationError ? 'm-4' : ''} ref={errorContainerRef}>
                {mutationError ? (
                    <div className="alert alert-error cursor-pointer shadow-lg" onClick={reset}>
                        <div>
                            <ErrorIcon />
                            <span>
                                error:{' '}
                                {mutationError instanceof TRPCClientError
                                    ? mutationError.message
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
