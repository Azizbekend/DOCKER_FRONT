import { StyleColor, styleColorEnum } from "./config";

type Props = {
    children?: React.ReactNode;
    class?: string;
    onClick?: (e: any) => void;
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    style?: React.CSSProperties;
    styleColor?: StyleColor;
}


export const Button = (props: Props) => {

    return (
        <button
            name="button"
            type={props.type ?? "button"}
            disabled={props.disabled}
            className={`flex items-center justify-center cursor-pointer font-medium rounded-lg disabled:cursor-default duration-300 ${styleColorEnum[props.styleColor as keyof typeof colorClasses] ?? ""} ${props.class} ${props.disabled ? "bg-[#bcbcbc] hover:bg-[#bcbcbc] text-black" : ""}`}
            onClick={(e) => {
                if (props.type !== "submit") {
                    e.preventDefault();
                    e.stopPropagation();
                }
                props.onClick != undefined && props.onClick(e)
            }}

            style={props.style}
        >
            {props.children}
        </button >
    )
}