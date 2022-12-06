import React, { FunctionComponent } from 'react';
import { formatDate } from '../utils/date';

type Props = {
    date: Date;
};

export const DateDisplay: FunctionComponent<Props> = ({ date }) => {
    return (
        <time
            className="tooltip underline decoration-dotted"
            data-tip={date.toLocaleString()}
        >
            {formatDate(date)}
        </time>
    );
};
