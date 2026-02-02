import { uploadObjectDocument } from "@/packages/entities/documents/api";
import { DocumentsModelType } from "@/packages/entities/documents/type";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";
import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";

export class DocumentModel {
    model: DocumentsModelType = {
        file: null,
        fileName: '',
        documentName: '',
    };

    selectedFile: File | null = null;

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
    }

    reset = () => {
        this.model = {
            file: null,
            fileName: '',
            documentName: '',
        }
    }

    async saveDocument() {
        let fileId: any;

        if (this.model.file) {
            const formData = new FormData();
            formData.append("File", this.model.file);
            const response = await fetch("https://triapi.ru/research/api/FileStorage/documents/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            console.log(result.id)
            fileId = result.id;
        }


        await uploadObjectDocument({
            docId: fileId,
            objectId: getObjectId(),
        })

    }

}

export const documentModel = new DocumentModel();