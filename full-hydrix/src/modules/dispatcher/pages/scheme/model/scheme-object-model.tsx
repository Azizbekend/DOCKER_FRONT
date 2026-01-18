import { SchemaCoordinatesCreateType, SchemaObjectType } from "@/packages/entities/hardware/type-general"
import { makeAutoObservable } from "mobx"
import { ChangeEvent } from "react"
import { schemeModel } from "./scheme-model"

import { deleteSchemaCoordinates, schemaCreate, updateSchemaCoordinatesCreate } from "@/packages/entities/hardware/api-general"
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

        const currentScheme = schemeModel.model[this.index];

        const apiData: SchemaCoordinatesCreateType = {
            id: currentScheme.id,
            newSchemeId: currentScheme.hardwareSchemaId,
            top: currentScheme.top,
            left: currentScheme.left,
            height: currentScheme.height,
            width: currentScheme.width,
            fileId: currentScheme.fileId,
            redFileId: currentScheme.redFileId,
            greenFileId: currentScheme.greenFileId,
        };

        try {
            if (this.saveIMageScheme.default) {
                const id = await this.uploadImage(this.saveIMageScheme.default);
                apiData.fileId = id;
                currentScheme.fileId = id;
            }

            if (this.saveIMageScheme.red) {
                const id = await this.uploadImage(this.saveIMageScheme.red);
                apiData.redFileId = id;
                currentScheme.redFileId = id;
            }

            if (this.saveIMageScheme.green) {
                const id = await this.uploadImage(this.saveIMageScheme.green);
                apiData.greenFileId = id;
                currentScheme.greenFileId = id;
            }

            const res = await updateSchemaCoordinatesCreate(apiData);

            if (res?.data) {
                toast.success("Компонент обновлён", {
                    progressStyle: { background: "green" },
                });
            }
        } catch (error) {
            console.error("Ошибка обновления схемы:", error);
            toast.error("Ошибка при обновлении компонента");
        }
    }

    async uploadImage(file: File) {
        const formData = new FormData();
        formData.append("File", file);

        const response = await fetch(
            "https://triapi.ru/research/api/FileStorage/images/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await response.json();
        return result.id;
    };


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