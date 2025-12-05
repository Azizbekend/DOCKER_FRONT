import { CharacteristicsCreateInterface, EquipmentCreateInterface } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { Characteristic } from "../components/characteristic/type";
import { createHardware, createManyCommand, createManyInfo, createOndeInfo, getAllHardware, getInfoHardware, manyCharacteristic, schemaCoordinatesCreate, schemaCreate } from "@/entities/hardware/api";
import { toast } from "react-toastify";
import { ControlType, ControlTypeCreate, ServiceTypeCreate } from "../components/control/type";
import { isValid } from "date-fns";
import { ServiceType } from "../components/service/type";

class EquipmentCreateModel {

    imgPreview: string = "";
    saveIMage: File | null = null;
    model: EquipmentCreateInterface = {
        name: "",
        img: "",
        category: "",
        model: "",
        supplier: "",
        manufacturer: "",
        position: "",

    }


    top: string = ""
    left: string = ""
    hieght: string = ""
    width: string = ""
    preview: string = ""
    hardwareSchemaId: number = 0
    saveIMageScheme: File | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setTop(value: string) {
        this.top = value
    }

    setLeft(value: string) {
        this.left = value
    }

    setHardwareSchemaId(value: number) {
        this.hardwareSchemaId = value
    }

    setHieght(value: string) {
        this.hieght = value
    }

    setWidth(value: string) {
        this.width = value
    }

    setSaveIMage(e: ChangeEvent<HTMLInputElement>) {
        this.saveIMageScheme = e.target.files && e.target?.files[0]
        if (this.saveIMageScheme) this.preview = URL.createObjectURL(this.saveIMageScheme);
    }

    setId(value: number | string) {
        if (value == "") {
            this.model.id = undefined;
        } else {
            this.model.id = Number(value);
        }
    }

    setName(value: string) {
        this.model.name = value;
    }

    setImg(e: ChangeEvent<HTMLInputElement>) {
        this.saveIMage = e.target.files && e.target?.files[0]
        this.imgPreview = URL.createObjectURL(this.saveIMage);
    }

    setCategory(value: string) {
        this.model.category = value;
    }

    setModel(value: string) {
        this.model.model = value;
    }

    setSupplier(value: string) {
        this.model.supplier = value;
    }

    setManufacturer(value: string) {
        this.model.manufacturer = value;
    }

    setPosition(value: string) {
        this.model.position = value;
    }

    setOpcName(value: string) {
        this.model.opcName = value;
    }
    setIdBlockController(value: number) {
        this.model.idBlockController = value;
    }

    clear() {
        this.model = {
            name: "",
            img: "",
            category: "",
            model: "",
            supplier: "",
            manufacturer: "",
            position: "",
        };
        this.saveIMage = null;
        this.imgPreview = "";
    }

    async create() {
        const formData = new FormData();
        formData.append("File", this.saveIMage);

        // const response = await fetch("http://hydrig.gsurso.ru/image/upload", {
        const response = await fetch("https://triapi.ru/research/api/FileStorage/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        console.log(result.id)
        this.model.img = result.id;

        await createHardware({
            name: this.model.name,
            category: this.model.category,
            developerName: this.model.manufacturer,
            supplierName: this.model.supplier,
            photoName: "ni",
            fileId: this.model.img,
            position: this.model.position,
            opcDescription: this.model.opcName,
            model: this.model.model,
            controlBlockId: this.model.idBlockController,

        }).then((res) => {
            this.model.id = res.data
            toast.success("Оборудование создано", { progressStyle: { background: "green" } })
        })
    }

    async createCharacteristic(characteristics: Characteristic[]) {
        let data: CharacteristicsCreateInterface[] = [];

        if (this.model.id == 0 || this.model.id == null) return

        for (let i = 0; i < characteristics.length; i++) {
            data[i] = {
                hardwareId: this.model.id,
                name: characteristics[i].name,
                value: characteristics[i].value
            };
        }
        await manyCharacteristic({
            hardwareId: this.model.id,
            characteristics: data
        }).then((resa) => {
            toast.success("Характеристики добавлены", { progressStyle: { background: "green" } })
            console.log(resa.data)
        })
    }

    async createControl(controls: ControlType[]) {
        let dataInfo: ControlTypeCreate[] = [];
        let dataCommand: ControlTypeCreate[] = [];

        if (this.model.id == 0 || this.model.id == null) return

        console.log(controls)


        for (let i = 0, j = 0; (i < controls.length && controls[i].isInfo); i++) {
            dataInfo[j] = {
                hardwareId: this.model.id,
                name: controls[j].name,
                mesurement: controls[j].mesurement,
                plcNodeid: controls[j].plcNodeid,
                isValue: controls[j].isValue,
            };

            j++;
        }

        for (let i = 0, j = 0; (i < controls.length && !controls[i].isInfo); i++) {
            dataCommand[j] = {
                hardwareId: this.model.id,
                name: controls[j].name,
                mesurement: controls[j].mesurement,
                plcNodeid: controls[j].plcNodeid,
                isValue: controls[j].isValue,
            };

            j++;
        }


        // console.log(dataCommand, dataInfo)

        if (dataInfo.length > 0) {
            await createManyInfo({
                hardwareId: this.model.id,
                nodes: dataInfo
            }).then((resa) => {
                console.log(resa.data)
                toast.success("Управления добавлены Инфо", { progressStyle: { background: "green" } })
            })
        }

        if (dataCommand.length > 0) {
            await createManyCommand({
                hardwareId: this.model.id,
                nodes: dataCommand
            }).then((resa) => {
                console.log(resa.data)
                toast.success("Управления добавлены команды", { progressStyle: { background: "green" } })
            })
        }
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

        if (this.model.id) {
            await schemaCoordinatesCreate({
                top: data.top.toString(),
                left: data.left.toString(),
                height: data.hieght.toString(),
                width: data.width.toString(),
                hardwareSchemaId: this.hardwareSchemaId,
                fileId: schemaImageId,
                hardwareId: this.model?.id
            }).then((res) => {
                if (res.data) {
                    toast.success("Схема создана", { progressStyle: { background: "green" } })
                }
            })
        }
    }

    async init(id: number) {
        await getInfoHardware({ id: id }).then((res) => {
            this.model = res.data
        })
    }
}

export const equipmentCreateModel = new EquipmentCreateModel();