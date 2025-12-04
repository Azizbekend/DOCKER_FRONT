import { makeAutoObservable } from "mobx";
import { getSewersByCompanyId, Sewer } from "../../sewer-list/services/sewers";
import { attachSewer } from "../service/order";

export class AttachSewerModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  sewersList: Sewer[] = [];
  selectedSewer: Sewer | null = null;
  filteredSewers: Sewer[] = [];
  isModalShow: boolean = false;
  orderId: number = 0;

  setModalShow(value: boolean, orderId?: number) {
    this.orderId = orderId ?? 0;
    this.isModalShow = value;

    if (value === false) {
      this.selectedSewer = null;
    }
  }

  public init(companyId: number) {
    getSewersByCompanyId({ Id: companyId })
      .then((x) => (this.sewersList = x.data))
      .then(() => (this.filteredSewers = this.sewersList));
  }

  handleSelect(value: Sewer | null) {
    this.selectedSewer = value;
  }

  handleInput(value: string) {
    const searchValue = value.trim().toLowerCase();

    if (searchValue === "") {
        this.filteredSewers = this.sewersList;
    } else {
        const searchTerms = searchValue.split(/\s+/).filter(term => term.length > 0);
        this.filteredSewers = this.sewersList.filter((x) => {
            const fullName = `${x.lastName} ${x.firstName} ${x.patronymic}`.toLowerCase();
            return searchTerms.every(term => fullName.includes(term));
        });
    }
}

  attach() {
    if (this.selectedSewer === null || this.orderId === null) return;
    attachSewer({
      orderId: this.orderId ?? 0,
      sewerId: this.selectedSewer.id,
    }).then((x) => {
      // attachToTable(this.orderId, this.selectedSewer)
    });
  }
}

const attachSewerModel = new AttachSewerModel();
export default attachSewerModel;
