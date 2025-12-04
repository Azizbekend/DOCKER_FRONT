import { Input, Button, Modal } from "@/app/cores/core-trieco/UIKit"

type Props = {
    show: boolean,
    setShow: (value: boolean) => void
}

export const AccidentReportModal = ({ show, setShow }: Props) => {
    return (
        <Modal title="Сообщение об аварии" show={show} setShow={setShow}>
            <div className="mt-1 flex flex-col gap-4">
                <span className="text-[#332C2C] text-[15px]">Информация об аварии</span>
                <Input placeholder="Местоположение аварии*" class="border-[#EFF4FA] border-1" />
                <Input placeholder="Причина аварии*" class="border-[#EFF4FA] border-1" />
                <Input placeholder="Объем и характер воды*" class="border-[#EFF4FA] border-1" />
                <div className="flex flex-row-reverse gap-8">
                    <Button class="px-2 !py-1" onClick={() => setShow(false)}>
                        <span className="text-[#8F9BB3] text-[13px]">Отмена</span>
                    </Button>
                    <Button children="Отправить" class="bg-[#0095FF] text-[13px] px-4 !py-1" />
                </div>
            </div>
        </Modal>
    )
}