import { makeAutoObservable } from "mobx";
import {
  createSewer,
  CreateSewerRequest,
  createSewerUser,
  CreateSewerUserRequest,
  getSewersByCompanyId,
  Sewer,
} from "../services/sewers";
import { toast } from "react-toastify";
import { Role } from "@/entities/user/role";

export class CreateSewerModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.model = {
      companyId: 0,
      sewerBusinessType: "",
      userId: 0,
      sewerCarModel: "",
      sewerNumberPlate: "",
      tankVolume: 0,
      name: "",
      phoneNumber: "",
      email: "",
    };
  }

  model: CreateSewerRequest;

  changeSewerNumberPlate(value: string) {
    if (!this.model) return;

    this.model.sewerNumberPlate = value;
  }

  changeTankVolume(value: string) {
    if (!this.model) return;

    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      return;
    }

    this.model.tankVolume = parsedValue;
  }


  changeName(value: string) {
    if (!this.model) return;

    this.model.name = value;
  }

  changeBusinessType(value: string) {
    if (!this.model) return;

    this.model.sewerBusinessType = value;
  }

  changeSewerCarModel(value: string) {
    if (!this.model) return;

    this.model.sewerCarModel = value;
  }

  changeLogin(value: string) {
    if (!this.model) return;

    this.model.login = value;
  }

  changePhone(value: string) {
    if (!this.model) return;

    this.model.phoneNumber = value;
  }

  changeEmail(value: string) {
    if (!this.model) return;

    this.model.email = value;
  }

  validateOperator(): string | null {
    if (!this.model) return "Ошибка: оператор не инициализирован";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

    if (!this.model.name.split(" ")[0] || this.model.name.split(" ")[0] === "")
      return "Фамилия обязательна";
    if (!this.model.name.split(" ")[1] || this.model.name.split(" ")[1] === "")
      return "Имя обязательно";

    if (!this.model.login || this.model.login.trim() === "")
      return "Логин обязателен";
    if (!this.model.phoneNumber) return "Номер телефона обязателен";
    if (!phoneRegex.test(this.model.phoneNumber))
      return "Неверный формат телефона";

    if (!this.model.email) return "Почта обязательно";

    if (!emailRegex.test(this.model.email)) return "Неверный формат email";

    if (!this.model.sewerBusinessType || this.model.sewerBusinessType === "")
      return "Вид предпринимательства обязателен";

    if (!this.model.sewerCarModel || this.model.sewerCarModel === "")
      return "Марка автомобиля обязателен";

    if (!this.model.sewerNumberPlate || this.model.sewerNumberPlate === "")
      return "Номер автомобиля обязателен";

    if (!this.model.tankVolume || this.model.tankVolume === 0)
      return "Ёмкость автомобиля  обязателен";

    if (
      !nameRegex.test(this.model.name.split(" ")[0]) ||
      !nameRegex.test(this.model.name.split(" ")[1]) ||
      !nameRegex.test(this.model.name.split(" ")[2])
    ) {
      return "Неверный формат ФИО (используйте только буквы)";
    }

    return null;
  }

  async checkDuplicate(companyId: number): Promise<boolean> {
    try {
      const response = await getSewersByCompanyId({ Id: companyId });
      const existingSewers = response.data;

      const isDuplicate = existingSewers.some((sewer: Sewer) => {
        return (
          sewer.sewerNumberPlate === this.model.sewerNumberPlate ||
          sewer.phoneNumber === this.model.phoneNumber ||
          sewer.email === this.model.email
        );
      });

      return isDuplicate;
    } catch (error) {
      console.error("Ошибка при проверке дублирования: ", error);
      return false;
    }
  }

  async createSewer(companyId?: number, addSewer?: (sewer: Sewer) => void) {
    this.model.companyId = companyId || 0;

    const validationError = this.validateOperator();
    if (validationError) {
      toast(validationError, {
        progressStyle: { background: "red" },
      });
      return;
    }

    const isDuplicate = await this.checkDuplicate(companyId || 0);
    if (isDuplicate) {
      toast(
        "Этот ассенизатор уже существует (проверьте номер автомобиля, телефон или почту)",
        {
          progressStyle: { background: "red" },
        }
      );
      return;
    }

    try {
      const firstName = this.model.name.split(" ")[1];
      const lastName = this.model.name.split(" ")[0];
      const patronymic = this.model.name.split(" ")[2];
      const createUserResp = await createSewerUser({
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic,
        phoneNumber: this.model.phoneNumber,
        login: this.model.login ?? "",
        password: "pass",
        roleId: Role.Sewer,
        email: this.model.email,
      });

      this.model.userId = createUserResp.data["id"];

      const createSewerResp = await createSewer(this.model);

      addSewer &&
        addSewer({
          companyId: companyId || 0,
          firstName: this.model.name.split(" ")[1],
          lastName: this.model.name.split(" ")[0],
          email: this.model.email,
          phoneNumber: this.model.phoneNumber,
          id: createSewerResp.data.id,
          patronymic: this.model.name.split(" ")[2],
          rating: 0,
          sewerBusinessType: this.model.sewerBusinessType,
          sewerCarModel: this.model.sewerCarModel,
          sewerNumberPlate: this.model.sewerNumberPlate,
          tankVolume: this.model.tankVolume,
          userId: this.model.userId,
        });
      toast("Ассенизатор создан", {
        progressStyle: { background: "green" },
      });
    } catch (error) {
      toast("Не удалось создать ассенизатора", {
        progressStyle: { background: "red" },
      });
    }
  }
}

const createSewerModel = new CreateSewerModel();
export default createSewerModel;
