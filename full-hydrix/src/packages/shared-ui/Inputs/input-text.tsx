import { InputTextType } from "./setting/input-types";
import { useState } from "react";
import InputMask from "react-input-mask";
import { phoneMask } from "./setting/input-mask";

export const Input = (props: InputTextType) => {
    const [isFocused, setIsFocused] = useState(false);

    const InputComponent = props.type === "phone" ? InputMask : "input"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (props.lengthOptions && props.lengthOptions.maxLength && newValue.length > props.lengthOptions.maxLength) return;
        props.onChange && props.onChange(newValue);
    };

    const changeFocused = (value: boolean) => {
        setIsFocused(value)
        props.onFocus && props.onFocus(value)
    }

    return (
        <InputComponent
            className={`w-full outline-none disabled:bg-zinc-200 ${props.className}`}
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}

            readOnly={props.readonly}
            maxLength={props.lengthOptions?.maxLength}
            min={props.minValue}
            max={props.maxValue}
            mask={props.type === "phone" ? phoneMask : ""}
            value={props.value}
            onChange={handleChange}
            onFocus={() => changeFocused(true)}
            onBlur={() => changeFocused(false)}
            style={{
                borderColor: isFocused ? "var(--clr-accent)" : (props.isError ? "var(--clr-error)" : "var(--clr-border-gray)"),
                ...props.style
            }}
        />
    );
};
