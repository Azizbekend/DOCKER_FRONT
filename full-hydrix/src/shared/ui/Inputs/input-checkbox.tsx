import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles/input-checkbox.module.css';

export interface InputCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    variant?: 'default' | 'button' | 'switch';
    labelPosition?: 'left' | 'right';
    error?: boolean;
    errorText?: string;
    containerClassName?: string;
}

/**
 * Компонент кастомного чекбокса с поддержкой различных вариантов оформления
 */
export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
    ({
        label,
        variant = 'default',
        labelPosition = 'right',
        error = false,
        errorText,
        className,
        containerClassName,
        disabled = false,
        checked,
        indeterminate,
        ...props
    },
        ref
    ) => {
        const inputRef = React.useRef<HTMLInputElement>(null);

        // Мерджим ref'ы - внешний и внутренний
        React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

        // Обрабатываем состояние indeterminate
        React.useEffect(() => {
            if (inputRef.current) {
                inputRef.current.indeterminate = indeterminate || false;
            }
        }, [indeterminate]);

        const containerClasses = [
            styles.container,
            containerClassName,
            styles[`variant-${variant}`],
            styles[`label-${labelPosition}`],
            error && styles.error,
            disabled && styles.disabled,
            indeterminate && styles.indeterminate,
        ]
            .filter(Boolean)
            .join(' ');

        const inputClasses = [styles.input, className].filter(Boolean).join(' ');

        const renderCheckbox = () => (
            <span className={styles.checkbox}>
                {variant === 'switch' && <span className={styles.switchHandle} />}
                {variant === 'button' && label && (
                    <span className={styles.buttonContent}>{label}</span>
                )}
            </span>
        );

        return (
            <div className={containerClasses}>
                <label className={styles.label}>
                    <input
                        ref={inputRef}
                        type="checkbox"
                        className={inputClasses}
                        disabled={disabled}
                        checked={checked}
                        aria-invalid={error}
                        aria-describedby={errorText ? `${props.id}-error` : undefined}
                        {...props}
                    />

                    {renderCheckbox()}

                    {label && variant !== 'button' && (
                        <span className={styles.labelText}>{label}</span>
                    )}
                </label>

                {error && errorText && (
                    <span
                        id={`${props.id}-error`}
                        className={styles.errorText}
                        role="alert"
                    >
                        {errorText}
                    </span>
                )}
            </div>
        );
    }
);

InputCheckbox.displayName = 'InputCheckbox';

export default InputCheckbox;