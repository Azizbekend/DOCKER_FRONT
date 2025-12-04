import { observer } from "mobx-react-lite";
import { Sewer } from "@/entities/sewer/type";
import { Input } from "@/shared/ui/Inputs/input-text";
import { Modal } from "@/shared/ui/modal/modal";
import { InputContainer } from "@/shared/ui/Inputs/input-container";

type Props = {
    show: boolean,
    setShow: (value: boolean) => void,
    info: Sewer | null
}

export const SewerInfoModal = observer(({ show, setShow, info }: Props) => {
    return (
        <>
            <Modal
                wrapperId='sewerInfoModal'
                type="right"
                show={show}
                setShow={setShow}
                title="Информация об ассенизаторе"
                classNames={{
                    panel: "max-w-[640px] w-full",
                    footer: "bg-[#F6F6F6] p-[20px_24px_16px_24px]"
                }}

                children={
                    <div className="p-8 flex flex-col gap-[30px]">
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="ФИО ассенизатора"
                            isRequired
                        >
                            <Input
                                type='text'
                                disabled
                                value={`${info?.lastName || ""} ${info?.firstName || ""} ${info?.patronymic || ""}`}
                                placeholder="Наименование организации"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>

                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Виды предпринимательства"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.sewerBusinessType}
                                placeholder="Виды предпринимательства"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Наименование организации"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.companyName}
                                placeholder="Наименование организации"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Марка автомобиля"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.sewerCarModel}
                                placeholder="Марка автомобиля"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Номер автомобиля"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.sewerNumberPlate}
                                placeholder="Номер автомобиля"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Рейтинг"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.rating}
                                placeholder="Рейтинг"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Логин ассенизатора"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.sewerBusinessType}
                                placeholder="Логин ассенизатора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Телефон ассенизатора"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.phoneNumber}
                                placeholder="Телефон ассенизатора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Почта ассенизатора"
                        >
                            <Input
                                type='text'
                                disabled
                                value={info?.email}
                                placeholder="Почта ассенизатора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                    </div>
                }
            />
        </>
    )
})