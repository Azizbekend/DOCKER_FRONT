import { SchemaCoordinatesCreateType, SchemaObjectType } from "@/entities/hardware/type"
import { makeAutoObservable } from "mobx"
import { ChangeEvent } from "react"
import { schemeModel } from "./scheme-model"

import { deleteSchemaCoordinates, updateSchemaCoordinatesCreate } from "@/entities/hardware/api"
import { toast } from "react-toastify"

class SchemeObjectModel {


    isLoading: boolean = true
    index: number = 0

    preview: string = ""
    fileId: string = ""
    hardwareSchemaId: number = 0
    saveIMageScheme: File | null = null

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


    setSaveIMage(e: ChangeEvent<HTMLInputElement>) {
        this.saveIMageScheme = e.target.files && e.target?.files[0]
        if (this.saveIMageScheme) this.preview = URL.createObjectURL(this.saveIMageScheme);
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

        if (this.saveIMageScheme) {
            const formData = new FormData();
            formData.append("File", this.saveIMageScheme);

            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            const schemaImageId = result.id;
            apiData.fileId = schemaImageId
        } else {
            apiData.fileId = schemeModel.model[this.index].fileId
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
            schemeModel.setFocusSchemeObject(0)
        })
    }

    init(focusSchemeObjectData: SchemaObjectType) {
        this.isLoading = true
        this.index = schemeModel.model.findIndex(item => item.id === schemeModel.focusSchemeObjectData?.id)
        this.isLoading = false
    }
}

export const schemeObjectModel = new SchemeObjectModel()