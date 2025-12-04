// import { makeAutoObservable } from "mobx";

// export class RecoveryPasswordModel {
//     constructor() {
//         makeAutoObservable(this, {}, { autoBind: true })
//     }

//     private _email: string = "";
//     private _isRecovery: boolean = false;

//     get email() {
//         return this._email;
//     }

//     get isRecovery() {
//         return this._isRecovery;
//     }

//     changeEmail(value: string) {
//         this._email = value;
//     }

//     async send() {
//         await recoveryPassword({ Email: this._email })
//         this._isRecovery = true;
//     }
// }

// const recoveryPasswordModel = new RecoveryPasswordModel();
// export default recoveryPasswordModel;