import Tooltip from "@/shared/ui/tooltip";
import { useState } from "react";

type Props = {
    title: string;
    subtitle: string;
    adress: string;
    coordinates: string;
    daily_limit: number;
    serviced_area?: string;
}
export const Station = (props: Props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.coordinates)
            .then(() => {
                setCopied(true);
            })
            .catch(err => console.error("Не удалось скопировать: ", err));
    };


    return (
        <>
            <div className="">
                <p className="mt-[29px] text-[15px] leading-normal">{props.title}</p>
                <p className="mt-[11px] text-[17px] font-semibold leading-normal">{props.subtitle}</p>
                <div className="flex 2xl:gap-[208px] gap-[155px] mt-[20px]">
                    <h2 className="text-[13px] font-semibold leading-none">Адрес</h2>
                    <div className="flex flex-col">
                        <p className='text-xs leading-[15px] max-w-[356px]'>{props.adress}</p>
                        <div className="flex gap-[6px]">
                            <p className="max-w-[316px] text-xs leading-[15px]">{props.coordinates}</p>
                            <div id="tooltip" className="group-hover:visible relative flex justify-center items-center cursor-pointer whitespace-nowrap">
                                <Tooltip text={copied ? "Координаты скопированы" : "Скопировать координаты"} onCopy={handleCopy} onMouseLeave={() => setCopied(false)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex 2xl:gap-[76px] gap-[23px] mt-[20px]">
                    <h2 className="text-[13px] font-semibold leading-none">Суточный лимит станции</h2>
                    <p className='text-xs leading-[15px] max-w-[316px]'>{props.daily_limit}м³</p>
                </div>
                {props.serviced_area && <div className="flex gap-[58px] mt-[22px]">
                    <h2 className="text-[13px] font-semibold leading-none">Обслуживаемая территория</h2>
                    <p className='text-xs leading-[15px] max-w-[316px]'>{props.serviced_area}</p>
                </div>}
            </div>
        </>
    )
};