import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FunctionComponent, useState } from 'react';
import { CheckMarkIcon } from './CheckMarkIcon';

type Toast = {
    id: string;
    message: string;
    duration: number;
    type: 'success' | 'error' | 'warning' | 'info';
};

let addNotification: (toast: Toast) => void;

let removeNotification: (id: string) => void;

const types = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
};

export const ToastCenter: FunctionComponent = () => {
    const [parentRef] = useAutoAnimate<HTMLDivElement>();
    const [toasts, setToasts] = useState<Toast[]>([]);

    addNotification = (newToast: Toast) => {
        setToasts((toasts) => [...toasts, newToast]);
    };

    removeNotification = (id: string) => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    };

    return (
        <div id="__toast-center" className="fixed top-0 right-0 z-50 flex flex-col gap-2" ref={parentRef}>
            {toasts.map((toast) => (
                <div key={toast.id} className="toast-end toast toast-top">
                    <div
                        className={`alert ${types[toast.type]} cursor-pointer shadow-lg`}
                        onClick={() => removeNotification(toast.id)}
                    >
                        <div>
                            <CheckMarkIcon />
                            {toast.message}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export function toast({
    id = Math.random().toString(36).substring(7),
    message = '',
    duration = 3000,
    type = 'success',
}: Partial<Toast>) {
    addNotification({ message, duration, type, id });

    setTimeout(() => {
        removeNotification(id);
    }, duration);
}
