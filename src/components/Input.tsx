import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

type Props = {
    label?: string;
    leftLabel?: ReactNode;
    placeholder?: string;
    color?:
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'neutral'
        | 'success'
        | 'warning'
        | 'error'
        | 'info';
    error?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { label, placeholder, leftLabel, color = 'primary', error, ...props },
    ref
) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <label className={leftLabel ? 'input-group' : ''}>
                {leftLabel ? (
                    <span className={`bg-${color} min-w-fit`}>{leftLabel}</span>
                ) : null}

                <input
                    type="text"
                    placeholder={placeholder}
                    className={`input-bordered border border-${color} input w-full min-w-0 ${
                        error ? 'input-error' : ''
                    }`}
                    ref={ref}
                    {...props}
                />

                {error ? (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            <p>{error}</p>
                        </span>
                    </label>
                ) : null}
            </label>
        </div>
    );
});
