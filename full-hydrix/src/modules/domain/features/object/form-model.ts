import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { PassportDataType } from "@/packages/entities/object/type";
import { getOneData, objectCreate, objectUpdate } from "@/packages/entities/object/api";
import { ObjectStages } from "@/packages/entities/object/config";



class FormObjectModel {
    model: PassportDataType = {
        adress: "г. Казань, Советский район",
        operatingOrganization: "ООО \"Экспо\"",
        customerName: "ООО \"Заказчик\"",
        generalContractorName: "ООО \"Гена\"",
        projectEfficiency: 10000,
        latitude: "50.2",
        longitude: "40.5",
        name: "Тестовый объект",
        fileId: 0,
        hourEfficiency: 250,
        powerConsump: 250,
        waterConsump: 250,
        wetExcessSludge: 250,
        dryExcessSludge: 250,
        trash: 250,
        peskoPulpa: 250,
        aquaPack30: 250,
        aquaFlock650: 250,
        ufoAcid: 250,
        mbrAcid: 250,
        gypochloride: 250,
        objectDiscription: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo aut beatae dolores porro? Possimus iste minus aspernatur fugiat tenetur ipsa, magni incidunt veritatis labore, nesciunt vitae, ad quis quod.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo aut beatae dolores porro? Possimus iste minus aspernatur fugiat tenetur ipsa, magni incidunt veritatis labore, nesciunt vitae, ad quis quod.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo aut beatae dolores porro? Possimus iste minus aspernatur fugiat tenetur ipsa, magni incidunt veritatis labore, nesciunt vitae, ad quis quod.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo aut beatae dolores porro? Possimus iste minus aspernatur fugiat tenetur ipsa, magni incidunt veritatis labore, nesciunt vitae, ad quis quod.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo aut beatae dolores porro? Possimus iste minus aspernatur fugiat tenetur ipsa, magni incidunt veritatis labore, nesciunt vitae, ad quis quod.
      `,
        objectDiscriptionFileId: 0,
        stage: ObjectStages.Construction,
        commissioningDate: null,
    }

    imgPreview: string = "";
    saveIMage: File | null = null;

    imgPreviewDiscription: string = "";
    saveIMageDiscription: File | null = null;


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setAdress(value: string) {
        this.model.adress = value
    }
    setOperatingOrganization(value: string) {
        this.model.operatingOrganization = value
    }
    setCustomerName(value: string) {
        this.model.customerName = value
    }
    setGeneralContractorName(value: string) {
        this.model.generalContractorName = value
    }
    setProjectEfficiency(value: number) {
        this.model.projectEfficiency = value
    }
    setLatitude(value: string) {
        this.model.latitude = value
    }
    setLongitude(value: string) {
        this.model.longitude = value
    }
    setName(value: string) {
        this.model.name = value
    }
    setHourEfficiency(value: number) {
        this.model.hourEfficiency = value
    }
    setPowerConsump(value: number) {
        this.model.powerConsump = value
    }
    setWaterConsump(value: number) {
        this.model.waterConsump = value
    }
    setWetExcessSludge(value: number) {
        this.model.wetExcessSludge = value
    }
    setDryExcessSludge(value: number) {
        this.model.dryExcessSludge = value
    }
    setTrash(value: number) {
        this.model.trash = value
    }
    setPeskoPulpa(value: number) {
        this.model.peskoPulpa = value
    }
    setAquaPack30(value: number) {
        this.model.aquaPack30 = value
    }
    setAquaFlock650(value: number) {
        this.model.aquaFlock650 = value
    }
    setUfoAcid(value: number) {
        this.model.ufoAcid = value
    }
    setMbrAcid(value: number) {
        this.model.mbrAcid = value
    }
    setGypochloride(value: number) {
        this.model.gypochloride = value
    }
    setObjectDiscription(value: string) {
        this.model.objectDiscription = value
    }
    setStage(value: ObjectStages) {
        this.model.stage = value
    }
    setCommissioningDate(value: Date) {
        console.log(value)
        this.model.commissioningDate = value
    }

    setImg(e: ChangeEvent<HTMLInputElement>) {
        this.saveIMage = e.target.files && e.target?.files[0]
        this.imgPreview = URL.createObjectURL(this.saveIMage);
    }

    setImgDiscription(e: ChangeEvent<HTMLInputElement>) {
        this.saveIMageDiscription = e.target.files && e.target?.files[0]
        this.imgPreviewDiscription = URL.createObjectURL(this.saveIMageDiscription);
    }


    clear() {
        this.model = {
            adress: "",
            operatingOrganization: "",
            customerName: "",
            generalContractorName: "",
            projectEfficiency: 0,
            latitude: "",
            longitude: "",
            name: "",
            fileId: 0,
            hourEfficiency: 0,
            powerConsump: 0,
            waterConsump: 0,
            wetExcessSludge: 0,
            dryExcessSludge: 0,
            trash: 0,
            peskoPulpa: 0,
            aquaPack30: 0,
            aquaFlock650: 0,
            ufoAcid: 0,
            mbrAcid: 0,
            gypochloride: 0,
            objectDiscription: "",
            objectDiscriptionFileId: 0,
            stage: ObjectStages.Construction,
            commissioningDate: null,
        }
    }

    isValid() {
        const model = this.model as { [key: string]: any };
        const keys = Object.keys(model);

        return keys.every(key => {
            const value = model[key];

            // if (key != "fileId"
            //     && key != "stage"
            //     && key != "dateCommissioning"
            // ) {
            // Более строгая проверка
            if (typeof value === 'string' && value.trim() === '') return false;
            if (typeof value === 'number' && isNaN(value)) return false;
            // }/

            return true;
        });
    }

    async createObject() {

        if (!this.isValid()) {
            toast.error("Заполните все обязательные поля")
            return
        }


        if (this.saveIMage !== null) {
            const formData = new FormData();
            formData.append("File", this.saveIMage);
            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            })
            const result = await response.json();
            this.model.fileId = result.id;
        }

        if (this.saveIMageDiscription !== null) {
            const formData = new FormData();
            formData.append("File", this.saveIMageDiscription);
            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            })
            const result = await response.json();
            this.model.objectDiscriptionFileId = result.id;
        }

        console.log(this.model)

        await objectCreate(this.model)
            .then((res) => {
                console.log(res.data)
                toast.success("Объект добавлен")
            })
            .catch((err) => {
                console.log(err.data)
                toast.error("Ошибка при добавлении")
            })

    }


    async update() {

        if (this.saveIMage !== null) {
            const formData = new FormData();
            formData.append("File", this.saveIMage);
            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            })
            const result = await response.json();
            this.model.fileId = result.id;
        }

        if (this.saveIMageDiscription !== null) {
            const formData = new FormData();
            formData.append("File", this.saveIMageDiscription);
            const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                method: "POST",
                body: formData
            })
            const result = await response.json();
            this.model.objectDiscriptionFileId = result.id;
        }

        console.log(this.model)

        const dateSave = this.model.commissioningDate
        this.model.commissioningDate = new Date(this.model.commissioningDate)

        await objectUpdate(this.model)
            .then((res) => {
                this.model.commissioningDate = dateSave
                console.log(res.data)
                toast.success("Объект обновлен")
            })
            .catch((error) => {
                console.log(error.data)
                toast.error("Ошибка при обновлении")
            })
    }

    async init(id: number) {
        await getOneData({ id: id })
            .then((res) => {
                console.log(res.data)
                this.model = { ...res.data }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const formObjectModel = new FormObjectModel()