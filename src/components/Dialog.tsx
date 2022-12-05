import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FunctionComponent, ReactNode, useCallback, useEffect } from 'react';
import { ThemeColors } from '../types/colors';
import { CloseIcon } from './CloseIcon';

type Action = {
    label: string;
    onClick: () => void;
    color?: ThemeColors;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    body: ReactNode;
    actions?: Action[];
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
    const [parentRef] = useAutoAnimate<HTMLDivElement>({});

    const keyDownHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', keyDownHandler);
        }

        if (!isOpen) {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [isOpen, keyDownHandler]);

    return (
        <div ref={parentRef}>
            {isOpen && (
                <div
                    className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
                    onClick={onClose}
                >
                    <div
                        className="relative w-full max-w-2xl rounded-lg border-2 border-black bg-base-100 p-10 pt-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 h-8 text-2xl font-bold">
                            {title}
                        </div>

                        <div>{body}</div>

                        <button
                            className="btn-ghost btn absolute top-0 right-0 m-2"
                            onClick={onClose}
                            type="button"
                        >
                            <CloseIcon />
                        </button>

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
