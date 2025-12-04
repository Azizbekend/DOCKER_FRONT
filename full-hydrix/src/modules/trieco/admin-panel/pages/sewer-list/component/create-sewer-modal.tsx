import { Button, Input } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite";
import createSewerModel from "../models/create-sewer-model";
import sewerListModel from "../models/sewer-list-model";
import { useEffect, useState } from "react";
import { useAuth } from "@/entities/user/context";


type Props = {
    show?: boolean;
    setShow?: (value: boolean) => void;
    onClose: () => void;
};

export const CreateSewerModal = observer(({ onClose }: Props) => {
    const {
        model, changeSewerNumberPlate,
        changeTankVolume, createSewer,
        changeBusinessType, changeName,
        changeSewerCarModel, changeLogin,
        changePhone, changeEmail, companies
    } = createSewerModel;

    const { user } = useAuth();

    const [switchSewer, setSwitchSewer] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sewerList = document.querySelector('.sewer-list');
            const inputField = document.querySelector('.sewer-input');

            if (
                sewerList && !sewerList.contains(event.target as Node) &&
                inputField && !inputField.contains(event.target as Node)
            ) {
                setSwitchSewer(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        setSwitchSewer(true);
    };


    return (
        <>
            <div className="fixed top-0 left-0 h-full w-full opacity-[40%] bg-[#192038] z-10"></div>
            <div className="fixed top-0 right-0 h-screen bg-white overflow-y-auto min-w-[500px] max-w-[550px] z-20 flex flex-col">
                <div className="items-center w-[100%] flex justify-between border-b-[1px] border-[#EFF4FA] px-[22px] py-[28px]">
                    <p className="text-2xl font-semibold leading-none">Добавление ассенизатора</p>
                    <Button class="w-[24px] h-[24ox]" onClick={onClose} children={<Icon systemName="close" />} />
                </div>
                <div className="overflow-y-auto flex flex-col justify-between  h-full pt-[34px]">
                    <div className="px-[31px] flex flex-col gap-[30px] ">
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>ФИО водителя</p>
                            <Input underlineText="Например, Иванов Иван Иванович" class="w-full" type='text' value={model.name} onChange={changeName} />
                        </div>

                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Логин водителя</p>
                            <Input class="w-full " type='text' value={model.login} onChange={changeLogin} />
                        </div>

                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Номер телефона водителя</p>
                            <Input class="w-full " type='phone' value={model.phoneNumber} onChange={changePhone} icon="phone" iconActive="phone-active" isFrontIcon={true} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Почта водителя</p>
                            <Input class="w-full " type='email' value={model.email} onChange={changeEmail}
                                icon="mail"
                                iconActive="mail-active" />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Наименование организации</p>
                            <Input
                                id="sewer-input"
                                class="w-full text-left py-2.5 sewer-input"
                                type="button"
                                icon="arrow-triangle-radius"
                                onFocus={handleInputFocus}
                            />

                            <div className={`sewer-list flex flex-col absolute gap-5 bottom-[100%] w-full left-0 px-[14px] mb-2 py-[12px] bg-stone-50 rounded-lg shadow-[0px_0px_10.7px_rgba(0,_0,_0,_0.25)] z-10 ${!switchSewer && "hidden"} max-h-[180px] overflow-y-auto`}>
                                {companies && companies.length > 0 ? (
                                    <p className="text-center text-sm text-gray-500">Компании</p>

                                )
                                    :
                                    (
                                        <p className="text-center text-sm text-gray-500">Нет доступных компаний</p>
                                    )}
                            </div>
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Виды предпринимательства</p>
                            <Input underlineText="Например, частный или государственный" class="w-full" type='text' value={model.sewerBusinessType} onChange={changeBusinessType} />
                        </div>
                        <div className="flex gap-[15px] w-[100%]">
                            <div className="w-[100%] font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Марка автомобиля</p>
                                <Input underlineText="Например, МАЗ" onChange={changeSewerCarModel} value={model.sewerCarModel} class="w-[50%]" type='text' />
                            </div>
                            <div className="w-[100%] font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Номер автомобиля</p>
                                <Input underlineText="Например, О189НН116" onChange={changeSewerNumberPlate} value={model.sewerNumberPlate} class="w-[100%]" type='text' />
                            </div>
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='text-base mb-[9px]'><span className="text-[#D31313]">* </span>Ёмкость автомобиля </p>
                            {<Input class="max-w-[50%]" type='text' value={model.tankVolume === 0 ? "" : model.tankVolume} onChange={(v) => changeTankVolume(v)} measure="м³" />}
                        </div>

                    </div>
                    <div className="px-[31px] pt-[18px] pb-[18px] flex gap-[11px] bg-[#F6F6F6]">
                        {
                            <Button
                                onClick={() => {
                                    createSewer(user?.companyId || 0, (sewer) => {
                                        sewerListModel.pushSewer(sewer);
                                        onClose();
                                    });
                                }}
                                children="Создать"
                                class="bg-[#4a85f6] py-[10px] px-[17px]"
                            />

                        }
                        {
                            <Button children={<span className="text-[#4a85f6]">Отмена</span>} onClick={onClose} class="font-semibold leading-none flex items-center justify-center border-[#4a85f6] border-[2px] py-[10px] px-[17px]" />
                        }
                    </div>
                </div>
            </div>
        </>
    );
});



