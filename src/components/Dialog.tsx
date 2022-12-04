import { FunctionComponent, ReactNode, useEffect } from 'react';
import { CloseIcon } from './CloseIcon';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export const Dialog: FunctionComponent<Props> = ({
    isOpen,
    title,
    children,
    onClose = () => {
        // do nothing
    },
}) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        if (!isOpen) document.body.style.overflow = 'unset';
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    onClose();
                    e.preventDefault();
                }
            }}
            onScroll={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
        >
            <div
                className="relative w-full max-w-2xl rounded-lg border-2 border-black bg-base-100 py-4 px-10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-8 h-8 text-2xl font-bold">{title}</div>

                <div>{children}</div>

                <div className="absolute top-0 right-0 p-2">
                    <button
                        className="btn-ghost btn"
                        onClick={onClose}
                        type="button"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};
