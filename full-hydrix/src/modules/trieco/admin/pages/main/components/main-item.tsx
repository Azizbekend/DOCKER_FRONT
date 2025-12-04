type Props = {
    title: string;
}

export const MainItem = (props: Props) => {
    return (
        <div className="rounded-[5px] bg-white w-[315px] h-[134px] flex items-center justify-center">
            <span className="font-bold text-[30px] text-[#25396F] text-center whitespace-pre-wrap">{props.title}</span>
        </div>
    )
}