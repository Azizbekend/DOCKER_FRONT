import { makeAutoObservable } from "mobx";

export class NotificationModel {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    private _notifications: Notification[] = [
        {
            date: new Date(),
            message: "Ваша заявка по вывозу ЖБО принят! Следите за статусом заявки на главной странице."
        }
    ];
    private _isShow: boolean = false;

    get isShow() {
        return this._isShow;
    }

    setShow(value: boolean) {
        this._isShow = value;
    }

    get notifications() {
        return this._notifications;
    }

    addNotification(value: Notification) {
        this._notifications.push(value)
    }

    
}

export type Notification = {
    date: Date;
    message: string;
}

const notificationModel = new NotificationModel();
export default notificationModel;