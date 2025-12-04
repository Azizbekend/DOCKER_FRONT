import {
  createPayment,
  getPaymentDetails,
  PaymentRequest,
  updatePayment,
} from "@/app/cores/core-trieco/network/payment/payment";
import { getUserCompany } from "@/app/cores/core-trieco/network/user/user";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

export class PaymentModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._paymentDetails = {
      id: 0,
      isApproved: false,
      bankName: "",
      bik: "",
      companyId: this._companyId,
      corresAccount: "",
      kpp: "",
      paymentAccount: "",
    };
  }

  private _companyId: number = 0;
  private _paymentDetails: PaymentRequest;
  private _tempPaymentDetails: PaymentRequest | null = null;
  private _isInitPayment: boolean = false;

  init(userId: number) {
    getUserCompany({ UserId: userId })
      .then((x) => {
        this._companyId = x.data["companyId"];
        this._paymentDetails.companyId = this._companyId;
      })
      .then(() => {
        getPaymentDetails({ CompanyId: this._companyId })
          .then((x) => {
            this._paymentDetails = x.data;
            this._tempPaymentDetails = x.data;
            this._isInitPayment = true;
          })
          .catch((x) => (this._isInitPayment = false));
      })
      .catch(() => {
        toast("Компания не найдена", { progressStyle: { background: "red" } });
      });
  }

  changePaymentAccount(value: string) {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return;
    }
    this._paymentDetails.paymentAccount = value;
  }

  changeBIK(value: string) {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return;
    }
    this._paymentDetails.bik = value;
  }

  changeKPP(value: string) {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return;
    }
    this._paymentDetails.kpp = value;
  }

  changeBankName(value: string) {
    this._paymentDetails.bankName = value;
  }

  changeCorrAcc(value: string) {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return;
    }

    this._paymentDetails.corresAccount = value;
  }

  save(onSave?: (value: any) => void) {
    if (this._isInitPayment) {
      updatePayment(this._paymentDetails)
        .then((x) => {
          onSave && onSave("Успешно обновлено");
        })
        .then((x) => {
          this._tempPaymentDetails = { ...this.paymentDetails };
        });
      return;
    }

    createPayment(this._paymentDetails).then((x) => {
      onSave && onSave("Успешно сохранено");
    });
  }

  get canSave() {
    if (this.isInitPayment) {
      return (
        this._paymentDetails.bankName != this._tempPaymentDetails?.bankName ||
        (this._paymentDetails.bik.length === 9 &&
          this._tempPaymentDetails?.bik != this._paymentDetails.bik) ||
        (this._paymentDetails.corresAccount.length === 20 &&
          this._tempPaymentDetails?.corresAccount !=
          this._paymentDetails.corresAccount) ||
        (this._paymentDetails.kpp.length === 9 &&
          this._tempPaymentDetails?.corresAccount !=
          this._paymentDetails.corresAccount) ||
        (this._paymentDetails.paymentAccount.length === 20 &&
          this._tempPaymentDetails?.paymentAccount !=
          this._paymentDetails.paymentAccount)
      );
    }
    return (
      this._paymentDetails.paymentAccount.length === 20 &&
      this._paymentDetails.bik.length === 9 &&
      this._paymentDetails.corresAccount.length === 20 &&
      this._paymentDetails.kpp.length === 9
    );
  }

  get companyId() {
    return this._companyId;
  }

  get paymentDetails() {
    return this._paymentDetails;
  }

  get isInitPayment() {
    return this._isInitPayment;
  }
}

const paymentModel = new PaymentModel();
export default paymentModel;
