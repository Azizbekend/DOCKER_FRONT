import { Icon } from "@/shared/ui/GIS/icon"
import { Card } from "./components/card"
import { useNavigate, useParams } from "react-router-dom"
import { DrainStations } from "./components/drain-stations/drain-stations"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import waterCompanyModel from "./model/water-company-model"
import { Meta } from "@/app/cores/core-gis/network/meta"
import { Button, Input } from "@/shared/ui/GIS/"
import { useAuth } from "@/entities/user/context"
import { Role } from "@/entities/user/role"

export const WaterCompanyView = observer(() => {
    const navigate = useNavigate();
    const { companyId } = useParams();
    const { user } = useAuth();
    const id = Number(companyId);
    const { init, meta, company, plants, editableModel, isEditing, setEditing, save } = waterCompanyModel;

    const handleChange = (inputValue: string, type: string): any => {
        let formattedValue: string = '';

        switch (type) {
            case "time":
                const value = inputValue.replace(/[^0-9]/g, "").slice(0, 8);
                if (value.length > 0) {
                    formattedValue = "с ";
                    formattedValue += value.slice(0, 2);
                }
                if (value.length > 2) {
                    formattedValue += `:${value.slice(2, 4)}`;
                }
                if (value.length > 4) {
                    formattedValue += " до ";
                    formattedValue += value.slice(4, 6);
                }
                if (value.length > 6) {
                    formattedValue += `:${value.slice(6, 8)}`;
                }
                return formattedValue;

            case "tel":
                const valueTel = inputValue.replace(/[^0-9]/g, "").slice(0, 11);
                if (valueTel.length > 0) {
                    formattedValue = "+7 (";
                    formattedValue += valueTel.slice(1, 4);
                }
                if (valueTel.length > 4) {
                    formattedValue += ") ";
                    formattedValue += valueTel.slice(4, 7);
                }
                if (valueTel.length > 7) {
                    formattedValue += "-";
                    formattedValue += valueTel.slice(7, 9);
                }
                if (valueTel.length > 9) {
                    formattedValue += "-";
                    formattedValue += valueTel.slice(9, 11);
                }
                return formattedValue;

            case "text":
                formattedValue = inputValue;
                return formattedValue;

            case "ogrn":
                return formattedValue = inputValue.replace(/[^0-9]/g, "").slice(0, 13);
        }
    };

    useEffect(() => {
        init(id)
    }, [])

    const handleEditClick = () => {
        setEditing(true);
    };
    const handleEditClickClose = () => {
        setEditing(false);
    };
    const handleSave = () => {
        save();
        setEditing(false);
    };

    if (meta !== Meta.SUCCESS) return <></>

    return (
        <div className="flex flex-wrap lg:flex-row items-stretch lg:items-start gap-6 px-4 lg:px-12 py-8 justify-between">
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4">
                    {
                        user?.roleId === Role.Ministry &&
                        <div className="bg-[#4A85F6] rounded-md w-10 h-10 flex items-center justify-center cursor-pointer" onClick={() => navigate("/admin/companies")}>
                            <Icon systemName="arrow-left" />
                        </div>
                    }
                    <span className="text-[#222B45] font-bold text-xl lg:text-3xl">{company.name}</span>
                </div>
                <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                    <div className="flex flex-row flex-wrap gap-5">
                        <Card
                            onClick={() => {
                                if (user?.id === 399 || (user?.id === 48 && id == 55)) {
                                    window.open('http://213.87.95.60:8755/BosKaibici', '_blank');
                                }
                            }}
                            disabled={!(user?.id === 399 || (user?.id === 48 && id == 55))}

                            title="АРМ - оператор"
                            description="Станция подключена к системе"
                            disabledDescription="Станция не подключена к системе"
                            icon=""
                        />
                        <Card
                            onClick={() => {
                                navigate(`/gis/company/${id}/stats/recycling`);
                            }}
                            title="Статистика утилизации"
                            icon="stat-waste"
                        />
                    </div>
                    <div className="flex flex-row flex-wrap gap-5">
                        <Card
                            onClick={() => {
                                if (!company.isTransporter) return;
                                navigate(`/admin/company/${id}/stats/transportation`);
                            }}
                            disabled={!company.isTransporter}
                            title="Статистика транспортировки"
                            description="Водоканал подключен к ВИС"
                            disabledDescription="Водоканал не подключен к ВИС"
                            icon="stat-sewer"
                            disabledIcon="disabled-stat-sewer"
                        />
                        <Card
                            onClick={() => navigate(`/gis/company/${id}/stats/all`)}
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
                        <Icon systemName="delete" width={32} height={32} className="cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col mt-4 text-sm md:text-base overflow-y-auto">
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="py-3 px-4 flex-1 bg-[#EFF4FA] border-b border-white 2xl:w-1/2 sm:w-full">
                            <span className="text-[#8F9BB3] font-bold truncate">Наименование параметра</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#8F9BB3] font-bold truncate">Информация</span>
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Наименование юридического лица</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            {isEditing ? (
                                <Input class="text-[#222B45]" placeholder="Наименование компании" value={editableModel.name} onChange={(value) => editableModel.name = handleChange(value, 'text')} />
                            ) : (
                                <span className="text-[#222B45]">{company.name}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Основной государственный регистрационный номер (ОГРН) (основной государственный   регистрационный номер индивидуального предпринимателя (ОГРНИП))</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            {isEditing ? (
                                <Input class="text-[#222B45]" placeholder="0000000000000" value={editableModel.ogrn} onChange={(value) => editableModel.ogrn = handleChange(value, 'ogrn')} />
                            ) : (
                                <span className="text-[#222B45]">{company.ogrn}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">ФИО руководителя</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            {isEditing ? (
                                <>
                                    <Input class="text-[#222B45]" placeholder="Фамилия" value={editableModel.operator.lastName} onChange={(value) => editableModel.operator.lastName = handleChange(value, 'text')} />
                                    <Input class="text-[#222B45]" placeholder="Имя" value={editableModel.operator.firstName} onChange={(value) => editableModel.operator.firstName = handleChange(value, 'text')} />
                                    <Input class="text-[#222B45]" placeholder="Отчество" value={editableModel.operator.patronymic} onChange={(value) => editableModel.operator.patronymic = handleChange(value, 'text')} />
                                </>
                            ) : (
                                <span className="text-[#222B45]">{company.operator.lastName} {company.operator.firstName} {company.operator.patronymic}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Адрес места нахождения органов управления регулируемой организации</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            {isEditing ? (
                                <Input class="text-[#222B45]" placeholder="Адрес" value={editableModel.address} onChange={(value) => editableModel.address = handleChange(value, 'text')} />
                            ) : (
                                <span className="text-[#222B45]">{company.address}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Горячая линия</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            {isEditing ? (
                                <Input class="text-[#222B45]" placeholder="+7 (000)-000-00-00" value={editableModel.operator.phoneNumber} onChange={(value) => editableModel.operator.phoneNumber = handleChange(value, 'tel')} />
                            ) : (
                                <a href={`mailto:{${company.operator.phoneNumber}}`} className="text-[#4a85f6]">{company.operator.phoneNumber}</a>
                            )}
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Аварийно-диспетчерская служба</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            {isEditing ? (
                                <Input class="text-[#222B45]" placeholder="+7 (000)-000-00-00" value={editableModel.operator.phoneNumber} onChange={(value) => editableModel.operator.phoneNumber = handleChange(value, 'tel')} />
                            ) : (
                                <a href={`mailto:{${company.operator.phoneNumber}}`} className="text-[#4a85f6]">{company.operator.phoneNumber}</a>
                            )}
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Официальный сайт в сети «Интернет»</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <a href={`mailto:{${company.operator.email}}`} className="text-[#4a85f6]"> {company.operator.email}/</a>
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Адрес  электронной почты</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            {isEditing ? (
                                <Input class="text-[#222B45]" placeholder="Почта" maxValue={255} value={editableModel.operator.email} onChange={(value) => { editableModel.operator.email = handleChange(value, 'text') }} />
                            ) : (
                                <a href={`mailto:{${company.operator.email}}`} className="text-[#4a85f6]">{company.operator.email}</a>
                            )}
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Режим работы диспетчерских служб</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45]">с 00:00 до 23:59</span>
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Режим работы абонентских отделов</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45]">с 07:30 до 16:30</span>
                        </div>
                    </div>
                    <div className="flex 2xl:flex-row sm:flex-col">
                        <div className="bg-[#EFF4FA] py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45] font-semibold">Режим работы регулируемой организации</span>
                        </div>
                        <div className="py-4 px-5 2xl:w-1/2 sm:w-full border-b">
                            <span className="text-[#222B45]">с 00:00 до 23:59</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center mt-5 gap-2">
                        {isEditing ? (
                            <>
                                <Button class="bg-[#4a85f6] text-center justify-center  font-semibold leading-none py-3 px-6 w-full" onClick={handleSave}>Сохранить</Button>
                                <Button class="bg-[#aaaaaa] text-center justify-center  font-semibold leading-none py-3 px-6 w-full" onClick={handleEditClickClose}>Отмена</Button>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
});
