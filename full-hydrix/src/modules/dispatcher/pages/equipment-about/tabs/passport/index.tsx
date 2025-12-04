import { Icon } from "@/shared/ui/icon";
import image from "../../assets/info-com-1.jpg";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/entities/hardware/model";


export const EquipmentPassport = observer(() => {
    const { model, сharacteristic } = hardwareModel

    return (
        <div className="bg-white rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] p-[45px_30px_50px_40px]">
            <Link to={"/dispatcher/orders/create"} className="flex items-center gap-2 py-2 px-3 bg-[var(--clr-accent)] text-white w-fit rounded-lg hover:opacity-50 duration-300 absolute top-5 right-5">
                <Icon systemName="file-plus" />
                <span>Создать заявку</span>
            </Link>


            <div className="requestregistry-dispatch__title font-semibold">
                Паспорт Оборудования
            </div>

            <div className="flex gap-5">
                <div className="w-[350px]">
                    
                    <div className="info-comp__image">
                        <img src={"http://localhost:5011/uploads/" + model?.photoName} alt="Info" />
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
                            <div className="info-comp__subtitle font-bold">Характеристики</div>

                            <div className="grid grid-cols-[250px_1fr] ">
                                <div className="info-comp__title font-bold">Модель</div>
                                <div className="info-comp__description">{model.position}</div>
                            </div>

                            <div className="grid grid-cols-[250px_1fr] ">
                                <div className="info-comp__title font-bold">Производительность</div>
                                <div className="info-comp__description">{model.developerName}</div>
                            </div>

                            <div className="grid grid-cols-[250px_1fr] ">
                                <div className="info-comp__title font-bold">Поставщик</div>
                                <div className="info-comp__description">{model.supplierName}</div>
                            </div>
                            <div className="grid grid-cols-[250px_1fr] ">
                                <div className="info-comp__title font-bold">Производитель</div>
                                <div className="info-comp__description">{model.developerName}</div>
                            </div>

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