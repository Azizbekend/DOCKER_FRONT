type Props = {
    children?: React.ReactNode;
    class?: string;
    onClick?: (e: any) => void;
    disabled?: boolean
}

export const Button = (props: Props) => {
    return (
        <button
            type="button"
            disabled={props.disabled}
            className={`${props.class} ${props.disabled ? "bg-[#bcbcbc]" : ""} flex cursor-pointer flex-row rounded-lg text-white py-2 disabled:cursor-default`}
            onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.onClick != undefined && props.onClick(e)}}
        >
            {props.children}
        </button>
    )
}