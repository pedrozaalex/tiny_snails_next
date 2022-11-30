import { Snail } from '@prisma/client';
import React, { FunctionComponent } from 'react';

type Props = {
    snail?: Snail;
};

const SnailForm: FunctionComponent<Props> = ({ snail }) => {
    return (
        <div className="card card-compact bg-base-200 shadow-xl">
            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">your url</span>
                    </label>
                    <input
                        type="text"
                        placeholder="paste your long url here"
                        className="input input-bordered"
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
                        />
                    </label>
                </div>

                <button className="btn btn-primary mt-3">create it!</button>
            </form>
        </div>
    );
};

SnailForm.propTypes = {};

export default SnailForm;
