import { makeAutoObservable, runInAction, toJS } from "mobx";
import { createOrder, createOrderByPoint } from "../service/order";
import Cookies from 'universal-cookie';
import { getAllPointsByUser } from "@/entities/point/api";
import { Point } from "@/entities/point/type";


const code = "24928587-9095-4b8a-a99e-6eabfc05b2cd"
const cookies = new Cookies();


class CreateOrderModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
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
      selfCreated: true,
    }
  }

  isPickupPoint: boolean = false;
  showMap: boolean = true;
  _pickupPoints: Point[] = [];

  selectedPoint: Point | null = null;
  isSelfCreated: boolean = false;

  private _model: CreateOrderEntity;

  get model() {
    return this._model;
  }
  get pickupPoints() {
    return this._pickupPoints;
  }

  private _pageCounter = 1;

  get pageCounter() {
    return this._pageCounter;
  }

  setCoords(latitude: number, longitude: number) {
    this._model.longitude = longitude;
    this._model.latitude = latitude;
  }

  getPoints(userId: number) {
    this.showMap = false;
    getAllPointsByUser({ userId: userId }).then(async (x) => {
      this._pickupPoints = x.data;
    })
  }

  clearData() {
    this._model = {
      address: "",
      municipalityName: "",
      date: "",
      startTime: "",
      endTime: "",
      arrivalEndDate: "",
      arrivalStartDate: "",
      name: "",
      surname: "",
      patronymic: "",
      phone: "",
      wasteVolume: 4,
      latitude: 0,
      longitude: 0,
      selfCreated: true,
    }
  }

  setPickupPoint(point: Point | null) {
    this.isPickupPoint = point != null;
    this.selectedPoint = point;
  }

  setPage(value: number) {
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

  changeMunicipality(value: string) {
    this._model.municipalityName = value;
  }

  changeDate(value: string) {
    this._model.date = value
    this._model.startTime = ""
    this._model.endTime = ""
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

  changeWaste(value: any) {
    this._model.wasteVolume = value;
  }

  isAddress() {
    return this._model.address != ""
  }

  canSave(): boolean {
    return (this._model.date != "" &&
      this._model.endTime != "" &&
      this._model.startTime != "" &&
      this._model.surname != "" &&
      this._model.name != "" &&
      this._model.address != "" &&
      this._model.phone != "")
  }

  switchSelfCreated() {
    this.isSelfCreated = !this.isSelfCreated
    return this._model.selfCreated = !this._model.selfCreated
  }

  async save(userId: number) {
    this._model = JSON.parse(cookies.get("orderData") || "")
    if (!this.canSave()) return;
    if (this.selectedPoint) {
      try {
        const resp = await createOrderByPoint({
          name: this._model.name,
          surname: this._model.surname,
          patronymic: this._model.patronymic,
          phoneNumber: this._model.patronymic,
          orderStatusId: 1,
          userId: userId,
          adress: this._model.address,
          arrivalEndDate: this._model.date + "T" + this._model.endTime + 'Z',
          arrivalStartDate: this._model.date + "T" + this._model.startTime + 'Z',
          pointId: this.selectedPoint.pointId,
          latitude: this.selectedPoint.latitude,
          longitude: this.selectedPoint.longitude,
          municipalityName: this._model.municipalityName,
          selfCreated: false,
        })

        window.localStorage.setItem('pickup-id', this.selectedPoint!.pointId.toString())
        window.localStorage.setItem('latitude', this.selectedPoint!.latitude.toString())
        window.localStorage.setItem('longitude', this.selectedPoint!.longitude.toString())
        this.clearData()
        cookies.remove("orderData");
      } catch (error) {
        console.log(error)
      }


      return;
    }
    const resp = await createOrder({
      municipalityName: this._model.municipalityName,
      name: this._model.name,
      surname: this._model.surname,
      patronymic: this._model.patronymic,
      phoneNumber: this._model.phone,
      adress: this._model.address,
      arrivalEndDate: this._model.date + "T" + this._model.endTime + 'Z',
      arrivalStartDate: this._model.date + "T" + this._model.startTime + 'Z',
      comment: "",
      orderStatusId: 1,
      userId: userId,
      latitude: this._model.latitude,
      longitude: this._model.longitude,
      wasteVolume: this._model.wasteVolume,
      selfCreated: false,
    })
    this.clearData()
    cookies.remove("orderData");
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
  wasteVolume: number,
  selfCreated: boolean,
}

export const createOrderModel = new CreateOrderModel();

