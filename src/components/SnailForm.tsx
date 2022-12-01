import { Snail } from '@prisma/client';
import { FunctionComponent, useRef } from 'react';

type SnailCreateDTO = Pick<Snail, 'url' | 'alias'>;

type Props = {
    snail?: SnailCreateDTO;
    onSubmit?: (snail: SnailCreateDTO) => void;
};

const SnailForm: FunctionComponent<Props> = ({ snail, onSubmit }) => {
    const urlRef = useRef<HTMLInputElement>(null);
    const aliasRef = useRef<HTMLInputElement>(null);

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const url = urlRef.current?.value;
        const alias = aliasRef.current?.value;

        if (url && alias && onSubmit) {
            onSubmit({ url, alias });
        }
    };

    return (
        <div className="card card-compact bg-base-200 shadow-xl">
            <form className="card-body" onSubmit={onSubmitHandler}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">your url</span>
                    </label>
                    <input
                        type="text"
                        placeholder="paste your long url here"
                        className="input input-bordered"
                        ref={urlRef}
                        defaultValue={snail?.url}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">customize your link</span>
                    </label>
                    <label className="input-group">
                        <span className="border border-gray-300 border-opacity-50">
                            tny.xyz/
                        </span>
                        <input
                            type="text"
                            placeholder="alias"
                            className="input input-bordered grow"
                            ref={aliasRef}
                            defaultValue={snail?.alias}
                        />
                    </label>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    create it!
                </button>
            </form>
        </div>
    );
};

export default SnailForm;
