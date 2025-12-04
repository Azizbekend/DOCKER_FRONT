import { Button, Input } from "@/app/cores/core-trieco/UIKit";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { observer } from "mobx-react-lite";

export const ChangeSewerCompany = observer(({ sewer, onClose, onClickChange }: { sewer: any, onClose: () => void, onClickChange: (sewer: any) => void }) => {
    return (
        <>
            <div className="fixed top-0 left-0 h-full w-full bg-[#192038] opacity-[70%] z-20"></div>

            <div className="py-[16px] px-[20px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-1 rounded-lg border-[#eff4fa] z-20">
                <div className="pb-[17px] items-center flex justify-between border-b-[1px] ">
                    <p className="mb-text-2xl font-semibold leading-none">Изменить организацию</p>
                    <Button onClick={onClose} class='py-0' children={<Icon systemName="close" />} />
                </div>
                <div className="mb-[22px] py-[32px] w-[600px] text-[14px] leading-none text-[#222b45] font-semibold leading-none flex flex-col gap-[30px]">
                    <div className="">
                        <p className='mb-[9px]'>Текущая организация</p>
                        <Input underlineText="Например, «ООО ИРТЫШ»" class="w-full" type='text' value={sewer.companyName} />
                    </div>
                    <div className="">
                        <p className='mb-[9px]'>Выбрать другую организацию</p>
                        <Input class="w-full" type='text' value={sewer.name} icon="menu" iconActive="menu-active" />
                    </div>
                </div>

                <div className="flex w-[100%] justify-end items-center">
                    <Button onClick={() => { onClickChange(sewer); onClose(); }} class="bg-[#4a85f6] px-[34px] py-[5px]" children="Сохранить" />
                    <Button onClick={onClose} class="!text-[#8f9bb3] px-[24px] py-[5px]" children="Отмена" />
                </div>
            </div>
        </>
    );
});
