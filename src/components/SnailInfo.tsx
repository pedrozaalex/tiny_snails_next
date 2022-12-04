import { FunctionComponent } from 'react';

type Props = {
    snailId: number;
};

export const SnailInfo: FunctionComponent<Props> = ({ snailId }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">snail details</h2>

            <p>snail id: {snailId}</p>
        </div>
    );
};
