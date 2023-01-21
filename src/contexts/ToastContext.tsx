import { useAutoAnimate } from '@formkit/auto-animate/react';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { CheckMarkIcon } from '../components/icons/CheckMarkIcon';
import { ErrorIcon } from '../components/icons/ErrorIcon';

type Toast = {
    id: string;
    message: string;
    duration: number;
    type: 'success' | 'error' | 'warning' | 'info';
};
type ToastFn = ({ message, duration, type }: Partial<Omit<Toast, 'id'>> & Pick<Toast, 'message'>) => void;
type ToastProviderProps = { children: ReactNode };

const ToastContext = createContext<{ toast: ToastFn } | undefined>(undefined);

export function ToastProvider({ children }: ToastProviderProps) {
    const [parentRef] = useAutoAnimate<HTMLDivElement>();

    const [toasts, setToasts] = useState([] as Toast[]);

    const addToast = useCallback((newToast: Toast) => setToasts((toasts) => [...toasts, newToast]), []);
    const removeToast = useCallback((id: string) => setToasts((toasts) => toasts.filter((t) => t.id !== id)), []);

    const toast = useCallback<ToastFn>(
        ({ message, duration = 300000, type = 'success' }) => {
            const id = Math.random().toString(36).substring(7);

            addToast({ message, duration, type, id });

            setTimeout(() => {
                removeToast(id);
            }, duration);
        },
        [addToast, removeToast]
    );

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}

            <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4" ref={parentRef}>
                {toasts.map((toast) => {
                    const type = alertConfig[toast.type].type;
                    const icon = alertConfig[toast.type].icon;

                    return (
                        <div key={toast.id} className="toast-end toast toast-top static p-0">
                            <div
                                className={`alert ${type} cursor-pointer shadow-lg`}
                                onClick={removeToast.bind(null, toast.id)}
                            >
                                {icon}
                                {toast.message}
                            </div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

const alertConfig = {
    success: {
        icon: <CheckMarkIcon />,
        type: 'alert-success',
    },
    error: {
        icon: <ErrorIcon />,
        type: 'alert-error',
    },
    warning: {
        icon: null,
        type: 'alert-warning',
    },
    info: {
        icon: null,
        type: 'alert-info',
    },
};

export function useToast() {
    const toastContext = useContext(ToastContext);

    if (toastContext === undefined) throw new Error('useToast was used outside of a ToastProvider');

    return toastContext;
}
