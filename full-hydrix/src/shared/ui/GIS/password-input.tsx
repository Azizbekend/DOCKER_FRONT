import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
    wrapperClass?: string;
    class?: string;
    placeholder?: string;
    value?: number | string;
    isRequired?: boolean;
    headerText?: string;
    underlineText?: string;
    underlineTextStyle?: string;
    disabled?: boolean,
    id?: any,
    onChange?: (value: any, isValid?: ValidationResult, target?: any) => void;
    validationCallback?: (props: string) => ValidationResult
}


export type ValidationResult = {
    success: boolean,
    message?: string | null
}

export interface ValidationEvent<T> extends React.ChangeEvent<T> {
    valid?: boolean
}


export const Password = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    return (
        <div className={`flex flex-col ${props.wrapperClass} relative`}>
            <span className="font-semibold text-[13px] mb-1">{props.headerText} {props.isRequired && <span className="text-[#C30707]">*</span>}</span>
            <div className="relative z-10">
                <input
                    disabled={props.disabled ? true : false}
                    type={showPassword ? "text" : "password"}
                    className={"w-full border-2 border-[#4A85F6] rounded-lg outline-none px-2.5 py-1.5" + " " + props.class}
                    value={props.value}
                    id={props.id}
                    placeholder={props.placeholder}
                    onChange={(e) => { props.onChange && props.onChange(e.target.value, props.validationCallback && props.validationCallback(e.target.value)!, e); }} />
                {
                    !showPassword ? <FiEye className="absolute top-[30%] right-[5%] cursor-pointer" onClick={togglePasswordVisibility} /> : <FiEyeOff onClick={togglePasswordVisibility} className="absolute top-[30%] right-[5%] cursor-pointer" />
                }
            </div>

            <span className={"text-[#757575] text-[12px] mb-1 " + props.underlineTextStyle}>{props.underlineText}</span>
        </div>
    )
}