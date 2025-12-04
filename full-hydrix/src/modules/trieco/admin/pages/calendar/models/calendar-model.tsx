import { makeAutoObservable, runInAction } from "mobx";
import { CalenderProps, getOrdersByIdTransporterCompany, NowDate, Order } from "../services/calender";
import { toast } from "react-toastify";

class CalendarModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    private _orders: Order[] = [];
    private _calendar: CalenderProps[] = [];
    private _nowDate: NowDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
    };

    private сounterRenderingCalendar: number = 0;

    get getcalendar() {
        return this._calendar;
    }
    get getNowDate() {
        return this._nowDate;
    }

    nextMonth() {
        if (this.сounterRenderingCalendar > 6) return
        let newMonth = true
        if (this._nowDate.month === 11) {
            this._nowDate.month = 0;
            this._nowDate.year++
            newMonth = false
        } else {
            this._nowDate.month++;
        }
        this.сounterRenderingCalendar++
        this.renderingCalendar(this._orders.filter((order: Order) => new Date(order.arrivalStartDate).getMonth() === this._nowDate.month && new Date(order.arrivalStartDate).getFullYear() === this._nowDate.year && order.orderStatusId !== 1))
    }

    prevMonth() {
        if (this.сounterRenderingCalendar < -12) return
        let newMonth = true
        if (this._nowDate.month === 0) {
            this._nowDate.month = 11;
            this._nowDate.year--
            newMonth = false
        } else {
            this._nowDate.month--;
        }
        this.сounterRenderingCalendar--
        this.renderingCalendar(this._orders.filter((order: Order) => new Date(order.arrivalStartDate).getMonth() === this._nowDate.month && new Date(order.arrivalStartDate).getFullYear() === this._nowDate.year && order.orderStatusId !== 1))
    }

    private assignOrdersToDays(calendar: CalenderProps, orders: Order[]) {
        const days = calendar.month.days;

        orders.forEach(order => {
            const orderDate = new Date(order.arrivalStartDate);
            // Получаем номер дня из даты заявки
            const dayNum = orderDate.getUTCDate(); // Получаем день месяца
            // Находим соответствующий день в календаре
            const day = days.find(d => d.num === dayNum);

            if (day) {
                // Если день найден, добавляем заявки в массив orders этого дня
                if (!day.orders || !day.countDounOrders) {
                    day.orders = []; // Создаем массив, если его нет
                    day.countDounOrders = 0;
                }
                day.orders.push(order);
                if (order.orderStatusId === 4) day.countDounOrders++;
            }
        });
    }

    private renderingCalendar(ordersNowMonth: Order[]): boolean {
        let todayYear = this._nowDate.year;
        let todayMonth = this._nowDate.month;

        // Проверка на наличие данного месяца в календаре, если нет, то создаём его
        // Первый день недели в выбранном месяце
        let firstDayOfMonth = new Date(todayYear, todayMonth, 7).getDay();
        // Последний день выбранного месяца
        let lastDateOfMonth = new Date(todayYear, todayMonth + 1, 0).getDate();
        // Последний день недели выбранного месяца
        let lastDayOfMonth = new Date(todayYear, todayMonth + 1, 0).getDay();
        // Последний день предыдущего месяца
        let lastDayOfLastMonth = new Date(todayYear, todayMonth, 0).getDate();

        let dateCounter = lastDayOfLastMonth - firstDayOfMonth + 1;

        // инициализация месяца в календаре
        this._calendar[todayMonth] = {
            month: {
                num: todayMonth,
                days: []
            }
        };

        // Заполнение дней из предыдущего месяца
        if (firstDayOfMonth !== 0) {
            for (let j = 0; j < firstDayOfMonth + 1; j++) {
                let previousDate = new Date(todayYear, todayMonth - 1, dateCounter); // Указываем предыдущий месяц

                this._calendar[todayMonth].month.days[j] = {
                    num: previousDate.getDate(),
                    class: "!text-[#C5CEE0]",
                }
                dateCounter++;
            }
        }

        // Заполнение дней текущего месяца (первая неделя)
        let p = 0; // Счетчик для текущего месяца
        for (let j = firstDayOfMonth; j < lastDateOfMonth + firstDayOfMonth; j++) {
            let previousDate = new Date(todayYear, todayMonth, p + 1); // Указываем текущий месяц
            this._calendar[todayMonth].month.days[j] = {
                num: previousDate.getDate(),
                class: "!text-[#222B45]",
            }
            p++;
        }
        // Заполнение дней остатка следующего месяца
        let counterDay = this._calendar[todayMonth].month.days.length; // Счетчик для следующего месяца

        if (lastDayOfMonth !== 0) {
            for (let j = lastDayOfMonth; j < 7; j++) {
                if (p == lastDateOfMonth) {
                    p = 0;
                }
                let previousDate = new Date(todayYear, todayMonth + 1, p + 1); // Указываем текущий месяц
                this._calendar[todayMonth].month.days[counterDay++] = {
                    num: previousDate.getDate(),
                    class: "!text-[#C5CEE0]",
                }
                p++;
                lastDayOfMonth++;
            };
            this.assignOrdersToDays(this._calendar[todayMonth], ordersNowMonth);
        }

        return true;
    }

    public init(companyId: number) {
        const ordersPromise = getOrdersByIdTransporterCompany({ CompanyId: companyId });

        Promise.all([ordersPromise])
            .then((roders) => {
                this._orders = roders[0].data
                this.renderingCalendar(this._orders.filter((order: Order) => new Date(order.arrivalStartDate).getMonth() === this._nowDate.month && new Date(order.arrivalStartDate).getFullYear() === this._nowDate.year && order.orderStatusId !== 1))
            })
            .catch((error) => {
                console.log(error)
                toast("Ошибка при получении заявок")
            });
    }
}

export const calendarModel = new CalendarModel();