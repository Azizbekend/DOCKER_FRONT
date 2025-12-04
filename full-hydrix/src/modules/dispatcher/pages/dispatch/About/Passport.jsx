import imagePassport from "@imgs/passport.jpg"
import imagePassport2 from "@imgs/IMG-20250917-WA0013.jpg"
import { Value } from "sass"
import Icons from "../../../components/ui-kits/Icons";

export default function Passport() {



    const itemsInfo1 = [
        {
            name: "Адрес",
            Value: "с. Шапши, Высокогорский район, Республика Татарстан",
            coord: true,
        },
        {
            name: "Эксплуатирующая организация",
            Value: 'АО "ВКС"',
        },
        {
            name: "Ген.подрядчик",
            Value: 'АО "УКС"',
        },
        {
            name: "Закачик",
            Value: 'ГБУ "СЭТИК"',
        },
    ];


    const itemsInfo2 = [
        {
            name: "Проектная производительность",
            Value: "200 м3/сут",
        },
        {
            name: "Среднесуточная  производительность",
            Value: "158 м3/сут",
        },
        {
            name: "Часовая  производительность",
            Value: "10,5 м3/ч",
        },
        {
            name: "Расход электроэнергии",
            Value: "74 кВт*ч",
        },
        {
            name: "Водоснабжение",
            Value: "20 м3/сут",
        },
    ]


    const infoContacts = [
        {
            type: 'Эксплуатирующая организация АО "ВКС"',
            name: "Иванов Иван",
            email: "mppjkx1@mail.ru",
            tell: "+7 (84365) 3-28-72",
        },
        {
            type: 'Ген.подрядчик АО "УКС"',
            name: "Петров Иван",
            email: "uksr.kzn@tatar.ru",
            tell: "+7 843 223-19-19",
        },
        {
            type: 'Заказчик ГБУ "СЭТИК"',
            name: "Сидоров Андрей",
            email: "fondgaz@yandex.ru",
            tell: "+7 843 221-51-89",
        },
    ]



    return (
        <>
            <div className="informations-dispatch__passport passport-dispatch">
                <div className="passport-dispatch__container">
                    <div className="passport-dispatch__left">
                        <div className="passport-dispatch__information">
                            <div className="passport-dispatch__title">Паспорт объекта</div>

                            <div className="passport-dispatch__images">
                                <div className="passport-dispatch__image">
                                    <img src={imagePassport} alt="" />
                                </div>
                                <div className="passport-dispatch__image">
                                    <img src={imagePassport2} alt="" />
                                </div>
                            </div>
                            <div className="passport-dispatch__name">
                                Очистные сооружения в с. Шапши,       Высокогорского муниципального района
                            </div>


                            <div className="passport-dispatch__information">

                                {itemsInfo1.map((item, index) => {
                                    return (
                                        <div key={index} className="passport-dispatch__item item-passport">
                                            <div className="item-passport__name">
                                                {item.name}
                                            </div>
                                            <div className="item-passport__value">
                                                {item.Value}
                                                {item.coord &&
                                                    <>
                                                        <br />
                                                        <span className="item-passport__value-coord">
                                                            55.775450, 48.762559
                                                            <div className="item-passport__value-coord__icon">
                                                                <Icons name="copy" />
                                                            </div>
                                                        </span>
                                                    </>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="passport-dispatch__line"></div>

                            <div className="passport-dispatch__information">

                                <div className="passport-dispatch__item item-passport__status">
                                    <div className="item-passport__name">
                                        Статус подключения к ИАС
                                    </div>

                                    <div className="item-passport__status-value">
                                        Подключено
                                    </div>
                                </div>


                                {itemsInfo2.map((item, index) => {
                                    return (
                                        <div key={index} className="passport-dispatch__item item-passport">
                                            <div className="item-passport__name">
                                                {item.name}
                                            </div>
                                            <div className="item-passport__value">
                                                {item.Value}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="passport-dispatch__map">
                            <span>Показать на карте</span>
                            <div className="passport-dispatch__map-icon">
                                <Icons name="arrow-blue" />
                            </div>
                        </div>

                    </div>
                    <div className="passport-dispatch__right passport-contacts">
                        <div className="passport-contacts__title">Контактные данные представителей</div>
                        {infoContacts.map((item, index) => {
                            return (
                                <>

                                    <div key={index} className="passport-contacts__item">
                                        <div className="passport-contacts__subtitle">{item.type}</div>
                                        <div className="passport-contacts__name">{item.name}</div>
                                        <a href={`mailto:${item.name}`} className="passport-contacts__email">{item.email}</a>
                                        <a href={`tell:${item.email}`} className="passport-contacts__tell">{item.tell}</a>
                                    </div>

                                    {index < infoContacts.length - 1 && <div className="passport-contacts__line"></div>}
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}