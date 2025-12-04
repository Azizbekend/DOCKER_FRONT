import { Icon } from "@/app/cores/core-trieco/UIKit/icon";

type Props = {
    title: string;
    value: string;
    icon: string;
}

export const StatBlock = ({ title, value, icon }: Props) => {
    return (
        <div className="rounded-md bg-white flex flex-row py-4 px-7 items-center justify-between gap-5">
            <div className="flex flex-col max-w-[70%]">
                <span className="text-[#25396F] text-[14px] font-semibold uppercase whitespace-pre-line">{title}</span>
                <span className="text-[#7C8DB5] text-[26px] font-bold">{value}</span>
            </div>
            <Icon systemName={icon} />
        </div>
    )
}