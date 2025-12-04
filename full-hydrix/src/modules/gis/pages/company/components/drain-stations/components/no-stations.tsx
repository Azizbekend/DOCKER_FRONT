import { Icon } from "@/shared/ui/icon"

export const NoStations = () => {
    return (
        <>
            <div className="w-[100%] py-[16px] px-[9px] my-[22px] bg-[#ffc691] bg-opacity-[29%] border-1 items-center rounded-[3px] flex gap-[10px]">
                <Icon systemName="info" />
                <p className="text-[13px] font-semibold leading-none text-[#222121] ">Не найдены сливные станции</p>
            </div>
        </>
    )
}