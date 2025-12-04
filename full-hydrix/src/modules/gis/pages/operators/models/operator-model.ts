import { makeAutoObservable } from "mobx";
import { operatorRole, OperatorRole } from "@/entities/user/hooks";
import { Operator } from "@/entities/operator/type";
import { Meta } from "@/app/api/meta";
import { Plant } from "@/entities/plants/types";

class OperatorModel {
  operator: Operator = {
    userId: 0,
    firstName: "",
    lastName: "",
    patronymic: "",
    phone: "",
    email: "",
    login: "",
    roleName: OperatorRole.Plant,
    isRevoked: true,
    waterCompanyId: 0,
    plantId: 0,
    workplace: "",
  };
  selectedRole: OperatorRole = OperatorRole.WaterCompany;
  plants: Plant[] = [];
  meta: Meta = Meta.LOADING;

  typeModal: "add" | "edit" = "add";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTypeModal(type: "add" | "edit") {
    this.typeModal = type;
  }

  setOperator(operator: Operator) {
    this.operator = operator;
  }

  async init(operator: Operator | null) {
    // const plantsResponse = await getWaterCompanyPlants({
    //   WaterCompanyId: waterCompanyId || 0,
    // });

    // const filteredPlants = plantsResponse.data;

    // this.plants = filteredPlants.filter((plant: { isArchived: boolean; }) => plant.isArchived === false);
    this.meta = Meta.SUCCESS;
  }

  setRole(role: OperatorRole) {
    this.selectedRole = role;
    this.operator.plantId = 0;
    this.operator.roleName = role;
  }

  setLogin(value: string) {
    this.operator.login = value;
  }

  setPlant(value: number) {
    this.operator.plantId = value;
  }

  setFirstName(value: string) {
    this.operator.firstName = value;
  }

  setLastName(value: string) {
    this.operator.lastName = value;
  }

  setPatronymic(value: string) {
    this.operator.patronymic = value;
  }

  setEmail(value: string) {
    this.operator.email = value;
  }

  setPhone(value: string) {
    this.operator.phone = value;
  }

  get canSave() {
    if (!this.operator) return false;
    if (
      this.selectedRole === OperatorRole.Plant &&
      this.operator.plantId === 0
    )
      return false;

    return (
      this.operator.firstName != "" &&
      this.operator.lastName != "" &&
      this.operator.roleName != "" &&
      this.operator.email != "" &&
      this.operator.phone != "" &&
      this.operator.login != ""
    );
  }

  store() {
    // Типо сохраненеие
  }

  // async createOperator(waterCompanyId: number) {

  //   try {
  //     const validationResult = this.validateOperator();
  //     if (validationResult) {
  //       toast(validationResult, { progressStyle: { background: "red" } });
  //       return;
  //     }

  //     const isDuplicate = await this.isDuplicate(
  //       this.operator.email,
  //       this.operator.phoneNumber,
  //       0,
  //       this.operator.login
  //     );
  //     if (isDuplicate) {
  //       toast("Оператор с таким email, логином или телефоном уже существует", {
  //         progressStyle: { background: "red" },
  //       });
  //       return;
  //     }

  //     if (this.selectedRole === OperatorRole.Plant) {
  //       const createPlantOperResponse = await createPlantOperator(
  //         this.operator
  //       );
  //       this.operator.userId = createPlantOperResponse.data.id;
  //     } else {
  //       this.operator.waterCompanyId = waterCompanyId;
  //       const createWaterCompanyOperResponse = await createWaterCompanyOperator(
  //         this.operator
  //       );

  //       this.operator.userId = createWaterCompanyOperResponse.data.id;
  //     }

  //     operatorListModel.pushOperator(this.operator);
  //     toast("Оператор успешно создан", {
  //       progressStyle: { background: "green" },
  //     });
  //   } catch (error) {
  //     toast("Ошибка создания оператора: " + error, {
  //       progressStyle: { background: "red" },
  //     });
  //   }
  // }

  // async updateOperator(afterUpdate?: (operator: Operator) => void) {

  //   try {
  //     if (this._operator.userId) {
  //       const body = {
  //         id: this._operator.userId,
  //         firstName: this._operator.firstName,
  //         lastName: this._operator.lastName,
  //         patronymic: this._operator.patronymic,
  //         email: this._operator.email,
  //         phoneNumber: this._operator.phoneNumber,
  //         adress: null,
  //       };

  //       const isDuplicate = await this.isDuplicate(
  //         this._operator.email,
  //         this._operator.phoneNumber,
  //         this._operator.userId
  //       );
  //       if (isDuplicate) {
  //         toast(
  //           "Оператор с таким email, логином или телефоном уже существует",
  //           {
  //             progressStyle: { background: "red" },
  //           }
  //         );
  //         return;
  //       }

  //       const updateOperator = await updateUser(body);
  //       afterUpdate && afterUpdate(this._operator);
  //       toast.success("Данные оператора успешно сохранены", {
  //         progressStyle: { background: "green" },
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Ошибка обновления данных оператора: " + error, {
  //       progressStyle: { background: "red" },
  //     });
  //   }
  // }

  // validateOperator(): string | null {
  //   if (!this._operator) return "Ошибка: оператор не инициализирован";

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

  //   if (!this._operator.lastName || this._operator.lastName.trim() === "")
  //     return "Фамилия обязательна";
  //   if (!this._operator.firstName || this._operator.firstName.trim() === "")
  //     return "Имя обязательно";
  //   if (!this._operator.login || this._operator.login.trim() === "")
  //     return "Логин обязателен";
  //   if (!emailRegex.test(this._operator.email)) return "Неверный формат email";
  //   if (!phoneRegex.test(this._operator.phoneNumber))
  //     return "Неверный формат телефона";

  //   return null;
  // }

  // async isDuplicate(
  //   email: string,
  //   phoneNumber: string,
  //   excludeUserId?: number,
  //   login?: string
  // ): Promise<boolean> {
  //   let isLocalDuplicate = false;

  //   if (login) {
  //     isLocalDuplicate = this.operators.some((op) => {
  //       return (
  //         op.userId !== excludeUserId &&
  //         (op.email.toLowerCase() === email.toLowerCase() ||
  //           op.login?.toLowerCase() === login?.toLowerCase() ||
  //           op.phoneNumber === phoneNumber)
  //       );
  //     });
  //   } else {
  //     isLocalDuplicate = this.operators.some((op) => {
  //       return (
  //         op.userId !== excludeUserId &&
  //         (op.email.toLowerCase() === email.toLowerCase() ||
  //           op.phoneNumber === phoneNumber)
  //       );
  //     });
  //   }

  //   if (isLocalDuplicate) return true;

  //   try {
  //     const { data } = await getWaterCompanyOperators({
  //       WaterCompanyId: gisModel.waterCompany?.id || 0,
  //     });
  //     const isDuplicate = data.some((op: Operator) => {
  //       return (
  //         op.userId !== excludeUserId &&
  //         (op.email.toLowerCase() === email.toLowerCase() ||
  //           (login && op.login?.toLowerCase() === login?.toLowerCase()) ||
  //           op.phoneNumber === phoneNumber)
  //       );
  //     });
  //     return isDuplicate;
  //   } catch (error) {
  //     toast("Ошибка проверки уникальности на сервере", {
  //       progressStyle: { background: "red" },
  //     });
  //     return false;
  //   }
  // }
}
const operatorModel = new OperatorModel();

export default operatorModel;
