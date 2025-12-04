import { observer } from "mobx-react-lite";
import { Sewer } from "../services/sewers";
import { Button } from "@/shared/ui/button";
import { Input } from "@/app/cores/core-trieco/UIKit";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";

type Props = {
    show: boolean;
    setShow: (value: boolean, sewer?: Sewer) => void;
    onClose: () => void;
    sewer?: Sewer,
};

export const SewerInfoModal = observer(({ show, setShow, sewer }: Props) => {
    return (
        <>
            <div className="fixed top-0 left-0 h-full w-full opacity-[40%] bg-[#192038] z-10"></div>
            <div className="fixed top-0 right-0 h-screen bg-white overflow-y-auto min-w-[500px] max-w-[550px] z-20 flex flex-col">
                <div className="items-center w-[100%] flex justify-between border-b-[1px] border-[#EFF4FA] px-[22px] py-[28px]">
                    <p className="text-2xl font-semibold leading-none">Информация об ассенизаторе</p>
                    <Button class="w-[24px] h-[24ox]" onClick={() => setShow(false)} children={<Icon systemName="close" />} />
                </div>

                <div className="overflow-y-auto flex flex-col justify-between  h-full pt-[34px]">
                    <div className="px-[31px] flex flex-col gap-[30px] mb-[55px]">
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'>ФИО ассенизатора</p>
                            <Input class="border-[#BCBCBC]" type='text' disabled value={`${sewer?.lastName || ""} ${sewer?.firstName || ""} ${sewer?.patronymic || ""}`} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'>Виды предпринимательства</p>
                            <Input class="border-[#BCBCBC]" type='text' disabled value={sewer?.sewerBusinessType} />
                        </div>
                        {/* <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'></span>Район</p>
                            <Input class="border-[#BCBCBC]" type='text' disabled value={sewer?.}/>
                        </div> */}
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'></span>Марка автомобиля</p>
                            <Input class="border-[#BCBCBC]" type='text' disabled value={sewer?.sewerCarModel} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'></span>Номер автомобиля</p>
                            <Input class="border-[#BCBCBC]" type='text' disabled value={sewer?.sewerNumberPlate} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'></span>Рейтинг</p>
                            <Input class="border-[#BCBCBC]" type='text' disabled value={sewer?.rating} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'>Логин ассенизатора</p>
                            <Input class="border-[#BCBCBC]" type='text' disabled value={sewer?.sewerBusinessType} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'>Телефон ассенизатора</p>
                            <Input class="border-[#BCBCBC]" type='phone' disabled value={sewer?.phoneNumber} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'>Почта ассенизатора</p>
                            <Input class="border-[#BCBCBC]" type='email' disabled value={sewer?.email} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
})