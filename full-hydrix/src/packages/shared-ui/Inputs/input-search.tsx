import { SearchType } from "./setting/input-types";
import { useState } from "react";
import { Icon } from "../icon"

export const Search = (props: SearchType) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (props.lengthOptions && newValue.length > props.lengthOptions.maxLength) return;
        props.onChange && props.onChange(newValue);
    };

    return (
        <div className={`w-full flex gap-1  pl-4 pr-3 py-1 bg-white duration-200 rounded-lg ${props.classNames.container}`}
            style={{
                boxShadow: isFocused ? "rgb(74 133 246) 0px 0px 3px 0px" : "none",  
                ...props.style
            }}>

            <input
                className={`w-full outline-none disabled:bg-zinc-200 text-[14px] ${props.classNames.input}`}
                type="text"
                placeholder={props.placeholder}
                disabled={props.disabled}

                maxLength={props.lengthOptions?.maxLength}
                min={props.minValue}
                max={props.maxValue}
                value={props.value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            <button
                type="button"
                className={` ${props.classNames.icon}`}
                disabled={props.disabled}
            >
                <Icon systemName={props.icon ? props.icon : "search"} height={25} />
            </button>
        </div >
    );
};
