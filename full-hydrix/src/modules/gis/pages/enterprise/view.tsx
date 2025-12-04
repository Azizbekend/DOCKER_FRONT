import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { MoreBtn } from "./components/more_btns";
import { useState } from "react";
import { EditEnterpriceMenu } from "./components/edit-enterprise-menu";
import { Icon } from "@/shared/ui/icon";


export const EnterpriseView = observer(() => {
    const navigate = useNavigate();
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

    const handleCloseEditMenu = () => {
        setIsEditMenuOpen(false);
    };
    return (
        <>
            {/* <EditEnterpriceMenu
                show={isEditMenuOpen}
                setShow={() => setIsEditMenuOpen(true)}
                onClose={handleCloseEditMenu}
            /> */}
            <div className="flex flex-row ml-16 mt-12 justify-between ">
                <div className="flex flex-col">
                    <div className="flex gap-[28px] items-center mb-[30px]">
                        <div className="bg-[#4A85F6] rounded-md w-[42px] h-[30px] flex items-center justify-center cursor-pointer" onClick={() => navigate("/admin/enterprises")}>
                            <Icon systemName="arrow-left" />
                        </div>
                        <span className="text-[#222B45] font-bold text-[34px]">Школа №2</span>
                    </div>
                    <div className="flex gap-[43px]">
                        <div className="flex flex-col py-[32px] px-[40px] bg-white shadow rounded-[20px]">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-bold leading-[27px] text-[#222b45] max-w-[261px]">Основная информация предприятия</h1>
                                {/* <MoreBtn showMoreBtn={true} setShowEditModal={() => setIsEditMenuOpen(true)} /> */}
                            </div>
                            <div className="flex rounded-[8px] flex-col mt-7 text-[13px] max-h-full">
                                <div className="flex rounded-[20px]">
                                    <div className="py-4 rounded-t-[20px] rounded-tr-[0] px-5 flex-1 items-center flex bg-[#EFF4FA] border-b-[1px] border-white">
                                        <span className="text-[#8F9BB3] font-bold">Наименование параметра</span>
                                    </div>
                                    <div className="py-4 rounded-t-[20px] rounded-tl-[0] px-5 flex-1 flex items-center border-[#EFF4FA] border-[1px] ">
                                        <span className="text-[#8F9BB3] font-bold ">Информация</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="py-4 px-5 flex-1 flex items-center bg-[#EFF4FA] border-b-[1px] border-white">
                                        <span className="text-[#222B45] font-semibold">Наименование юридического лица</span>
                                    </div>
                                    <div className="py-4 px-5 flex-1 flex items-center border-[#EFF4FA] border-[1px] ">
                                        <span className="text-[#222B45]">Школа №2</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="py-4 px-5 flex-1 flex items-center bg-[#EFF4FA] border-b-[1px] border-white">
                                        <span className="text-[#222B45] font-semibold">ФИО руководителя</span>
                                    </div>
                                    <div className="py-4 px-5 flex-1 flex items-center border-[#EFF4FA] border-[1px] ">
                                        <span className="text-[#222B45]">Иванов Иван Иванович</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="py-4 px-5 flex-1 flex items-center bg-[#EFF4FA] border-b-[1px] border-white">
                                        <span className="text-[#222B45] font-semibold">Адрес предприятия</span>
                                    </div>
                                    <div className="py-4 px-5 flex-1 flex items-center border-[#EFF4FA] border-[1px] ">
                                        <span className="text-[#222B45]">Республика Татарстан, г. Казань, ул. Толстого, 3</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="py-4 px-5 flex-1 flex items-center bg-[#EFF4FA] border-b-[1px] border-white">
                                        <span className="text-[#222B45] font-semibold">Обслуживающая организация</span>
                                    </div>
                                    <div className="py-4 px-5 flex-1 flex items-center border-[#EFF4FA] border-[1px] ">
                                        <span className="text-[#222B45]">Муп Водоканал</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="py-4 px-5 flex-1 flex items-center bg-[#EFF4FA] border-b-[1px] border-white">
                                        <span className="text-[#222B45] font-semibold">Муниципальное образование</span>
                                    </div>
                                    <div className="py-4 px-5 flex-1 flex items-center border-[#EFF4FA] border-[1px] ">
                                        <span className="text-[#222B45]">г. Казань</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="py-4 px-5 rounded-bl-[20px] flex-1 flex items-center bg-[#EFF4FA] border-b-[1px] border-white">
                                        <span className="text-[#222B45] font-semibold">Контракт/договор</span>
                                    </div>
                                    <div className="py-4 px-5 rounded-br-[20px] flex-1 flex items-center border-[#EFF4FA] border-[1px] ">
                                        <a href="#LINK" className="text-blue-500 underline">ссылка на документ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            graph
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})