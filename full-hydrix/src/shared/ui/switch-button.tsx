import { useState } from "react";

interface SwitchButtonProps {
    classNames?: {
        container?: string;
        button?: string;
        circle?: string;
        label?: string;
    },

    label?: string;
    disabled: boolean,
    onChange: (value: boolean) => void;
}


export const SwitchButton = ({ classNames, label, disabled = false, onChange }: SwitchButtonProps) => {


    const [checked, setChecked] = useState(false);


    const handleClick = () => {
        if (onChange && disabled) {
            onChange(checked);
            setChecked(!checked)
        }
    }
    return (
        <div className={`flex items-cennter cursor-pointer ${classNames?.container}`} onClick={handleClick}>
            <div className={`duration-300 ${classNames?.button}`}
                style={{
                    backgroundColor: checked ? "var(--clr-accent)" : "",
                }}
            >
                <div className={`duration-300 ${classNames?.circle}`}
                    style={{
                        marginLeft: checked ? "auto" : "",
                    }}
                >
                </div>
            </div>

            <div className={`duration-300 ${classNames?.label}`}

                style={{
                    color: checked ? "var(--clr-accent)" : "",
                }}>
                {label}
            </div>
        </div >
    );
};