import { objectDocumenAll, objectDocumentDelete, objectDocumentUpload } from '@/packages/entities/file-storage/api';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';


class PassportDocuments {

    model: any = []
    isLoader: boolean = true
    objectId: number = 0

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(objectId: number) {
        this.objectId = objectId

        await objectDocumenAll({ id: objectId })
            .then((res) => {
                this.model = res.data
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                this.isLoader = false
            })
    }

    async deleteDoc(docId: number) {

        await objectDocumentDelete({ id: docId })
            .then((res) => {
                this.model = this.model.filter((item: any) => {
                    return item.id !== docId
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    async uploadDoc(data: any) {

        try {

            const formData = new FormData();
            formData.append("ObjectId", this.objectId);
            formData.append("DocumentName", data.name);
            formData.append("DocumentType", data.category);
            formData.append("File", data.file);

            const response = await fetch("https://triapi.ru/research/api/FileStorage/object/document/upload", {
                method: "POST",
                body: formData
            })
            const result = await response.json();

            this.model.push({
                id: result.id,
                name: result.name,
                category: result.category,
                file: result.docId
            })


            toast.success("Документ добавлен")

        } catch (error) {
            console.log(error)
        }

    }
}

export const passportDocuments = new PassportDocuments()