import { Button } from "@/packages/shared-ui/button/button";
import { Icon } from "@/packages/shared-ui/icon";
import { Modal } from "@/packages/shared-ui/modal/modal";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { createCompanyModel } from "../models/create-company-model";
import { addParticipantsModel } from "../models/add-participants-model";


type Props = {
    show: boolean,
    setShow: (value: boolean) => void,
    companyId: number
    updateList: (companyId: number, data: any) => void
}

export const AddParticipantsModal = observer(({ show, setShow, companyId, updateList }: Props) => {
    const { init, allUsers, attachUsers, pushUser, removeUser, getUpdateList, attachUsersIds } = addParticipantsModel
    const [showList, setShowList] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        init(companyId);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowList(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const onSetShow = (value: boolean) => {
        getUpdateList(updateList);
        setShow(value);
    }


    return (
        <Modal
            wrapperId="addEmployeeModal"
            type="center"
            show={show}
            setShow={setShow}
            title={"Добавление сотрудников"}
            classNames={{
                panel: "max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200",
                footer: "py-4 px-6 border-t border-gray-200 flex justify-end gap-3"
            }}
            children={
                <div className="p-6 min-h-[40vh]">
                    <div className="space-y-1 mb-4">
                        <label className="block text-sm font-medium text-gray-700">Выбранные сотрудники</label>
                        <p className="text-xs text-gray-500">Добавьте или удалите сотрудников из списка</p>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <div onClick={() => setShowList(!showList)}
                            className={`flex flex-wrap items-center gap-2 min-h-[48px] p-3 border rounded-xl transition-all duration-200 border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200`}>
                            {attachUsers.length > 0 ? attachUsers.map((user, key) => (
                                <div
                                    key={key}
                                    onClick={(e) => { e.stopPropagation(); removeUser(user.id) }}
                                    className="flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:bg-blue-200"
                                >
                                    <span className="truncate max-w-[120px]">{user.lastName + " " + user.firstName + " " + user.patronymic}</span>
                                    <button type="button"
                                        className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors"
                                        aria-label={`Удалить ${user.lastName + " " + user.firstName + " " + user.patronymic}`}
                                    >
                                        <Icon
                                            systemName="close"
                                            className="text-blue-700"
                                            width={14}
                                        />
                                    </button>
                                </div>
                            )) : (
                                <span className="text-gray-500 text-sm">Нет выбранных сотрудников</span>
                            )}

                            <div className="ml-auto flex items-center">
                                <Icon
                                    systemName="arrow-down"
                                    className={`text-gray-500 transition-transform duration-200 ${showList ? 'rotate-180' : ''
                                        }`}
                                    width={20}
                                />
                            </div>
                        </div>

                        {showList && (
                            <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
                                <div className="max-h-60 overflow-y-auto p-2">
                                    {allUsers.length > 0 ? (allUsers.map((user, key) => (!attachUsersIds.includes(user.id) &&
                                        <button
                                            key={key}
                                            onClick={() => {
                                                pushUser(user);
                                                setShowList(false);
                                            }}
                                            className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 rounded-lg transition-colors group"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                                                <Icon systemName="user" className="text-gray-600" width={16} />
                                            </div>
                                            <span className="ml-3 text-gray-700 group-hover:text-gray-900 font-medium">
                                                {user.lastName + " " + user.firstName + " " + user.patronymic}
                                            </span>
                                            <div className="ml-auto">
                                                <Icon
                                                    systemName="plus"
                                                    className="text-gray-400 group-hover:text-gray-600"
                                                    width={18}
                                                />
                                            </div>
                                        </button>
                                    ))) : (
                                        <div className="px-4 py-3 text-center text-gray-500">
                                            Все сотрудники уже добавлены
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                                <Icon systemName="info" className="text-blue-500" width={20} />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Совет</h3>
                                <p className="mt-1 text-sm text-blue-700">
                                    Вы можете добавить нескольких сотрудников одновременно. Нажмите на имя в выпадающем списке, чтобы добавить сотрудника.
                                </p>
                            </div>
                        </div>
                    </div>
                </div >
            }
            footerSlot={
                <div className="flex gap-3" >
                    <Button
                        onClick={() => setShow(false)}
                        class="flex items-center gap-2 px-6 py-3 bg-white text-[#4A85F6] font-semibold rounded-lg border border-[#4A85F6] hover:bg-[#4A85F6] hover:text-white transition-all duration-200 shadow-sm"
                    >
                        Закрыть
                    </Button>
                    <Button
                        onClick={() => onSetShow(false)}
                        class="flex items-center gap-2 px-6 py-3 bg-[#4A85F6] text-white font-semibold rounded-lg border border-[#4A85F6] hover:bg-[#4A85F6] hover:text-white transition-all duration-200 shadow-sm"
                    >
                        Сохранить
                    </Button>
                </div>
            }
        />
    );
});
