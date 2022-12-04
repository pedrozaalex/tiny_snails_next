import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { CloseIcon } from './CloseIcon';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    body: ReactNode;
    actions?: ReactNode;
};

export const Dialog: FunctionComponent<Props> = ({
    isOpen,
    title,
    body,
    actions,
    onClose = () => {
        // do nothing
    },
}) => {
    const [parentRef] = useAutoAnimate<HTMLDivElement>();

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        if (!isOpen) document.body.style.overflow = 'unset';
    }, [isOpen]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div ref={parentRef}>
            {isMounted && isOpen && (
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
                        className="relative w-full max-w-2xl rounded-lg border-2 border-black bg-base-100 p-10 pt-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 h-8 text-2xl font-bold">
                            {title}
                        </div>

                        <div>{body}</div>

                        <div className="absolute top-0 right-0 p-2">
                            <button
                                className="btn-ghost btn"
                                onClick={onClose}
                                type="button"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {actions && (
                            <div className="mt-4 flex justify-end">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
