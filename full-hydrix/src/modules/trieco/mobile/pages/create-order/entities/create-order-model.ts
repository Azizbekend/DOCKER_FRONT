import { makeAutoObservable, runInAction, toJS } from "mobx";
import { createOrder, createOrderByPoint } from "../service/order";
import { getAllPointsByUser, Point } from "@/modules/client/components/points/service/point-service";
import { NavigateFunction } from "react-router-dom";

const code = "24928587-9095-4b8a-a99e-6eabfc05b2cd"

class CreateOrderModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })

        this._model = {
            address: "",
            date: "",
            startTime: "",
            endTime: "",
            arrivalEndDate: "",
            municipalityName: "",
            arrivalStartDate: "",
            name: "",
            surname: "",
            patronymic: "",
            phone: "",
            wasteVolume: 4,
            latitude: 0,
            longitude: 0,
        }

        this._modelPay = {
            cardNumber: '',
            monthDate: '',
            yearDate: '',
            name: "",
            cvc: "",
            email: "",
        }

        this._cost = 500 * 4;
    }

    isPickupPoint: boolean = false;
    showMap: boolean = true;
    pickupPoints: Point[] = [];

    selectedPoint: Point | null = null;

    private _model: CreateOrderEntity;
    private _modelPay: CreatePayEntity;
    private _cost: number;

    get model() {
        return this._model;
    }

    get modelPay() {
        return this._modelPay;
    }

    private _pageCounter: number = 1;

    get pageCounter() {
        return this._pageCounter;
    }
    get cost() {
        return this._cost;
    }

    setCost(value: number) {
        this._cost = value
    }

    setCoords(latitude: number, longitude: number) {
        this._model.longitude = longitude;
        this._model.latitude = latitude;
    }

    getPoints(userId: number) {
        this.showMap = false;
        getAllPointsByUser({ userId: userId }).then(async x => {
            const addresses: Point[] = x.data;

            for (const address of addresses) {
                const response = await fetch(
                    `https://geocode-maps.yandex.ru/1.x/?apikey=${code}&format=json&geocode=${address.address}&lang=ru_RU`
                );
                const data = await response.json();
                const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number).reverse() as [number, number];
                address.latitude = coordinates[0]
                address.longitude = coordinates[1]
            }
            runInAction(() => {
                this.pickupPoints = addresses;
            })
        }).then(() => {
            const id = window.localStorage.getItem('pickup-id')
            if (id) {
                this.selectedPoint = this.pickupPoints.find(x => x.pointId === Number(id))!;
            }
            this.showMap = true;
        })
    }

    checkInput(text: string, minLength?: number, maxLength?: number): string {
        if (text.length === 0) {
            return "Поле обязательно для заполнения";
        }

        if (minLength && text.length < minLength) {
            return "Минимальное значение - " + minLength + " символов";
        }

        if (maxLength && text.length > maxLength) {
            return "Максимальное значение - " + maxLength + " символов";
        }

        return "";
    }

    clearData() {
        this.clearCounter();
        this._model = {
            address: "",
            date: "",
            startTime: "",
            endTime: "",
            arrivalEndDate: "",
            arrivalStartDate: "",
            name: "",
            surname: "",
            municipalityName: "",
            patronymic: "",
            phone: "",
            wasteVolume: 4,
            latitude: 0,
            longitude: 0,
        }
    }

    setPickupPoint(point: Point | null) {
        this.isPickupPoint = point != null;
        this.selectedPoint = point;
    }

    setPage(value: number) {
        // if (this.pageCounter < value) return;
        this._pageCounter = value;
    }

    nextPage() {
        ++this._pageCounter;
    }

    clearCounter() {
        this._pageCounter = 1;
    }

    changeAddress(value: string) {
        this._model.address = value;
    }

    changeDate(value: string) {
        this._model.date = value
    }

    changeStartTime(value: string) {
        this._model.startTime = value;
        const [hours, minutes] = value.split(':').map(Number);
        const endHours = (hours + 2) % 24;
        this.changeEndTime(`${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    }

    changeEndTime(value: string) {
        this._model.endTime = value;
    }

    changeFirstName(value: string) {
        this._model.name = value;
    }

    changeLastName(value: string) {
        this._model.surname = value;
    }

    changeMiddleName(value: string) {
        this._model.patronymic = value;
    }

    changePhone(value: string) {
        this._model.phone = value;
    }

    changeMunicipality(value: string) {
        this._model.municipalityName = value;
    }

    changeWaste(value: any) {
        this._model.wasteVolume = value;
    }

    isAddress() {
        return this._model.address != ""
    }

    changeCardNumber(value: string) {
        const numericValue = value.replace(/\D/g, '');

        const formattedValue = numericValue
            .replace(/(\d{4})(?=\d)/g, '$1 ')
            .trim();

        this._modelPay.cardNumber = formattedValue;
    }

    changeMonthDate(value: string) {
        if (value.length > 2) return;
        this._modelPay.monthDate = value;
    }

    changeYearDate(value: string) {
        if (value.length > 2) return;
        this._modelPay.yearDate = value;
    }

    changeName(value: string) {
        if (/[^a-zA-Z ]/.test(value) || value.length > 50) return;
        this._modelPay.name = value.toUpperCase();
    }

    changeCVC(value: string) {
        if (/[\D]/.test(value) || value.length > 3) {
            return;
        }
        this._modelPay.cvc = value;
    }

    changeEmail(value: string) {
        this._modelPay.email = value;
    }

    canSave(): boolean {
        return (this._model.date != "" &&
            this._model.endTime != "" &&
            this._model.startTime != "" &&
            this._model.surname != "" &&
            this._model.name != "" &&
            this._model.phone != "" &&
            this._model.address != "")
    }

    // ? Проверка на заполненность данных карты в ходе создания заявки.
    canSavePay(): boolean {
        return (this._modelPay.cardNumber.length === 19 &&
            this._modelPay.monthDate.length === 2 &&
            this._modelPay.yearDate.length === 2 &&
            this._modelPay.name !== "" &&
            this._modelPay.cvc.length === 3 &&
            this._modelPay.email !== "")
    }

    save(userId: number, companyId: number | null) {

        if (!this.canSave()) return;

        //? Проверка на заполненность данных карты в ходе создания заявки.
        // if (!this.canSavePay()) return;

        if (this.selectedPoint) {
            createOrderByPoint({
                name: this._model.name,
                municipalityName: this._model.municipalityName,
                surname: this._model.surname,
                patronymic: this._model.patronymic,
                phoneNumber: this._model.phone,
                orderStatusId: 1,
                userId: userId,
                adress: this._model.address,
                arrivalEndDate: this._model.date + "T" + this._model.endTime + 'Z',
                arrivalStartDate: this._model.date + "T" + this._model.startTime + 'Z',
                pointId: this.selectedPoint.pointId,
                latitude: this.selectedPoint.latitude,
                longitude: this.selectedPoint.longitude,
            }).then(() => {
                window.localStorage.setItem('pickup-id', this.selectedPoint!.pointId.toString())
                window.localStorage.setItem('latitude', this.selectedPoint!.latitude.toString())
                window.localStorage.setItem('longitude', this.selectedPoint!.longitude.toString())
            })

            return;
        }

        createOrder({
            name: this._model.name,
            surname: this._model.surname,
            patronymic: this._model.patronymic,
            municipalityName: this._model.municipalityName,
            phoneNumber: this._model.phone,
            adress: this._model.address,
            arrivalEndDate: this._model.date + "T" + this._model.endTime + 'Z',
            arrivalStartDate: this._model.date + "T" + this._model.startTime + 'Z',
            comment: "",
            orderStatusId: 1,
            userId: userId,
            latitude: this._model.latitude,
            longitude: this._model.longitude,
            wasteVolume: this._model.wasteVolume
        }).then(x => {
            onSave && onSave(4)
        })
    }
}

type CreateOrderEntity = {
    address: string,
    date: string,
    startTime: string,
    endTime: string,
    arrivalEndDate: string,
    arrivalStartDate: string,
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    municipalityName: string;
    orderStatusId?: number,
    longitude?: number,
    latitude?: number,
    wasteVolume: number
}
type CreatePayEntity = {
    cardNumber: string,
    monthDate: string,
    yearDate: string,
    name: string,
    cvc: string,
    email: string,
}

const createOrderModel = new CreateOrderModel();

export default createOrderModel

