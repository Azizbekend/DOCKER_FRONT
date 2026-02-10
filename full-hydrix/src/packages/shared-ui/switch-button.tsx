import { useState, useEffect } from "react";

interface SwitchButtonProps {
    classNames?: {
        container?: string;
        button?: string;
        circle?: string;
        label?: string;
    },
    label?: string;
    disabled?: boolean,
    onChange: (value: boolean) => void;
    defaultValue?: boolean;
}

export const SwitchButton = ({
    classNames,
    label,
    disabled = false,
    onChange,
    defaultValue = false
}: SwitchButtonProps) => {
    const [checked, setChecked] = useState(defaultValue);

    useEffect(() => {
        setChecked(defaultValue);
    }, [defaultValue]);

    const handleClick = () => {
        if (!disabled) {
            const newValue = !checked;
            setChecked(newValue);
            onChange(newValue);
        }
    };

    return (
        <div
            className={`flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${classNames?.container}`}
            onClick={() => !disabled && handleClick}
        >
            <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${classNames?.button}`}
                style={{
                    backgroundColor: checked ? "var(--clr-accent)" : "var(--clr-border-gray)",
                }}
            >
                <div
                    className={`absolute w-5 left-1 top-0.8 h-5 rounded-full bg-white transition-all duration-300 shadow-sm ${classNames?.circle}`}
                    style={{
                        transform: checked ? 'translateX(80%)' : 'translateX(0%)',
                    }}
                />
            </div>

            {label && (
                <div
                    className={`ml-2 text-sm font-medium transition-colors duration-300 ${classNames?.label}`}
                    style={{
                        color: checked ? "var(--clr-accent, #3b82f6)" : "var(--clr-text, #374151)",
                    }}
                >
                    {label}
                </div>
            )}
        </div>
    );
};