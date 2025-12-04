import { Button, Input, Modal } from "@/app/cores/core-trieco/UIKit";

type Props = {
    show: boolean;
    setShow: (v: boolean) => void
}

export const EditPasswordModal = ({ show, setShow }: Props) => {
    return (
        <Modal title="Изменить пароль" show={show} setShow={setShow} className={"w-[400px]"}>
            <div className="mt-1 flex flex-col gap-4 ">
                <Input
                    headerText="Текущий пароль"
                    type="password"
                    isRequired
                />
                <Input
                    headerText="Новый пароль"
                    type="password"
                    isRequired
                    underlineText="Пароль должен содержать от 8 до 20 символов, прописные и строчные латинские символы, цифры, а также хотя бы один из специальных символов @$!%*#?&.,-"

                />
                <Input
                    type="password"
                    headerText="Повторите новый пароль"
                    isRequired
                />
                <div className="flex flex-row justify-between">
                    <Button disabled children='Сохранить' class="bg-[#4A85F6] rounded-lg !py-3 !px-10 font-bold" />
                    <Button children='Отмена' onClick={() => setShow(false)} class="!text-[#4A85F6] rounded-lg !py-3 !px-10 font-bold" />
                </div>

            </div>
        </Modal>
    )
}