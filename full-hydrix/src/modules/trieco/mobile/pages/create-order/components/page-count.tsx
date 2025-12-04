import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { count } from "console";
import { observer } from "mobx-react-lite"
type Props = {
    page: number;
}

export const PageCount = observer(({ page }: Props) => {

    const getCount = (num: number) => {
        if (num > page) {
            return <div className="border-2 border-[#9D9D9D] rounded-full w-[38px] h-[38px] flex items-center justify-center"><span>{num}</span></div>
        }
        else if (num === page) {
            return <div className="border-2 border-[#2879E4] rounded-full w-[38px] h-[38px] flex items-center justify-center"><span>{num}</span></div>
        }
        else if (num < page) {
            return <div className="border-2 border-[#9D9D9D] rounded-full w-[38px] h-[38px] flex items-center justify-center"><Icon systemName="check" /></div>
        }
    }

    return <>
        <div className="flex items-center justify-center w-full mt-8">
            {getCount(1)}
            <div className="h-0 w-[43px] border-t-2 border-dotted border-[#5E5959]"></div>
            {getCount(2)}
            <div className="h-0 w-[43px] border-t-2 border-dotted border-[#5E5959]"></div>
            {getCount(3)}
        </div>
    </>
})