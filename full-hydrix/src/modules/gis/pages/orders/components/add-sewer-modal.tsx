import { Input, Button, Modal } from "@/app/cores/core-trieco/UIKit"
import { observer } from "mobx-react-lite"
import attachSewerModel from "../model/attach-sewer-model"
import { useEffect, useState } from "react"
import orderListModel from "../model/list-model"

type Props = {
    show: boolean,
    setShow: (value: boolean) => void
}

export const AttachSewerModal = observer(({ show, setShow }: Props) => {
    const { filteredSewers, handeInput, init, selectedSewer, handleSelect, attach, orderId } = attachSewerModel;

    const [showList, setShowList] = useState(false)
    const [inputValue, setInput] = useState("")

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (show === false) setInput("")
    }, [show])

    return (
        <Modal title="Назначение ассенизатора" show={show} setShow={setShow}>
            <div className="mt-1 flex flex-col gap-4">
                <span className="text-[#332C2C] text-[15px]">Данные об ассенизаторе</span>
                <div className="relative z-10">
                    <Input placeholder="ФИО водителя*" value={inputValue} onChange={(v) => { handeInput(v); setShowList(v !== ""); setInput(v); handleSelect(null) }} class="border-[#EFF4FA] border-1" />
                    <ul className={`absolute rounded-lg w-full ${!showList && "hidden"}`}>
                        {
                            filteredSewers.map(x => (
                                <li onClick={() => { setInput(`${x.lastName} ${x.firstName} ${x.patronymic === null ? "" : x.patronymic}`); handleSelect(x); setShowList(false); }} className="p-3 bg-[#4A66C9] text-white font-semibold border-2 rounded-lg cursor-pointer">
                                    {x.lastName} {x.firstName} {x.patronymic}
                                </li>
                            ))
                        }

                    </ul>
                </div>
                <div className="flex flex-row-reverse gap-8">
                    <Button class="px-2 !py-1" onClick={() => setShow(false)}>
                        <span className="text-[#8F9BB3] text-[13px]">Отмена</span>
                    </Button>
                    <Button disabled={selectedSewer === null} children="Добавить" onClick={() => { attach(); selectedSewer && orderListModel.attachSewer(orderId, selectedSewer); setShow(false) }} class="bg-[#0095FF] text-[13px] px-4 !py-1" />
                </div>
            </div>
        </Modal>
    )
})