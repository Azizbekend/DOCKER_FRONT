import { useEffect, useState } from "react";

type Props = {
    children?: React.ReactNode;
    class?: string;
    onClick?: (e: any) => void;
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    style?: React.CSSProperties;
    styleColor?: "blue" | "red" | "green" | "blueOutline" | "redOutline"
}

export const Button = (props: Props) => {

    const colorClasses = {
        blue: "bg-blue-500 hover:bg-blue-700 text-white",
        green: "bg-green-500 hover:bg-green-700 text-white",
        red: "bg-red-500 hover:bg-red-700 text-white",
        blueOutline: "border border-red-500 hover:bg-red-700 text-white border-2",
        redOutline: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white border-2",
    } as const;



    return (
        <button
            name="button"
            type={props.type ?? "button"}
            disabled={props.disabled}
            className={`flex items-center justify-center cursor-pointer font-medium rounded-lg disabled:cursor-default duration-300 ${colorClasses[props.styleColor as keyof typeof colorClasses] ?? ""} ${props.class} ${props.disabled ? "bg-[#bcbcbc] hover:bg-[#bcbcbc] text-black" : ""}`}
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