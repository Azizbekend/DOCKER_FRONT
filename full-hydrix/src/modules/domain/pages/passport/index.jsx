
import { Link } from "react-router-dom";
import { Icon } from "@/shared/ui/icon"

import { PassportParticipants } from "./tabs/participants"
import { PassportInformation } from "./tabs/information"
import { useState } from "react";

export const PassportObject = () => {

    const [isTabInformation, setIsTabInformation] = useState(true);


    return (
        <>
            <div className='flex items-center gap-[28px] mb-[38px]'>
                <Link to={"/menu-moduls"} className='bg-[var(--clr-accent)] rounded px-3 py-2 hover:opacity-50 cursor-pointer duration-300'>
                    <Icon systemName="arrow-left" />
                </Link>
                <span className='font-bold text-[#222B45] text-[34px]'>Единый реестр объектов</span>
            </div>

            <div className='bg-white mb-[60px] py-[5px] pl-[40px] pr-[40px] flex items-center justify-between'
                style={{
                    width: "calc(100% + 80px)",
                    marginLeft: "-40px",
                }}>

                <div className='flex items-center gap-3 py-1 text-[16px] font-regular'>
                    <Icon systemName="arrow-left-blue" />
                    <Link to={"/domain/list"} className="text-[#757575]">Единый реестр объектов</Link>
                    <div className="h-[16px] w-[1.5px] bg-[var(--clr-accent)] block"></div>
                    <span className="text-[var(--clr-accent)]">Паспорт объекта</span>
                </div>

            </div>


            <div className="relative">
                <div className="absolute  top-[-38px] left-[30px] flex gap-3">
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${isTabInformation ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setIsTabInformation(true)}>
                        Паспорт
                    </div>
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${!isTabInformation ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setIsTabInformation(false)}>
                        Участники
                    </div>
                </div>

                {isTabInformation ? <PassportInformation /> : <PassportParticipants />}
            </div>
        </>
    )
}