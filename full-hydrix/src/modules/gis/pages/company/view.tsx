import userModel from "@/modules/trieco/admin-panel/viewports/users/models/users-model";
import { Icon } from "@/shared/ui/icon";
import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import waterCompanyModel from "./model/water-company-model";
import { Card } from "./components/card";
import { DrainStations } from "./components/drain-stations/drain-stations";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Input } from "@/shared/ui/Inputs/input-text";
import { Button } from "@/shared/ui/button";
import { ModalDelete } from "@/shared/ui/modal/modal-delete";
import { useAuth } from "@/entities/user/context";
// import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
// import { Card } from "./components/card"
// import { useNavigate, useParams } from "react-router-dom"
// import { DrainStations } from "./components/drain-stations/drain-stations"
// import { useEffect } from "react"
// import waterCompanyModel from "./model/water-company-model"
// import { Meta } from "@/app/cores/core-trieco/network/meta"
// import gisModel from "../../kernel/model/gis-model"
// import { Role } from "@/app/cores/core-trieco/enums/role"
// import { Button, Input } from "@/app/cores/core-trieco/UIKit"

export const WaterCompanyView = observer(() => {
    const navigate = useNavigate();
    const { waterCompany } = useAuth();

    const { init, company, plants, isEditing, setEditing, save,
        setName, setOperatorFirstName, setOperatorLastName, setOperatorPatronymic, setInn,
        setOgrn, setKpp, setLogin, setOperatorPhone, setOperatorEmail, setAddress,
        setMunicipality, showDelete, setShowDelete, deleteCompany } = waterCompanyModel;

    useEffect(() => {
        waterCompany && init(waterCompany)
    }, [])

    const handleEditClick = () => {
        setEditing(!isEditing);
    };
    const handleEditClickClose = () => {
        setEditing(false);
    };
    const handleSave = () => {
        save();
        setEditing(false);
    };

    const handleDelete = () => {
        setShowDelete(true);
    }

    // if (meta !== Meta.SUCCESS) return <></>

    return (
        <>
            <ModalDelete wrapperId="delete" show={showDelete} setShow={setShowDelete} onClickDelete={() => deleteCompany}
                text="Вы действительно хотите удалить этот водоканал?" />
            <div className="flex flex-wrap lg:flex-row items-stretch lg:items-start gap-6 px-4 lg:px-12 py-8 justify-between">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4">
                        {
                            // user?.roleId === Role.Ministry &&
                            <div className="bg-[#4A85F6] rounded-md w-10 h-10 flex items-center justify-center cursor-pointer" onClick={() => navigate("/admin/companies")}>
                                <Icon systemName="arrow-left" />
                            </div>
                        }
                        <span className="text-[#222B45] font-bold text-xl lg:text-3xl">{company.name}</span>
                    </div>
                    <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                        <div className="flex flex-row flex-wrap gap-5">
                            <Card
                                link="http://213.87.95.60:8755/BosKaibici"
                                title="АРМ - оператор"
                                description="Станция подключена к системе"
                                disabledDescription="Станция не подключена к системе"
                                icon=""
                            />
                            <Card
                                link={`stats/recycling`}
                                title="Статистика утилизации"
                                icon="stat-waste"
                            />
                        </div>
                        <div className="flex flex-row flex-wrap gap-5">
                            <Card
                                onClick={() => {
                                    if (!company.isTransporter) return;
                                    navigate(`/admin/company/${company.id}/stats/transportation`);
                                }}
                                disabled={!company.isTransporter}
                                title="Статистика транспортировки"
                                description="Водоканал подключен к ВИС"
                                disabledDescription="Водоканал не подключен к ВИС"
                                icon="stat-sewer"
                                disabledIcon="disabled-stat-sewer"
                            />
                            <Card
                                onClick={() => navigate(`/admin/company/${company.id}/stats/all`)}
                                title="Сводная статистика"
                                icon="statistic-up"
                            />
                        </div>

                    </div>
                    <div className="mt-8">
                        <DrainStations plants={plants} />
                    </div>
                </div>
                <div className="bg-white 2xl:max-w-[50%] md:max-w-[100%] w-full shadow-[0px_2px_20px_0px_rgba(0,0,0,0.05)] p-6 sm:p-2 md:p-11">
                    <div className="flex flex-row justify-between items-center">
                        <span className="font-bold text-[#222B45] text-lg md:text-xl truncate">{company.name}</span>
                        <div className="flex gap-4">
                            <Icon systemName="edit" width={32} height={32} className="cursor-pointer" onClick={handleEditClick} />
                            <Icon systemName="delete" width={32} height={32} className="cursor-pointer" onClick={handleDelete} />
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 text-sm md:text-base overflow-y-auto">
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="py-3 px-4 flex-1 bg-[#EFF4FA] border-b border-white 2xl:w-1/2 sm:w-full">
                                <span className="text-[#8F9BB3] font-bold truncate">Наименование параметра</span>
                            </div>
                            <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#8F9BB3] font-bold truncate">Информация</span>
                            </div>
                        </div>

                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Наименование юридического лица</span>
                            </div>
                            {isEditing ?
                                <InputContainer>
                                    <Input
                                        placeholder="Наименование компании"
                                        className="px-5 pt-4"
                                        value={company.name}
                                        onChange={setName}
                                        type="text"
                                    />
                                </InputContainer>
                                :
                                <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                    <span className="text-[#222B45]">{company.name}</span>
                                </div>
                            }
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Основной государственный регистрационный номер (ОГРН) (основной государственный   регистрационный номер индивидуального предпринимателя (ОГРНИП))</span>
                            </div>
                            {isEditing ?
                                <InputContainer>
                                    <Input
                                        placeholder="0000000000000"
                                        className="px-5 p-4"
                                        value={company.ogrn}
                                        onChange={setOgrn}
                                        type="text"
                                    />
                                </InputContainer>
                                :
                                <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                    <span className="text-[#222B45]">{company.ogrn}</span>
                                </div>
                            }

                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">ФИО руководителя</span>
                            </div>

                            {isEditing ?
                                <InputContainer classNames={{
                                    wrapper: "2xl:w-1/2 sm:w-full",
                                    children: "flex-col",
                                }}>
                                    <Input
                                        placeholder="Фамилия"
                                        className="px-5 py-4 w-full border-b"
                                        value={company.operator.lastName}
                                        onChange={setOperatorLastName}
                                        type="text"
                                    />
                                    <Input
                                        placeholder="Имя"
                                        className="px-5 py-4 w-full border-b"
                                        value={company.operator.firstName}
                                        onChange={setOperatorFirstName}
                                        type="text"
                                    />
                                    <Input
                                        placeholder="Отчество"
                                        className="px-5 py-4 w-full"
                                        value={company.operator.patronymic}
                                        onChange={setOperatorPatronymic}
                                        type="text"
                                    />
                                </InputContainer>
                                :
                                <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                    <span className="text-[#222B45]">{company.operator.lastName} {company.operator.firstName} {company.operator.patronymic}</span>
                                </div>
                            }

                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Адрес места нахождения органов управления регулируемой организации</span>
                            </div>
                            {isEditing ?
                                <InputContainer>
                                    <Input
                                        placeholder="адрес"
                                        className="px-5 p-4"
                                        value={company.address}
                                        onChange={setAddress}
                                        type="text"
                                    />
                                </InputContainer>
                                :
                                <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                    <span className="text-[#222B45]">{company.address}</span>
                                </div>
                            }
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Горячая линия</span>
                            </div>
                            {isEditing ?
                                <InputContainer>
                                    <Input
                                        placeholder="адрес"
                                        className="px-5 p-4"
                                        value={company.operator.phone}
                                        onChange={setOperatorPhone}
                                        type="text"
                                    />
                                </InputContainer>
                                :
                                <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                    <a href={`mailto:{${company.operator.phone}}`} className="text-[#4a85f6]">{company.operator.phone}</a>
                                </div>
                            }
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Аварийно-диспетчерская служба</span>
                            </div>
                            {isEditing ?
                                <InputContainer>
                                    <Input
                                        placeholder="адрес"
                                        className="px-5 p-4"
                                        value={company.operator.phone}
                                        onChange={setOperatorPhone}
                                        type="text"
                                    />
                                </InputContainer>
                                :
                                <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                    <a href={`mailto:{${company.operator.phone}}`} className="text-[#4a85f6]">{company.operator.phone}</a>
                                </div>
                            }
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Официальный сайт в сети «Интернет»</span>
                            </div>
                            {isEditing ?
                                <InputContainer>
                                    <Input
                                        placeholder="адрес"
                                        className="px-5 p-4"
                                        value={company.operator.email}
                                        onChange={setOperatorEmail}
                                        type="text"
                                    />
                                </InputContainer>
                                :
                                <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                    <a href={`mailto:{${company.operator.email}}`} className="text-[#4a85f6]"> {company.operator.email}/</a>
                                </div>
                            }
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Адрес  электронной почты</span>
                            </div>
                            <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                <a href={`mailto:{${company.operator.email}}`} className="text-[#4a85f6]">{company.operator.email}</a>
                            </div>
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Режим работы диспетчерских служб</span>
                            </div>
                            <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45]">с 00:00 до 23:59</span>
                            </div>
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Режим работы абонентских отделов</span>
                            </div>
                            <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45]">с 07:30 до 16:30</span>
                            </div>
                        </div>
                        <div className="flex 2xl:flex-row sm:flex-col border-b">
                            <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45] font-semibold">Режим работы регулируемой организации</span>
                            </div>
                            <div className="py-4 px-5 2xl:w-1/2 sm:w-full">
                                <span className="text-[#222B45]">с 00:00 до 23:59</span>
                            </div>
                        </div>

                        {isEditing &&
                            <div className="flex mt-5 gap-2">
                                <Button class="bg-[#4a85f6] text-center justify-center  font-semibold leading-none py-3 px-6 w-full text-white" onClick={handleSave}>Сохранить</Button>
                                <Button class="bg-[#aaaaaa] text-center justify-center  font-semibold leading-none py-3 px-6 w-full text-white" onClick={handleEditClickClose}>Отмена</Button>
                            </div>
                        }
                    </div >
                </div >
            </div >
        </>

    );
});
