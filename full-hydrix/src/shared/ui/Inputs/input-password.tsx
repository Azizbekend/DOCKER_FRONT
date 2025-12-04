import type { ChangeEvent, FC } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { PasswordInputType, ValidationResult } from "./setting/input-types";

// const DEFAULT_TOGGLE_LABEL_SHOW = "Показать пароль";
// const DEFAULT_TOGGLE_LABEL_HIDE = "Скрыть пароль";

// const getValidationMessage = (result?: ValidationResult) => {
//     if (!result) return "";
//     return result.success ? "" : result.message ?? "";
// };

export const Password: FC<PasswordInputType> = memo((props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const icon = showPassword ? <FiEyeOff /> : <FiEye />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        props.onChange && props.onChange(newValue);
    };

    return (
        <div
            className={`w-full flex gap-1 ${props.classNames.container}`}
            style={{
                borderColor: isFocused ? "var(--clr-accent)" : (props.isError ? "var(--clr-error)" : "var(--clr-border-gray)"),
                ...props.style
            }}>

            <input
                disabled={props.disabled}
                type={showPassword ? "text" : "password"}
                placeholder={props.placeholder}
                value={props.value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full . outline-none disabled:bg-zinc-200 ${props.classNames.input}`}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={` ${props.classNames.icon}`}
                disabled={props.disabled}
            >
                {icon}
            </button>
        </div >
    );
},
);

Password.displayName = "Password";
