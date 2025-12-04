import { Button } from "@/app/cores/core-trieco/UIKit"
import mobileModel from "../../kernel/model/mobile-model"
import updateUserModel from "./model/update-user";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import headerStore from "../../kernel/helper/header-store";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"

export const ProfileView = observer(() => {
    const { model, init, nextPage } = updateUserModel;
    useEffect(() => {
        init({ ...mobileModel.user! })
        return () => {
            headerStore.clear();
        }
    }, [init])
    return (
        <div className="w-full px-7 mt-10">
            <div className="flex flex-col items-center gap-3 w-full mb-10">
                <div className="p-5 w-full bg-white rounded-xl z-30 relative shadow-[12px_12px_40px_4px_#BCC4CF40]">
                    <div className="flex mb-[21px] flex-wrap">
                        <div className="bg-[#D8D8D8] rounded-md w-[80px] h-[80px] mr-[17px]"></div>
                        <div className="flex flex-col ">
                            <div className="flex flex-wrap font-bold text-lg max-w-[280px] sm:max-w-[400px]">
                                <span className="mr-1">{model.lastName}</span>
                                <span>{model.firstName}</span>
                            </div>

                            <div className="text-[#7D7D7D] text-sm font-normal">{model.email}</div>
                        </div>
                    </div>
                    <Button children="Редактировать аккаунт" onClick={() => nextPage()} class="w-full flex justify-center font-semibold text-[14px] py-3 bg-[#4A85F6]" />
                </div>


                <div className="flex flex-col mt-8 w-full">
                    <div className="my-3 w-full flex justify-between">
                        <div className="flex gap-2.5">
                            <Icon systemName="settings" className="cursor-pointer" width={30} height={30} />
                            <span className="font-semibold text-lg">Настройки</span>
                        </div>

                        <Icon systemName="chevron-left" className="cursor-pointer" width={24} height={24} />

                    </div>
                    <hr className="h-[2px] w-full border-[#E9E9E9]" />

                    <div className="my-3 w-full flex justify-between" onClick={mobileModel.logout}>
                        <div className="flex gap-2.5">
                            <Icon systemName="off" className="cursor-pointer" width={30} height={30} />
                            <span className="font-semibold text-lg">Выйти</span>
                        </div>
                        <Icon systemName="chevron-left" className="cursor-pointer" width={24} height={24} />
                    </div>
                    <hr className="h-[2px] w-full border-[#E9E9E9]" />

                </div>
            </div>
        </div>
    )
})