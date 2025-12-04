import { makeAutoObservable } from 'mobx';

class HeaderStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    onBackButtonClick?: () => void;

    private _customTitle: string = "";

    setTitle(value: string) {
        this._customTitle = value;
    }

    get title() {
        return this._customTitle;
    }

    setOnBackButtonClick(callback?: () => void) {
        this.onBackButtonClick = callback;
    }

    clear() {
        this.onBackButtonClick = undefined
        this._customTitle = ""
    }

    executeBackButtonClick() {
        if (this.onBackButtonClick) {
            this.onBackButtonClick();
        }
    }
}
const headerStore = new HeaderStore();


export default headerStore;