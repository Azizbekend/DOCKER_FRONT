import { Icon } from "@/shared/ui/icon";
import image from "../../assets/info-com-1.jpg";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/entities/hardware/model";
import { Button } from "@/shared/ui/button";
import { hardwareListModel } from "../../../equipment/model/hardware-list-model";
import { ModalServiceCreate } from "../../../equipment/components/modal-service-create";


export const EquipmentPassport = observer(() => {
    const { model, сharacteristic } = hardwareModel
    const { modalService, closeModal } = hardwareListModel

    return (
        <div className="bg-white rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] p-[45px_30px_50px_40px]">

            <ModalServiceCreate isOpen={modalService} setShow={closeModal} />


            <div className="absolute top-5 right-5 flex gap-3">
                <Link to={"/dispatcher/orders/create"} className="flex items-center gap-2 py-2 px-3 bg-[var(--clr-accent)] text-white min-w-max rounded-lg hover:opacity-50 duration-300">
                    <Icon systemName="file-plus" />
                    <span>Создать заявку</span>
                </Link>

                <Button class=" hover:opacity-50 w-full px-5 text-center bg-[var(--clr-border-gray)]" onClick={() => hardwareListModel.setModalService(true, model.id)}>
                    <span className="w-full text-white">+ сервис</span>
                </Button>
            </div>


            <div className="mb-[32px] flex items-center gap-[28px]">
                <Link to={"/dispatcher/equipment"} className='bg-[var(--clr-accent)] rounded px-3 py-2 hover:opacity-50 cursor-pointer duration-300'>
                    <Icon systemName="arrow-left" />
                </Link>
                <span className="font-bold text-[34px] mb-2">Паспорт Оборудования</span>
            </div>

            <div className="flex gap-5">
                <div className="w-[350px]">

                    <div className="info-comp__image">
                        <img src={"https://triapi.ru/research/api/FileStorage/images/download?id=" + model?.fileId} alt="Info" />
                    </div>
                    <div className="flex items-center gap-1 text-[12px] justify-center mb-10 mt-3">
                        <span>Статус подключения к ИАС</span>
                        <span className="px-2 py-1 text-white bg-red-500 rounded-lg">Не подключено</span>
                    </div>


                    <div className="info-comp__section">
                        <div className="info-comp__subtitle font-bold">Документация</div>

                        <div className="info-comp__doc mb-0 font-bold">
                            <Icon systemName="docs" />
                            <span>Паспорт</span>
                        </div>
                        <div className="info-comp__doc mb-0 font-bold">
                            <Icon systemName="docs" />
                            <span>Инструкция</span>
                        </div>
                        <div className="info-comp__doc mb-0 font-bold">
                            <Icon systemName="docs" />
                            <span>Гарантийный талон</span>
                        </div>
                    </div>

                    <div className="info-comp__section">
                        <div className="info-comp__subtitle font-bold">Журнал событий</div>

                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>18.10.2025 12.34 - </span> <span className='info-comp__act-status _red'>отключение</span>
                        </div>
                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>18.10.2025 12.36 - </span> <span className='info-comp__act-status _green'>запуск</span>
                        </div>
                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>20.12.2025 12.10 - </span> <span className='info-comp__act-status _orange'>ТО1</span>
                        </div>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div className="info-comp__name font-bold text-left border-b pb-8">
                        {model.name}
                    </div>

                    <div className="info-comp__content">
                        <div className="info-comp__section">
                            <div className="info-comp__subtitle font-bold">Общая информация</div>

                            <div className="grid grid-cols-[250px_1fr] ">
                                <div className="info-comp__title font-bold">Модель</div>
                                <div className="info-comp__description">{model.position}</div>
                            </div>

                            <div className="grid grid-cols-[250px_1fr] ">
                                <div className="info-comp__title font-bold">Поставщик</div>
                                <div className="info-comp__description">{model.supplierName}</div>
                            </div>
                            <div className="grid grid-cols-[250px_1fr] ">
                                <div className="info-comp__title font-bold">Производитель</div>
                                <div className="info-comp__description">{model.developerName}</div>
                            </div>

                            <div className="info-comp__subtitle font-bold mt-8">Характеристики</div>
                            {сharacteristic.map((item, key) => {
                                return (
                                    <div className="grid grid-cols-[250px_1fr]" key={key}>
                                        <div className="info-comp__title font-bold">{item.name}</div>
                                        <div className="info-comp__description">{item.value}</div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})