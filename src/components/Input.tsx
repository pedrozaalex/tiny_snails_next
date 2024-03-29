import { useAutoAnimate } from '@formkit/auto-animate/react';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { ThemeColors } from '../types/colors';

type Props = {
    label?: string;
    leftLabel?: ReactNode;
    placeholder?: string;
    color?: ThemeColors;
    error?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { label, placeholder, leftLabel, color = 'primary', error, ...props },
    ref
) {
    const [containerRef] = useAutoAnimate<HTMLDivElement>();

    return (
        <div ref={containerRef} className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <label className={leftLabel ? 'input-group' : ''}>
                {leftLabel ? <span className={`bg-${color} min-w-fit`}>{leftLabel}</span> : null}

                <input
                    type="text"
                    placeholder={placeholder}
                    className={`input-bordered border border-${color} input w-full min-w-0 ${
                        error ? 'input-error' : ''
                    }`}
                    ref={ref}
                    {...props}
                />
            </label>

            {error ? (
                <label className="label">
                    <span className="label-text-alt text-error">
                        <p>{error}</p>
                    </span>
                </label>
            ) : null}
        </div>
    );
});
