import { Operator } from "@/entities/operator/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import operatorModel from "./operator-model";
import { getWaterCompanyOperators } from "@/entities/water-company/api";

export class OperatorListModel {

  model: Operator[] = [];
  showInfo: boolean = false;
  showModalChange: boolean = false;
  operator: Operator | null = null;


  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get list() {
    return this.model
  }

  setShowInfo(value: boolean, row: Operator | null) {
    this.showInfo = value;
    this.operator = row;
  }
  setShowModalChange(value: boolean, row: Operator | null) {
    this.showModalChange = value;
    this.operator = row;
  }

  pushOperator(operator: Operator) {
    this.model.push(operator);
    this.model = this.model.slice();
  }

  updateOperator(operator: Operator) {
    this.setShowModalChange(true, operator);
    operatorModel.setOperator(operator);
  }


  async init(waterCompanyId: number) {
    getWaterCompanyOperators({ WaterCompanyId: waterCompanyId })
      .then((x) => {
        this.model = x.data;
      })
      .catch(() => {
        toast("Операторов не найдено", {
          progressStyle: { background: "red" },
        });
      });
  }
}

const operatorListModel = new OperatorListModel();
export default operatorListModel;
