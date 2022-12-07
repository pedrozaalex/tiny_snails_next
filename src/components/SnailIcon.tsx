import Image from 'next/image';
import { FunctionComponent } from 'react';
import Snail from '../../public/snail.png';

type Props = {
    size?: number;
};

export const SnailIcon: FunctionComponent<Props> = ({ size = 36 }) => {
    return (
        <Image
            src={Snail}
            alt="Snail icon"
            width={size}
            height={size}
            className="inline-block aspect-square"
        />
    );
};
