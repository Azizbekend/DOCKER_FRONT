import { makeAutoObservable } from "mobx";

class FileStore {
    file = null;
    previewUrl = "";

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setFile(file: any) {
        this.file = file;
        this.previewUrl = URL.createObjectURL(file);
    }

    clearFile() {
        this.file = null;
        this.previewUrl = "";
    }

    isEmpty() {
        return this.file != null;
    }
}

const fileStore = new FileStore();
export default fileStore;