import { FunctionComponent, ReactNode } from 'react';

type Props = {
    isOpen: boolean;
    children: ReactNode;
};

export const Dialog: FunctionComponent<Props> = ({ children }) => {
    return (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-base-100 rounded-lg shadow-lg p-4 max-w-2xl w-full">
                <div className="flex flex-col gap-4">{children}</div>
            </div>
        </div>
    );
};
