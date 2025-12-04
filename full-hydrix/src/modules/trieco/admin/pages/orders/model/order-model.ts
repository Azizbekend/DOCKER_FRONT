import { makeAutoObservable } from "mobx";
import { Order } from "../service/order";
import { getSewersByCompanyId, Sewer } from "../../sewer-list/services/sewers";
import { toast } from "react-toastify";
import { FiCornerDownLeft } from "react-icons/fi";
import { createOrder } from "@/modules/trieco/client/pages/create-order/service/order";

export class OrderModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._createOrder = {
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
      wasteVolume: 0,
      latitude: 0,
      longitude: 0,
      selfCreated: false,

      userId: 0,
      sewerId: 0,
      sewerFirstName: "",
      sewerLastName: "",
      sewerPatronymic: "",
    };
  }

  private _openedOrder: Order | null = null;
  private _createOrder: CreateOrderEntity;
  private _sewers: Sewer[] = [];

  get order() {
    return this._openedOrder;
  }

  open(order: Order) {
    this._openedOrder = order;
  }

  getSewers(companyId: number) {
    getSewersByCompanyId({ Id: companyId }).then(
      (x) => (this._sewers = x.data)
    );
  }

  get createOrder() {
    return this._createOrder;
  }

  get sewers() {
    return this._sewers;
  }

  changeFirstName(value: string) {
    this._createOrder.name = value;
  }

  changeLastName(value: string) {
    this._createOrder.surname = value;
  }

  changeMiddleName(value: string) {
    this._createOrder.patronymic = value;
  }

  changePhone(value: string) {
    this._createOrder.phone = value;
  }

  changeAddressText(value: string) {
    this._createOrder.address = value;
  }
  changeAddress(value: string, longitude: number, latitude: number) {
    this._createOrder.address = value;
    this._createOrder.latitude = latitude;
    this._createOrder.longitude = longitude;
  }

  changeMunicipality(value: string) {
    this._createOrder.municipalityName = value;
  }

  changeWaste(value: number) {
    if (isNaN(Number(value))) return;
    this._createOrder && (this._createOrder.wasteVolume = value);
  }

  changeDate(value: string) {
    this._createOrder.date = value;
    this._createOrder.startTime = "";
    this._createOrder.endTime = "";
  }

  changeStartTime(value: string) {
    this._createOrder.startTime = value;
    const [hours, minutes] = value.split(":").map(Number);
    const endHours = (hours + 2) % 24;
    this.changeEndTime(
      `${endHours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
  }

  changeEndTime(value: string) {
    this._createOrder.endTime = value;
  }

  changeSewer(sewer: Sewer) {
    this._createOrder.sewerId = sewer.id;
    this._createOrder.userId = sewer.userId;

    this._createOrder.sewerFirstName = sewer.firstName;
    this._createOrder.sewerLastName = sewer.lastName;
    this._createOrder.sewerPatronymic = sewer.patronymic ?? "";
  }

  get isSave() {
    if (this._createOrder.sewerId) {
      this._createOrder.orderStatusId = 6;
    } else {
      this._createOrder.orderStatusId = 1;
    }
    return (
      this._createOrder.name !== "" &&
      this._createOrder.surname !== "" &&
      this._createOrder.phone !== "" &&
      this._createOrder.address !== "" &&
      this._createOrder.sewerId !== 0 &&
      this._createOrder.userId !== 0 &&
      this._createOrder.date !== "" &&
      this._createOrder.startTime !== "" &&
      this._createOrder.wasteVolume !== 0 &&
      this._createOrder.selfCreated === false
    );
  }

  clearData() {
    this._createOrder = {
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
      wasteVolume: 0,
      latitude: 0,
      longitude: 0,
      selfCreated: false,

      userId: 0,
      sewerId: 0,
      sewerFirstName: "",
      sewerLastName: "",
      sewerPatronymic: "",
    };
  }

  async save() {
    try {
      await createOrder({
        municipalityName: this._createOrder.municipalityName,
        name: this._createOrder.name,
        surname: this._createOrder.surname,
        patronymic: this._createOrder.patronymic,
        phoneNumber: this._createOrder.phone,
        adress: this._createOrder.address,
        arrivalEndDate: this._createOrder.date + "T" + this._createOrder.endTime + "Z",
        arrivalStartDate: this._createOrder.date + "T" + this._createOrder.startTime + "Z",
        comment: "",
        orderStatusId: this._createOrder.orderStatusId,
        userId: this._createOrder.userId,
        latitude: this._createOrder.latitude,
        longitude: this._createOrder.longitude,
        wasteVolume: this._createOrder.wasteVolume,
        selfCreated: false,
        sewerId: this._createOrder.sewerId,
      });
    } catch (error) {
      toast.error("Ошибка при создании заявки", { progressStyle: { background: "red" } });
    }
  }
}

type CreateOrderEntity = {
  address: string;
  date: string;
  startTime: string;
  endTime: string;
  arrivalEndDate: string;
  arrivalStartDate: string;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  municipalityName: string;
  orderStatusId?: number;
  longitude?: number;
  latitude?: number;
  wasteVolume: number;
  selfCreated: boolean;

  userId: number;
  sewerId: number;
  sewerFirstName: string;
  sewerLastName: string;
  sewerPatronymic: string;
};

const orderModel = new OrderModel();
export default orderModel;
