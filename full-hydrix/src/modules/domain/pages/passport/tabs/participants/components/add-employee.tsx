import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { Modal } from "@/shared/ui/modal/modal";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { perticipantsModel } from "../../../model/participants-model";

export const AddEmployeeModal = observer(({ show, setShow }: {
    show: boolean,
    setShow: (show: boolean) => void
}) => {

    const [showlist, setShowList] = useState<boolean>(false);
    const { userList, allUserList, addUser, removeUser } = perticipantsModel

    const handleRemove = (e: any, id: number) => {
        e.stopPropagation();
        removeUser(id)
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
                    <div className="flex py-10 px-6 w-full justify-between h-[250px]">
                        <span>Сотрудники</span>
                        <div className="w-[70%] flex items-center gap-2 py-3 px-4 border rounded-md relative h-fit"
                            onClick={() => setShowList(!showlist)}>
                            <div className="flex items-cente flex-wrap gap-2 flex-1">
                                {userList.map((user, key) => {
                                    return (
                                        <div key={key} className="bg-[#DBE7FD] py-1 px-3 flex items-center gap-3 rounded-lg"
                                            onClick={(e) => handleRemove(e, user.id)}
                                        >
                                            <span>{user.name}</span>
                                            <div className="bg-gray-950 w-[25px] h-[25px] cursor-pointer hover:opacity-50 duration-300 flex items-center justify-center p-1 rotate-[45deg] rounded-2xl">
                                                <Icon className="" width={20} systemName="plus-white" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>


                            <div style={{
                                rotate: showlist ? "180deg" : "0deg"
                            }}>
                                <Icon systemName="arrow-down" />
                            </div>

                            {showlist &&
                                <div className="absolute z-3 top-[100%] left-0 bg-black h-5 w-full"
                                    style={{
                                        animation: 'fadeInUp 0.2s ease forwards'
                                    }}>

                                    {allUserList.map((user, key) => {
                                        return (
                                            <div onClick={() => addUser(user)}>
                                                {user.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            }

                        </div>
                    </div>
                }

                footerSlot={
                    <div className="flex items-center justify-end gap-3">
                        <Button class="font-semibold hover:opacity-50 ducation py-2 px-4 border border-[var(--clr-accent)] text-[var(--clr-accent)]">Отменить</Button>
                        <Button class="font-semibold hover:opacity-50 ducation py-2 px-4 text-white bg-[var(--clr-accent)]">Добавить</Button>
                    </div>
                }
            />
        </>
    )
})