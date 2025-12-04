import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import imagePassport from "../../assets/passport.jpg"
import arrowBlue from "../../assets/arrow-blue.svg"
import copyIcon from "../../assets/copy.svg"
import { Link } from 'react-router-dom';

export const PassportInformation = observer(() => {


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



    const [copied, setCopied] = useState(false);

    const handleCopyCoordinates = async () => {
        const coordinates = "55.775450, 48.762559";

        try {
            await navigator.clipboard.writeText(coordinates);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Ошибка при копировании: ', err);
        }
    };





    return (
        <>
            <div className="informations-dispatch__passport passport-dispatch">
                <div className="passport-dispatch__container">
                    <div className="passport-dispatch__left rounded-xl">

                        <div className='text-[#222B45] text-[34px] leading-[24px] font-bold mb-8'>Паспорт объекта</div>

                        <div className="flex gap-[40px]">
                            <div className="passport-dispatch__information">
                                <div className="passport-dispatch__title">Паспорт объекта</div>

                                <div className="passport-dispatch__image">
                                    <img src={imagePassport} alt="" />
                                </div>

                                <div className="passport-dispatch__information">

                                    <div className="item-passport__status">
                                        <div className="item-passport__name">
                                            Статус подключения к ИАС
                                        </div>

                                        <div className="item-passport__status-value">
                                            Подключено
                                        </div>
                                    </div>


                                    {itemsInfo2.map((item, index) => {
                                        return (
                                            <div key={index} className="grid grid-cols-[70%_28%] gap-[2%]">
                                                <div className="text-[14px] font-semibold">
                                                    {item.name}
                                                </div>
                                                <div className="text-[14px]">
                                                    {item.Value}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex-1 max-w-[700px]">
                                <div className="text-[17px] font-semibold">
                                    Очистные сооружения в с. Шапши, Высокогорского муниципального района
                                </div>
                                <div className="passport-dispatch__line"></div>
                                <div className="passport-dispatch__information">

                                    {itemsInfo1.map((item, index) => {
                                        return (
                                            <div key={index} className="passport-dispatch__item item-passport">
                                                <div className="text-[14px] font-semibold">
                                                    {item.name}
                                                </div>
                                                <div className="text-[14px] relative">
                                                    {item.Value}
                                                    {item.coord &&
                                                        <>
                                                            <br />
                                                            <span className={`item-passport__value-coord ${copied && "text-[var(--clr-accent)]"}`}>
                                                                55.775450, 48.762559
                                                                <div className="absolute left-[105%] top-[0] w-[20px] h-[20px]">

                                                                    <div className="passport-dispatch__map-icon" onClick={handleCopyCoordinates}>
                                                                        <img draggable="false"
                                                                            src={copyIcon}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="text-[var(--clr-accent)] mt-[60px] flex flex-col items-end">
                            <Link to="/gis" className="mb-3 flex items-center gap-3 underline cursor-pointer hover:opacity-50 duration-300 w-fit">
                                <span>Перейти в Управление ЖБО</span>
                                <div className="mt-2">
                                    <img draggable="false"
                                        src={arrowBlue}
                                        alt=""
                                    />
                                </div>
                            </Link>
                            <Link to="/dispatcher" className=" flex items-center gap-3 underline cursor-pointer hover:opacity-50 duration-300 w-fit">
                                <span>Перейти в Диспетчерскую</span>
                                <div className="mt-2">
                                    <img draggable="false"
                                        src={arrowBlue}
                                        alt=""
                                    />
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className="passport-dispatch__right rounded-xl passport-contacts">
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
    );
});