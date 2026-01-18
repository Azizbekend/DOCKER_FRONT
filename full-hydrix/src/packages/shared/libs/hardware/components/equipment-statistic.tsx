import { useState } from "react";
import "./hardware-statistic.css";

export default function HardwareStatistics() {


    const [btn, setBtn] = useState<"content-events" | "content-summary" | "content-alarms" | "content-alarm-stats">("content-events")



    return (
        <div className="h-full !flex-col">
            <div className="tabs">
                <button className={btn == "content-events" ? "_active" : ""} onClick={() => setBtn("content-events")}>Лог событий</button>
                <button className={btn == "content-summary" ? "_active" : ""} onClick={() => setBtn("content-summary")}>Сводка работы</button>
                <button className={btn == "content-alarms" ? "_active" : ""} onClick={() => setBtn("content-alarms")}>Аварии</button>
                <button className={btn == "content-alarm-stats" ? "_active" : ""} onClick={() => setBtn("content-alarm-stats")}>Статистика аварий</button>
            </div>

            <div className={"tab-content shadow-sm bg-white px-4 py-8 rounded-tr-lg rounded-bl-lg rounded-br-lg h-[calc(100%-41px)] " + (btn == "content-events" ? "!block" : "")} id="content-events">
                <h3>Лог событий</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Время события</th>
                            <th>Тип события</th>
                            <th>Инициатор</th>
                            <th>Источник</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025-12-16 14:32:17</td>
                            <td>Включение</td>
                            <td>Автоматика</td>
                            <td>PLC-01</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={"tab-content shadow-sm bg-white px-4 py-8 rounded-tr-lg rounded-bl-lg rounded-br-lg h-[calc(100%-41px)] " + (btn == "content-summary" ? "!block" : "")} id="content-summary">
                <h3>Сводная статистика</h3>
                <div className="kpi-grid">
                    <div className="kpi-card">Включений<br /><b>8</b></div>
                    <div className="kpi-card">Выключений<br /><b>8</b></div>
                    <div className="kpi-card">Средняя работа<br /><b>2 ч 45 мин</b></div>
                    <div className="kpi-card">Время в работе<br /><b>91.7%</b></div>
                </div>
            </div>

            <div className={"tab-content shadow-sm bg-white px-4 py-8 rounded-tr-lg rounded-bl-lg rounded-br-lg h-[calc(100%-41px)] " + (btn == "content-alarms" ? "!block" : "")} id="content-alarms">
                <h3>Аварии</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Начало</th>
                            <th>Окончание</th>
                            <th>Длительность</th>
                            <th>Причина</th>
                            <th>Источник</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025-12-16 10:15:03</td>
                            <td>2025-12-16 10:28:15</td>
                            <td>13 мин</td>
                            <td>Перегрев двигателя</td>
                            <td>Датчик T1</td>
                            <td className="status-ok">Устранено</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={"tab-content shadow-sm bg-white px-4 py-8 rounded-tr-lg rounded-bl-lg rounded-br-lg h-[calc(100%-41px)] " + (btn == "content-alarm-stats" ? "!block" : "")} id="content-alarm-stats">
                <h3>Статистика аварий</h3>
                <div className="kpi-grid">
                    <div className="kpi-card">Аварий<br /><b>5</b></div>
                    <div className="kpi-card">Средняя длительность<br /><b>18 мин</b></div>
                    <div className="kpi-card">MTBF<br /><b>240 ч</b></div>
                    <div className="kpi-card">Частая причина<br /><b>Перегрев</b></div>
                    <div className="kpi-card">Макс. авария<br /><b>42 мин</b></div>
                </div>
            </div>
        </div>
    );
}
