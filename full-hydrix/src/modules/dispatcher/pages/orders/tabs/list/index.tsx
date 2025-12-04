import { statistics } from "../../data/data"
import { Icon } from "@/shared/ui/icon"
import { TtemsRequestRegistryType } from "../../type/type";

export const RequestRegistryList = () => {

    const itemsRequestRegistry: TtemsRequestRegistryType[] = [
        {
            name: "Насос усреднителя №1",
            id: "REQ-001",
            texts: [
                <p>Замена подшипников и уплотнений </p>,
                <p> Создано: 2025 - 10-01 Плановая дата: 2025 - 10 - 15 Исполнитель: Иванов И.И.Стоимость: 25 000 ₽</p>,
                <p> Запчасти: <b>Подшипник 6208, Уплотнение торцевое </b></p >
            ],
            status: [
                {
                    name: "В работе",
                    color: "_blue",
                },
                {
                    name: "Средний",
                    color: "_yellow",
                },
            ],

            time: "4/8 ч",
            progress: "50%",
        },
        {
            name: "Насос усреднителя №2",
            id: "REQ-003",
            texts: [
                <p>Плановая калибровка датчика </p>,
                <p> Создано: 2025 - 10-01 Плановая дата: 2025 - 10-01 Исполнитель: Сидоров С.С.Стоимость: 3 000 ₽</p>,
            ],
            status: [
                {
                    name: "Завершено",
                    color: "_green-back",
                },
                {
                    name: "Низкий",
                    color: "_green",
                },
            ],

            time: "2/2 ч",
            progress: "100%",
        },
        {
            name: "Насос усреднителя №1",
            id: "REQ-005",
            texts: [
                <p>Замена подшипников и уплотнений </p>,
                <p> Создано: 2025 - 10-01 Плановая дата: 2025 - 10 - 15 Исполнитель: Иванов И.И.Стоимость: 25 000 ₽</p>,
                <p> Запчасти: <b>Подшипник 6208, Уплотнение торцевое </b></p>
            ],
            status: [
                {
                    name: "В работе",
                    color: "_blue",
                },
                {
                    name: "Средний",
                    color: "_yellow",
                },
            ],

            time: "4/8 ч",
            progress: "50%",
        },
        {
            name: "Мешалка денитрификатора №1",
            id: "REQ-007",
            texts: [
                <p>Плановая калибровка датчика </p>,
                <p p > Создано: 2025 - 10-01 Плановая дата: 2025 - 10-01 Исполнитель: Сидоров С.С.Стоимость: 3 000 ₽</p>,
            ],
            status: [
                {
                    name: "Завершено",
                    color: "_green-back",
                },
                {
                    name: "Низкий",
                    color: "_green",
                },
            ],

            time: "2/2 ч",
            progress: "100%",
        },
        {
            name: "Песколовка №1",
            id: "REQ-009",
            texts: [
                <p>Замена подшипников и уплотнений </p>,
                <p> Создано: 2025 - 10-01 Плановая дата: 2025 - 10 - 15 Исполнитель: Иванов И.И.Стоимость: 25 000 ₽</p>,
                <p> Запчасти: <b>Подшипник 6208, Уплотнение торцевое </b></p>
            ],
            status: [
                {
                    name: "В работе",
                    color: "_blue",
                },
                {
                    name: "Средний",
                    color: "_yellow",
                },
            ],

            time: "4/8 ч",
            progress: "50%",
        },
        {
            name: "Песколовка №2",
            id: "REQ-011",
            texts: [
                <p>Плановая калибровка датчика </p>,
                <p> Создано: 2025 - 10-01 Плановая дата: 2025 - 10-01 Исполнитель: Сидоров С.С.Стоимость: 3 000 ₽</p>,
            ],
            status: [
                {
                    name: "Завершено",
                    color: "_green-back",
                },
                {
                    name: "Низкий",
                    color: "_green",
                },
            ],

            time: "2/2 ч",
            progress: "100%",
        },
    ]

    return (
        <div className="requestregistry-dispatch__container bg-white rounded-[20px] p-[45px_30px_50px_40px] mb-5 relative">
            <div className="font-semibold text-[34px] mb-[32px]">
                Реестр заявок
            </div>
            <div className="requestregistry-dispatch__statistics statistics-requestregistry">
                {statistics.map((item, index) => {
                    return (
                        <div key={index} className={`statistics-requestregistry__item ${item.color}`}>
                            <div className="statistics-requestregistry__name">{item.name}</div>
                            <div className="statistics-requestregistry__value">{item.value}</div>
                        </div>
                    )
                })}
            </div>

            <div className="requestregistry-dispatch__subtitle font-semibold">Список заявок</div>
            <div className="requestregistry-dispatch__items">

                {itemsRequestRegistry.map((item, index) => {
                    return (
                        <div key={index} className="requestregistry-dispatch__item item-requestregistry">
                            <div className="item-requestregistry__left">
                                <div className="item-requestregistry__name">
                                    <span className="font-semibold">{item.name}</span>

                                    <div className="item-requestregistry__id">
                                        {item.id}
                                    </div>
                                </div>

                                <div className="item-requestregistry__information font-semibold">
                                    {item.texts.map((text, key) => {
                                        return <div className="item-requestregistry__text" key={key}>{text}</div>
                                    })}
                                </div>
                            </div>
                            <div className="item-requestregistry__right">
                                <div className="item-requestregistry__top">
                                    <div className="item-requestregistry__edit">
                                        <Icon systemName="edit" />
                                    </div>

                                    {item.status.map((stat, key) => {
                                        return (
                                            <div key={key} className={`item-requestregistry__status ${stat.color}`}>{stat.name}</div>
                                        )
                                    })}
                                </div>
                                <div className="item-requestregistry__time">
                                    <div className="item-requestregistry__time-hour">{item.time}</div>
                                    <div className="item-requestregistry__time-progress">
                                        <div className="item-requestregistry__time-progress__line" style={{ width: item.progress }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}