import clientModel from "../../kernel/model/client-model"
import updateUserModel from "./model/update-user";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "@/shared/ui/GIS";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";

export const ProfileView = observer(() => {
    const { model, init, changeEmail, changeFirstName, changeLastName, changeMiddleName, changePhone, update, isValid } = updateUserModel;
    const { setUser, user } = clientModel;
    useEffect(() => {
        user && init(user)
    }, [])
    return (
        <div className="mt-16 py-8 px-10 flex flex-col gap-14 shadow-[1px_1px_5px_rgb(145,_145,_145)] rounded-[6px] ">
            <div className="flex flex-col gap-6">

                <div className="flex justify-between pb-6 mb-6 border-b-[1px]">
                    <div className="flex items-center gap-5">
                        <label htmlFor="img" className="bg-[#D9D9D9] w-[60px] h-[60px] rounded-[100%] flex">
                            {/* <input type="file" className="hidden" id="img" /> */}
                            {/* cursor-pointer */}
                            <Icon systemName="gallery" className="m-auto" width={20} height={20} />
                        </label>

                        <div className="text-lg"><span>{model?.lastName} {model?.firstName} {model?.patronymic}</span></div>
                    </div>
                    {/* <label htmlFor="img" className="cursor-pointer leading-loose bg-[#ECF3FF] text-[#4080FB] rounded-lg py-[14px] px-4 hover:bg-[#4080FB] hover:text-white ease-in-out duration-300">Изменить изображение</label> */}
                </div>

                <div className="flex flex-col gap-[25px]">
                    <span className="font-bold text-[15px]">Персональные данные</span>
                    <div className="grid grid-cols-3 gap-6 max-w-[800px]">
                        <Input headerText="Фамилия" onChange={changeLastName} value={model?.lastName} placeholder="Иванов" class="text-[14px] h-[38px] border-[1px] rounded mt-[10px] py-[16px]" />
                        <Input headerText="Имя" onChange={changeFirstName} value={model?.firstName} placeholder="Иван" class="text-[14px] h-[38px] border-[1px] rounded mt-[10px] py-[16px]" />
                        <Input headerText="Отчество" onChange={changeMiddleName} value={model?.patronymic} placeholder="Иванович" class="text-[14px] h-[38px] border-[1px] rounded mt-[10px] py-[16px]" />
                        <Input type="email" headerText="E-mail" onChange={changeEmail} value={model?.email} placeholder="ivanovivan@gmail.com" class="text-[14px] h-[38px] border-[1px] rounded mt-[10px] py-[16px]" />
                        <Input type="phone" headerText="Моб. телефон" onChange={changePhone} value={model?.phoneNumber} placeholder="+7 (965) 457-45-66" class="text-[14px]  h-[38px] border-[1px] rounded mt-[10px] py-[16px]" />
                    </div>
                </div>
            </div>
            <Button children="Обновить профиль" onClick={() => update(setUser)} class={`!w-fit px-[15px] font-bold py-[11px] bg-[#${isValid ? "4080FB" : "DCDEE3"}]`} />
        </div>
    )
})