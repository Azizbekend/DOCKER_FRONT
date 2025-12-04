import { Button, Input } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite";


type EditEnterpriceMenuProps = {
    show: boolean;
    setShow: (value: boolean) => void;
    onClose: () => void;
};

export const EditEnterpriceMenu = observer(({ show, onClose }: EditEnterpriceMenuProps) => {

    return (
        <>
            {show && (<>
                <div className="fixed top-0 left-0 h-full w-full opacity-[40%] bg-[#192038] z-10"></div>
                <div className="fixed top-0 right-0 h-screen bg-white overflow-y-auto min-w-[500px] max-w-[550px] z-20 flex flex-col">
                    <div className="items-center w-[100%] flex justify-between border-b-[1px] border-[#EFF4FA] px-[22px] py-[28px]">
                        <p className="text-2xl font-semibold leading-none">Редактирование основной информации предприятия</p>
                        <Button class="w-[24px] h-[24ox]" onClick={onClose} children={<Icon systemName="close" />} />
                    </div>
                    <div className="overflow-y-auto flex flex-col justify-between  h-full pt-[34px]">
                        <div className="px-[31px] flex flex-col gap-[30px] mb-[55px]">
                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Наименование предприятия</p>
                                {<Input class="border-[#BCBCBC]" type='text' />}
                            </div>
                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>ФИО руководителя</p>
                                {<Input class="border-[#BCBCBC]" type='text' />}
                            </div>
                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Адрес предприятия</p>
                                {<Input class="border-[#BCBCBC]" type='text' />}
                            </div>
                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Обслуживающая организация</p>
                                {<Input class="border-[#BCBCBC]" type='text' />}
                            </div>
                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Муниципальное образование</p>
                                {<Input class="border-[#BCBCBC]" type='text' />}
                            </div>
                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Контракт/договор</p>
                                {<Input class="border-[#BCBCBC]" type='text' />}
                                <p className="text-[13px] font-normal">Введите ссылку на документ</p>
                            </div>
                        </div>
                        <div className="px-[31px] pb-[18px] flex gap-[11px]">
                            {
                                <Button children="Сохранить" class="bg-[#4a85f6] py-[10px] px-[17px]"></Button>
                            }
                            {
                                <Button children={<span className="text-[#4a85f6]">Отмена</span>} onClick={onClose} class="font-semibold leading-none flex items-center justify-center border-[#4a85f6] border-[2px] py-[10px] px-[17px]" />
                            }
                        </div>
                    </div>
                </div>
            </>
            )}
        </>
    );
});