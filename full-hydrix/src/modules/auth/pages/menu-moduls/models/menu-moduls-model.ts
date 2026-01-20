import { makeAutoObservable } from "mobx";
import { MenuItemType } from "../services/menu-moduls-service";
import { Role } from "@/packages/entities/user/enums";

export class MenuModulsModel {

    userRole: number;
    itemsInformations: MenuItemType[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this.userRole = Role.Client
    }

    init(items: MenuItemType[]) {
        this.itemsInformations = items;
    }
}

const menuModulsModel = new MenuModulsModel();
export default menuModulsModel;
