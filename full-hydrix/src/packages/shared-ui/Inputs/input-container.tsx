import { Icon } from "../icon";
import { InputContainerType } from "./setting/input-types";

export const InputContainer = (props: InputContainerType) => {
    return (
        <div className={`flex flex-col ${props.classNames?.wrapper ?? ""} relative`}>
            {props.headerText && (
                <span className={`font-semibold text-[16px] mb-1 ${props.classNames?.header ?? ""}`}>
                    {props.isRequired && <span className="text-[#C30707]">*</span>}
                    {" "}{props.headerText}
                </span>
            )}

            <div className={`flex items-center w-full relative ${props.classNames?.children}`}>
                {props.children}

                {props.measure && (
                    <div className="flex items-center justify-center text-sm border-2 outline-none rounded-lg rounded-l-none border-l-0 h-[38px]">
                        <span className="px-2 py-1.5 text-[18px]">{props.measure}</span>
                    </div>
                )}

                {props.iconName && (
                    <div className={`${props.classNames?.icon ?? ""}`}>
                        <Icon systemName={props.iconName} className="text-gray-500" height={20} width={20} />
                    </div>
                )}
            </div>

            <div className="flex flex-col mt-1">
                {props.validText && (
                    <span className={`text-[#CB0D0D] text-[12px] mb-1 ${props.classNames?.valid ?? ""}`}>
                        {props.validText}
                    </span>
                )}
                {props.underlineText && (
                    <span className={`text-[#757575] text-[12px] mb-1 ${props.classNames?.underlineText ?? ""}`}>
                        {props.underlineText}
                    </span>
                )}
            </div>
        </div>
    );
};