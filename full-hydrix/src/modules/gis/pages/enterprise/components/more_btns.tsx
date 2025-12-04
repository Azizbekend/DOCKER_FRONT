import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useState } from "react";

type MoreBtnProps = {
    showMoreBtn: boolean;
    setShowEditModal: () => void;
};

export const MoreBtn = ({ setShowEditModal }: MoreBtnProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMoreButtonClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEditMenuClick = () => {
        setShowEditModal();
        setIsMenuOpen(false);
    };


    return (
        <>
            <div className="relative z-10">
                <Button onClick={handleMoreButtonClick}><Icon systemName="more" /></Button>
                {isMenuOpen && (
                    <div className="absolute z-10 text-xs transform rounded-[2px] -translate-y-1 -translate-x-[154px] leading-none bg-white shadow w-[160px] border-[#eff4fa] ">
                        <Button onClick={handleEditMenuClick} class="w-[100%] px-[7px] py-[8px]">
                            <span className="text-[#000]">Редактировать</span>
                        </Button>
                        <Button class="w-[100%]  px-[7px] py-[5px]" children={<span className="text-[#000]">Поместить в архив</span>}></Button>
                    </div>
                )}
            </div>
        </>
    );
};