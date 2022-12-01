import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createSnailSchema } from '../schemas';

type SnailCreateDTO = z.infer<typeof createSnailSchema>;

type Props = {
    snail?: SnailCreateDTO;
    onSubmit?: (snail: SnailCreateDTO) => void;
    baseUrl?: string | null;
    loading?: boolean;
};

const SnailForm: FunctionComponent<Props> = ({
    snail,
    baseUrl = 'tny.xyz/',
    loading = false,
    onSubmit = () => {
        // noop
    },
}) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SnailCreateDTO>({
        resolver: zodResolver(createSnailSchema),
    });

    return (
        <div className="card card-compact bg-base-200 shadow-2xl">
            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">your url</span>
                    </label>

                    <input
                        type="text"
                        placeholder="paste your long url here"
                        className={`input input-bordered ${
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
                        <span className="border border-gray-300 border-opacity-50">
                            {baseUrl}
                        </span>

                        <input
                            type="text"
                            placeholder="alias"
                            className={`input input-bordered min-w-0 w-full ${
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
                    className={`btn btn-primary mt-3 ${
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
        </div>
    );
};

export default SnailForm;
