import { Button, Input, Modal } from "@/app/cores/core-trieco/UIKit";

type Props = {
    show: boolean;
    setShow: (v: boolean) => void
}

export const EditLoginModal = ({ show, setShow }: Props) => {
    return (
        <Modal title="Изменить логин" show={show} setShow={setShow}>
            <div className="mt-1 flex flex-col gap-4 max-w-80">
                <Input
                    headerText="Логин"
                    underlineText="Минимальная длина - 5 символов."
                    isRequired
                />
                <div className="flex flex-row gap-12">
                    <Button disabled children='Сохранить' class="bg-[#4A85F6] rounded-lg !py-3 !px-10 font-bold" />
                    <Button children='Отмена' onClick={() => setShow(false)} class="!text-[#4A85F6] rounded-lg !py-3 !px-10 font-bold" />
                </div>

            </div>
        </Modal>
    )
}