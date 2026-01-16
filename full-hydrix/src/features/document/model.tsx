import { DocumentsModelType } from "@/entities/documents/type";
import { makeAutoObservable } from "mobx";

export class DocumentModel {
    model: DocumentsModelType = {
        file: null,
        fileName: '',
        documentName: '',
    };

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get isValue() {
        return this.model.fileName.length == 0
    }

    get getData() {
        return this.model
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            this.model.file = selectedFile;
            this.model.fileName = selectedFile.name;
        }
    };

    setDocumentName = (name: string) => {
        this.model.documentName = name;
    };

    reset = () => {
        this.model = {
            file: null,
            fileName: '',
            documentName: '',
        };
    };
}

export const documentModel = new DocumentModel();