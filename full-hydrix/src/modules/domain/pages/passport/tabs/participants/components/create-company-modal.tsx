import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { Modal } from "@/shared/ui/modal/modal";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { createCompanyModel } from "../../../model/participants-model copy";
import { Input } from "@/shared/ui/Inputs/input-text";
import { SwitchButton } from "@/shared/ui/switch-button";

export const CreateCompanyModal = observer(({ show, setShow }: {
    show: boolean,
    setShow: (show: boolean) => void
}) => {


    const { innInput, roleInput, companyList, setInnInput, setRoleInput, createCompany } = createCompanyModel

    const [activeCompanies, setActiveCompanies] = useState<number[]>([])
    const [stageModal, setStageModal] = useState<number>(0)
    const [lookCompanies, setLookCompanies] = useState<boolean>(false)

    const onSearchCompany = (value: boolean) => {
        if (lookCompanies) {
            setLookCompanies(false)
            setTimeout(() => {
                setLookCompanies(true)
            }, 1000)
        } else {
            setLookCompanies(true)
        }
    }

    const onActiveCompanies = (id: number) => {
        if (activeCompanies.includes(id)) {
            setActiveCompanies(activeCompanies.filter((item) => item !== id))
        } else {
            setActiveCompanies([...activeCompanies, id])
        }
    }

    return (
        <>
            <Modal
                wrapperId='sewerInfoModal'
                type="center"
                show={show}
                setShow={setShow}
                title={<div>Добавление сотрудников на роль<br /> «Руководителя проекта»</div>}
                classNames={{
                    panel: "max-w-[640px] w-full",
                    footer: "bg-[#F6F6F6] p-[20px_24px_16px_24px]"
                }}

                children={
                    <div className="py-10 px-6 w-full min-h-[80vh]">
                        {stageModal == 0
                            &&
                            <>
                                <div className="grid grid-cols-[2fr_3fr] gap-3 mb-3">
                                    <div className="font-semibold">Наименование организации или ИНН</div>
                                    <Input type="number" placeholder="Наименование организации или ИНН" value={innInput} onChange={setInnInput}
                                        className="border-2 py-2 px-3 rounded" />
                                </div>

                                <Button class="bg-[var(--clr-accent)] py-2 px-4 rounded text-white hover:opacity-50 mb-10"
                                    onClick={() => onSearchCompany(true)}>Найти организацию</Button>
                            </>
                        }

                        {/* lookCompanies */}
                        {lookCompanies && innInput.length > 0 &&
                            <div className="h-4 w-full"
                                style={{
                                    animation: 'fadeInUp 0.2s ease forwards'
                                }}>

                                {companyList.map((company, key) => {
                                    return (
                                        <div key={key} className="border rounded-lg py-5 px-8 cursor-pointer" onClick={() => onActiveCompanies(company.id)}
                                            style={{
                                                borderColor: stageModal == 0 ? (activeCompanies.includes(company.id) ? 'var(--clr-accent)' : '#CCCCCC') : 'var(--clr-accent)'
                                            }}>
                                            <div className="flex gap-3 mb-3">
                                                <div className='font-semibold'>{company.name}</div>
                                                <div className='border border-[#34C759] h-fit w-fit text-[#34C759] rounded-2xl px-3 py-1'>Действующая</div>
                                            </div>

                                            <div className="text-[14px]">
                                                <div className="grid grid-cols-[2fr_3fr] mb-2">
                                                    <div>Адрес</div>
                                                    <div className=" font-medium">{company.address}</div>
                                                </div>
                                                <div className="grid grid-cols-[2fr_3fr] mb-2">
                                                    <div>ИНН</div>
                                                    <div className=" font-medium">{company.inn}</div>
                                                </div>
                                                <div className="grid grid-cols-[2fr_3fr] mb-2">
                                                    <div>Полное наименование</div>
                                                    <div className=" font-medium">{company.waterCompanyName}</div>
                                                </div>
                                                <div className="grid grid-cols-[2fr_3fr] mb-2">
                                                    <div>Краткое наименование</div>
                                                    <div className=" font-medium">{company.name}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 w-fit cursor-pointer">
                                                <span className="text-[var(--clr-accent)] text-[14px] pb-1">Все реквизиты</span>
                                                <div className="rotate-[-90deg]">
                                                    <Icon systemName="arrow-left-blue" height={15} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}


                                {stageModal > 0 &&
                                    <div className="mt-10">
                                        <div className="grid grid-cols-[2fr_3fr] mb-2">
                                            <span>Роль</span>
                                            <Input type="text" placeholder="Роль"
                                                className="border-2 py-2 px-3 rounded"
                                                value={roleInput} onChange={setRoleInput} />
                                        </div>
                                        <div className="grid grid-cols-[2fr_3fr] mb-2">
                                            <div>Заказчик</div>

                                            <SwitchButton
                                                onChange={() => { console.log() }}
                                                classNames={{
                                                    container: "ml-7 gap-3",
                                                    button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                                                    circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div >
                }

                footerSlot={
                    < div className="flex items-center justify-between gap-3" >
                        <div className="flex gap-2 items-center cursor-pointer hover:opacity-50 duration-300"
                            onClick={() => setStageModal(0)}>
                            {stageModal > 0 && <>
                                <Icon systemName="arrow-left-blue" width={10} />
                                <span className="text-[var(--clr-accent)] text-[18px]">назад</span>
                            </>}
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={() => setShow(false)}
                                class="font-semibold hover:opacity-50 ducation py-2 px-4 border border-[var(--clr-accent)] text-[var(--clr-accent)]">Отменить</Button>
                            {stageModal == 0
                                ?
                                <Button
                                    onClick={() => setStageModal(1)}
                                    disabled={activeCompanies.length == 0}
                                    class="font-semibold hover:opacity-50 ducation py-2 px-4 text-white bg-[var(--clr-accent)]">Дальше</Button>
                                :
                                <Button
                                    onClick={() => { createCompany(); setShow(false); }}
                                    disabled={stageModal === 0 && roleInput.length > 0}
                                    class="font-semibold hover:opacity-50 ducation py-2 px-4 text-white bg-[var(--clr-accent)]">Добавить</Button>

                            }
                        </div>
                    </div >
                }
            />
        </>
    )
})