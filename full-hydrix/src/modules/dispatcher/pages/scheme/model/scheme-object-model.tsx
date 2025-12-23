import { SchemaCoordinatesCreateType, SchemaObjectType } from "@/entities/hardware/type"
import { makeAutoObservable } from "mobx"
import { ChangeEvent } from "react"
import { schemeModel } from "./scheme-model"

import { deleteSchemaCoordinates, updateSchemaCoordinatesCreate } from "@/entities/hardware/api"
import { toast } from "react-toastify"

class SchemeObjectModel {


    isLoading: boolean = true
    index: number = 0

    preview: { default: string | null, red: string | null, green: string | null } = { default: null, red: null, green: null }

    fileId: string = ""
    hardwareSchemaId: number = 0
    saveIMageScheme: { default: File | null, red: File | null, green: File | null } = { default: null, red: null, green: null }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setTop(value: string) {
        schemeModel.model[this.index].top = value
    }

    setLeft(value: string) {
        schemeModel.model[this.index].left = value
    }
    setHeight(value: string) {
        schemeModel.model[this.index].height = value
    }

    setWidth(value: string) {
        schemeModel.model[this.index].width = value
    }

    setHardwareSchemaId(value: number) {
        schemeModel.model[this.index].hardwareSchemaId = value
    }


    setSaveIMage(e: ChangeEvent<HTMLInputElement>, color: "default" | "red" | "green") {
        if (color == "default") {
            this.saveIMageScheme.default = e.target.files && e.target?.files[0]
            if (this.saveIMageScheme.default) this.preview.default = URL.createObjectURL(this.saveIMageScheme.default);
        }
        if (color == "red") {
            this.saveIMageScheme.red = e.target.files && e.target?.files[0]
            if (this.saveIMageScheme.red) this.preview.red = URL.createObjectURL(this.saveIMageScheme.red);
        }
        if (color == "green") {
            this.saveIMageScheme.green = e.target.files && e.target?.files[0]
            if (this.saveIMageScheme.green) this.preview.green = URL.createObjectURL(this.saveIMageScheme.green);
        }
    }

    async updateScheme() {

        const apiData: SchemaCoordinatesCreateType = {
            id: schemeModel.model[this.index].id,
            top: schemeModel.model[this.index].top,
            left: schemeModel.model[this.index].left,
            height: schemeModel.model[this.index].height,
            width: schemeModel.model[this.index].width,
            hardwareSchemaId: schemeModel.model[this.index].hardwareSchemaId,
        }

        if (this.saveIMageScheme.default) {
            const formData = new FormData();
            formData.append("File", this.saveIMageScheme.default);

            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            const schemaImageId = result.id;
            apiData.fileId = schemaImageId
            schemeModel.model[this.index].fileId = schemaImageId
        } else {
            apiData.fileId = schemeModel.model[this.index].fileId
        }

        if (this.saveIMageScheme.red) {
            const formData = new FormData();
            formData.append("File", this.saveIMageScheme.red);

            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            const schemaImageId = result.id;
            apiData.redFileId = schemaImageId
            schemeModel.model[this.index].redFileId = schemaImageId
        } else {
            apiData.redFileId = schemeModel.model[this.index].redFileId
        }

        if (this.saveIMageScheme.green) {
            const formData = new FormData();
            formData.append("File", this.saveIMageScheme.green);

            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            const schemaImageId = result.id;
            apiData.greenFileId = schemaImageId
            schemeModel.model[this.index].greenFileId = schemaImageId
        } else {
            apiData.greenFileId = schemeModel.model[this.index].greenFileId
        }

        await updateSchemaCoordinatesCreate(apiData).then((res) => {
            if (res.data) {
                toast.success("Компонент обнавлён", { progressStyle: { background: "green" } })
            }
        })
    }

    async deleteSchemeObject() {
        await deleteSchemaCoordinates({ id: schemeModel.focusSchemeObject }).then((res) => {
            toast.success("Компонент удалён", { progressStyle: { background: "green" } })
            schemeModel.model.splice(this.index, 1)
            schemeModel.setSchemeObjectData(0)
        })
    }

    init() {
        this.isLoading = true
        this.preview = { default: null, red: null, green: null }
        this.saveIMageScheme = { default: null, red: null, green: null }

        this.index = schemeModel.model.findIndex(item => item.id === schemeModel.focusSchemeObjectData?.id)
        this.isLoading = false
    }
}

export const schemeObjectModel = new SchemeObjectModel()