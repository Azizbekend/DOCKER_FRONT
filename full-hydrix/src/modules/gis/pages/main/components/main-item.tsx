type Props = {
    title: string;
}

export const MainItem = (props: Props) => {
    return (
        <div className="cursor-pointer rounded-[5px] bg-[#4A85F6] w-[260px] h-[100px] flex items-center justify-center shadow-[0px_2px_48px_0px_rgba(0,0,0,0.02)]">
            <span className="font-bold text-[25px] text-white text-center whitespace-pre-wrap">{props.title}</span>
        </div>
    )
}