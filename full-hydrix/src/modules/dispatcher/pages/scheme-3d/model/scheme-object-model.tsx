import { SchemaCoordinatesCreateType, SchemaObjectType } from "@/entities/hardware/type"
import { makeAutoObservable } from "mobx"
import { ChangeEvent } from "react"
import { schemeModel } from "./scheme-model"

import { deleteSchemaCoordinates, updateSchemaCoordinatesCreate } from "@/entities/hardware/api"
import { toast } from "react-toastify"

class SchemeObjectModel {


    isLoading: boolean = true
    index: number = 0

    top: string = ""
    left: string = ""
    height: string = ""
    width: string = ""
    preview: string = ""
    hardwareSchemaId: number = 0
    saveIMageScheme: File | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setTop(value: string) {
        schemeModel.model[this.index].top = value
        this.top = value
    }

    setLeft(value: string) {
        schemeModel.model[this.index].left = value
        this.left = value
    }
    setHeight(value: string) {
        schemeModel.model[this.index].height = value
        this.height = value
    }

    setWidth(value: string) {
        schemeModel.model[this.index].width = value
        this.width = value
    }

    setHardwareSchemaId(value: number) {
        schemeModel.model[this.index].hardwareSchemaId = value
    }


    setSaveIMage(e: ChangeEvent<HTMLInputElement>) {
        this.saveIMageScheme = e.target.files && e.target?.files[0]
        if (this.saveIMageScheme) this.preview = URL.createObjectURL(this.saveIMageScheme);
    }

    async updateScheme(data: {
        top: number,
        left: number,
        hieght: number,
        width: number,
        saveIMage: File,
    }) {

        const apiData: SchemaCoordinatesCreateType = {
            top: data.top.toString(),
            left: data.left.toString(),
            height: data.hieght.toString(),
            width: data.width.toString(),
        }

        if (data.saveIMage) {
            const formData = new FormData();
            formData.append("File", data.saveIMage);

            const response = await fetch("https://triapi.ru/research/api/FileStorage/upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            console.log(result.id)
            const schemaImageId = result.id;
            apiData.fileId = schemaImageId
        }

        schemeModel.model[this.index].top = this.top
        schemeModel.model[this.index].left = this.left
        schemeModel.model[this.index].height = this.height
        schemeModel.model[this.index].width = this.width
        if (apiData.fileId) schemeModel.model[this.index].fileId = apiData.fileId

        await updateSchemaCoordinatesCreate(apiData).then((res) => {
            if (res.data) {
                toast.success("Компонент обнавлён", { progressStyle: { background: "green" } })
            }
        })
    }

    async deleteSchemeObject() {
        toast.success("Компонент удалён", { progressStyle: { background: "green" } })
        schemeModel.model.splice(this.index, 1)
        schemeModel.setFocusSchemeObject(0)

        // await deleteSchemaCoordinates({ id: schemeModel.focusSchemeObject }).then((res) => {
        //  })
    }

    init(focusSchemeObjectData: SchemaObjectType) {
        this.index = schemeModel.model.findIndex(item => item.id === schemeModel.focusSchemeObjectData?.id)

        this.isLoading = true

        this.top = focusSchemeObjectData.top
        this.left = focusSchemeObjectData.left
        this.height = focusSchemeObjectData.height
        this.width = focusSchemeObjectData.width
        this.hardwareSchemaId = focusSchemeObjectData.hardwareSchemaId

        this.isLoading = false
    }
}

export const schemeObjectModel = new SchemeObjectModel()