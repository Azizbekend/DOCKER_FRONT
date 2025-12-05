import { SchemaObjectType } from "@/entities/hardware/type"
import { makeAutoObservable } from "mobx"
import { ChangeEvent } from "react"
import { schemeModel } from "./scheme-model"

class SchemeObjectModel {

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
        if (schemeModel.focusSchemeObjectData) schemeModel.focusSchemeObjectData.top = value
    }

    setLeft(value: string) {
        if (schemeModel.focusSchemeObjectData) schemeModel.focusSchemeObjectData.left = value
    }

    setHardwareSchemaId(value: number) {
        if (schemeModel.focusSchemeObjectData) schemeModel.focusSchemeObjectData.hardwareSchemaId = value
    }

    setHeight(value: string) {
        if (schemeModel.focusSchemeObjectData) schemeModel.focusSchemeObjectData.height = value
    }

    setWidth(value: string) {
        if (schemeModel.focusSchemeObjectData) schemeModel.focusSchemeObjectData.width = value
    }

    setSaveIMage(e: ChangeEvent<HTMLInputElement>) {
        this.saveIMageScheme = e.target.files && e.target?.files[0]
        if (this.saveIMageScheme) this.preview = URL.createObjectURL(this.saveIMageScheme);
    }

    async createScheme(data: {
        top: number,
        left: number,
        hieght: number,
        width: number,
        saveIMage: File,
    }) {
        const formData = new FormData();
        formData.append("File", data.saveIMage);

        const response = await fetch("https://triapi.ru/research/api/FileStorage/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        console.log(result.id)
        const schemaImageId = result.id;


    }

    init(focusSchemeObjectData: SchemaObjectType) {
        this.top = focusSchemeObjectData.top
        this.left = focusSchemeObjectData.left
        this.height = focusSchemeObjectData.height
        this.width = focusSchemeObjectData.width
        this.hardwareSchemaId = focusSchemeObjectData.hardwareSchemaId
    }
}

export const schemeObjectModel = new SchemeObjectModel()