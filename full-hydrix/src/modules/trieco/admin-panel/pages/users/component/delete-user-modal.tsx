import { Button, Modal } from "@/app/cores/core-trieco/UIKit"
import userModel from "../models/users-model"

type Props = {
    id: number,
    show: boolean,
    setShow: (value: boolean) => void
}

export const DeleteUserModal = ({ show, setShow, id }: Props) => {

    const { deleteUser } = userModel

    return (
        <Modal title="Сообщение об аварии" show={show} setShow={setShow}>
            <div className="mt-1 flex flex-col gap-4">
                <span className="text-[#332C2C] text-[15px]">Вы действительно хотите удалить пользователя?</span>
                <div className="flex flex-row-reverse gap-8">
                    <Button class="px-2 !py-1" onClick={() => setShow(false)}>
                        <span className="text-[#8F9BB3] text-[13px]">Отмена</span>
                    </Button>
                    <Button children="Удалить" class="bg-[#0095FF] text-[13px] px-4 !py-1" onClick={() => deleteUser(id, setShow)} />
                </div>
            </div>
        </Modal>
    )
}