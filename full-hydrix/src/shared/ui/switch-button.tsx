import { useState } from "react";

interface SwitchButtonProps {
    classNames?: {
        container?: string;
        button?: string;
        circle?: string;
        label?: string;
    },

    label?: string;

    onChange: (value: boolean) => void;
}


export const SwitchButton = (props: SwitchButtonProps) => {


    const [checked, setChecked] = useState(false);


    const handleClick = () => {
        if (props.onChange) {
            props.onChange(checked);

            setChecked(!checked)
        }
    }
    return (
        <div className={`flex items-cennter cursor-pointer ${props.classNames?.container}`} onClick={handleClick}>
            <div className={`duration-300 ${props.classNames?.button}`}
                style={{
                    backgroundColor: checked ? "var(--clr-accent)" : "",
                }}
            >
                <div className={`duration-300 ${props.classNames?.circle}`}
                    style={{
                        marginLeft: checked ? "auto" : "",
                    }}
                >
                </div>
            </div>

            <div className={`duration-300 ${props.classNames?.label}`}

                style={{
                    color: checked ? "var(--clr-accent)" : "",
                }}>
                {props.label}
            </div>
        </div >
    );
};