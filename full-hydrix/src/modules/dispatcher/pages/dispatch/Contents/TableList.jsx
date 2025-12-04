import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icons from "@components/ui-kits/Icons";
import ComboBox from "@components/ui-kits/ComboBox";

export default function TableList({ className }) {


    const [value, setValue] = useState(9.2);

    useEffect(() => {
        const interval = setInterval(() => {
            let randomValue = (Math.random() * 5 + 7).toFixed(1);
            setValue(randomValue);
        }, 3000);

        return () => clearInterval(interval);
    }, []);



    const tableInfors = [
        {

        }
    ];


    return (
        <>
            <div className="table__top">
                <div className="table__search search ">
                    <div className="search__body">
                        <input type="text" className="search__input" placeholder="Поиск по наименованию" />
                        <button className="search__icon _icon-search">
                            <Icons name="search" />
                        </button>
                    </div>
                </div>

                <div className="table__left">
                    <ComboBox className="table__combobox" list={["Все", "Онлайн", "Оффлайн"]} />
                    <ComboBox className="table__combobox" list={["Функционирует", "Авария", "Плановое обслуживание"]} />

                    <div className="table__export export-button">Экспортировать</div>
                </div>
            </div>


            <div className={`${className} table`}>

                <div className="table__header">
                    <div className="table__column _left">Объект эксплуатации</div>
                    <div className="table__column">Адрес</div>
                    <div className="table__column">Эксплуатирующая организация</div>
                    <div className="table__column">Статус подключения</div>
                    <div className="table__column">Проектная производительность, м3/сут</div>
                    <div className="table__column">Среднесуточная производительность, м3/сут</div>
                    <div className="table__column">Часовая производительность, м3/ч</div>
                </div>
                <div className="table__row">
                    <Link to="passport" className="table__column _left">
                        Очистные сооружения в с. Шапши
                    </Link>
                    <div className="table__column">
                        с. Шапши, Высокогорский район, РТ
                    </div>
                    <div className="table__column">
                        АО "ВКС"
                    </div>
                    <div className="table__column">
                        Подключен
                    </div>
                    <div className="table__column">
                        200
                    </div>
                    <div className="table__column">
                        156
                    </div>
                    <div className={`table__column _clr ${(value < 9.5 || value > 11.0) ? '_red' : ''}`}>
                        {value}
                    </div>
                </div>
                <div className="table__row">
                    <Link to="passport" className="table__column _left">
                        Очистные сооружения в с. Большие Кайбицы
                    </Link>
                    <div className="table__column">
                        с. Большие Кайбицы, Кайбицкий район, РТ
                    </div>
                    <div className="table__column">
                        МУП "Кайбицкое ЖКХ"
                    </div>
                    <div className="table__column">
                        Не подключен
                    </div>
                    <div className="table__column">
                        200
                    </div>
                    <div className="table__column">
                        0
                    </div>
                    <div className="table__column">
                        0
                    </div>
                </div>
            </div>
        </>
    )
}