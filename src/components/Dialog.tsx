import FocusTrap from 'focus-trap-react';
import { FunctionComponent, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ThemeColors } from '../types/colors';
import { CloseIcon } from './icons/CloseIcon';

type Action = {
    label: string;
    onClick: () => void;
    color?: ThemeColors;
};

type Props = {
    isOpen?: boolean;
    onClose: () => void;
    title?: string;
    body: ReactNode;
    actions?: Action[];
};

export const Dialog: FunctionComponent<Props> = ({
    isOpen = true,
    title,
    body,
    actions,
    onClose = () => {
        // do nothing
    },
}) => {
    const titleRef = useRef<HTMLDivElement>(null);

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
            titleRef.current?.focus();
        }

        if (!isOpen) {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [isOpen, keyDownHandler]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [keyDownHandler]);

    const layoutRoot = typeof window !== 'undefined' && document.getElementById('layout-root');

    if (!isOpen || !layoutRoot) return null;

    return createPortal(
        <div
            className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <FocusTrap onClick={onClose}>
                <div
                    className="relative m-8 w-full max-w-2xl rounded-lg border-2 border-black bg-base-100 p-4 pt-6"
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="dialog-title"
                >
                    <div className="mb-4 h-8 text-2xl font-bold" id="dialog-title" tabIndex={-1} ref={titleRef}>
                        {title}
                    </div>

                    <div>{body}</div>

                    {actions && (
                        <div className="mt-8 flex justify-around">
                            {actions.map((action) => (
                                <button
                                    key={action.label}
                                    className={buttonStyles[action.color ?? 'primary']}
                                    onClick={action.onClick}
                                    type="button"
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <button className="btn-ghost btn absolute top-0 right-0 m-2" onClick={onClose} type="button">
                        <CloseIcon />
                    </button>
                </div>
            </FocusTrap>
        </div>,
        layoutRoot
    );
};

const buttonStyles: Record<ThemeColors, string> = {
    primary: 'btn-primary btn',
    secondary: 'btn-secondary btn',
    error: 'btn-error btn',
    success: 'btn-success btn',
    info: 'btn-info btn',
    warning: 'btn-warning btn',
    accent: 'btn-accent btn',
    neutral: 'btn-neutral btn',
};
