import { Button, Input } from "@/app/cores/core-trieco/UIKit";
import updateUserModel from "./model/update-user";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import headerStore from "../../kernel/helper/header-store";
import mobileModel from "../../kernel/model/mobile-model";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";

export const EditProfileView = observer(() => {
    const { model, changeEmail, changeFirstName, changeLastName, changeMiddleName, changePhone, setPage, update, isChanged } = updateUserModel;

    const { user, setUser } = mobileModel;

    useEffect(() => {
        headerStore.setOnBackButtonClick(() => { setPage(1); headerStore.clear() })

        return () => {
            headerStore.clear();
        }
    }, [setPage])

    return (
        <div className="w-full px-7 flex flex-col gap-10 mt-12">
            <div className="w-full flex items-center justify-center">
                <div className="relative w-[100px] h-[100px] bg-[#FF7A66] rounded-full shadow-lg">
                    <Icon systemName="edit-image-mobile" className="absolute bottom-1 right-1" width={30} height={30} />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <span className="font-bold text-xl mb-4">Персональные данные</span>
                <div className="flex gap-[15px] w-[100%]">
                    <div className="w-[100%] leading-none">
                        <p className='mb-2 text-[#7D7D7D] text-sm'>Фамилия</p>
                        <Input onChange={changeLastName} value={model?.lastName} notAllBorder={true} class="border-b rounded-none border-[#E9E9E9] pl-0" />

                    </div>
                    <div className="w-[100%] leading-none">
                        <p className='mb-2 text-[#7D7D7D] text-sm'>Имя</p>
                        <Input onChange={changeFirstName} value={model?.firstName} notAllBorder={true} class="border-b rounded-none border-[#E9E9E9] pl-0" />
                    </div>
                </div>
                <div className="flex gap-[15px] w-[100%]">
                    <div className="w-[100%] leading-none">
                        <p className='mb-2 text-[#7D7D7D] text-sm'>Отчество</p>
                        <Input onChange={changeMiddleName} value={model?.patronymic} notAllBorder={true} class="border-b rounded-none border-[#E9E9E9] pl-0" />

                    </div>
                    <div className="w-[100%] leading-none">
                        <p className='mb-2 text-[#7D7D7D] text-sm'>Телефон</p>
                        <Input type="phone" onChange={changePhone} value={model?.phoneNumber} notAllBorder={true} class="border-b rounded-none border-[#E9E9E9] pl-0" />
                    </div>
                </div>
                <div className="w-[100%] leading-none">
                    <p className='mb-2 text-[#7D7D7D] text-sm'>E-mail</p>
                    <Input type="email" onChange={changeEmail} value={model?.email} notAllBorder={true} class="border-b rounded-none border-[#E9E9E9] pl-0" />
                </div>

                <Button children="Обновить профиль" disabled={!isChanged({ ...user! })} onClick={() => update(setUser)} class="w-full flex justify-center font-semibold text-[14px] py-3 bg-[#4A85F6]" />
            </div>
        </div>
    )
})