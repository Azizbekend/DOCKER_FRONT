import { CharacteristicsCreateInterface, EquipmentCreateInterface, SchemaModelInterface } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { Characteristic } from "../components/characteristic/type";
import { createCharacteristic, createDocuments, createHardware, createManyCommand, createManyInfo, createOndeCommand, createOndeInfo, deleteCharacteristiс, deleteCommandApi, deleteDocuments, deleteInfoHardware, Documents, getAllHardware, getCharacteristicAll, getCommandAll, getCommandAllInfo, getDocuments, getInfoHardware, getServiceApi, manyCharacteristic, schemaCoordinatesCreate, schemaCreate, updateInfoHardware } from "@/entities/hardware/api";
import { toast } from "react-toastify";
import { ControlType, ControlTypeCreate, ServiceTypeCreate } from "../components/control/type";
import { constructNow, isValid } from "date-fns";
import { ServiceType } from "../components/service/type";
import { StreamControllerConfig } from "hls.js";

class EquipmentCreateModel {

    imgPreview: string = "";
    saveIMage: File | null = null;

    model: EquipmentCreateInterface = {
        name: "",
        fileId: "",
        category: "",
        model: "",
        supplierName: "",
        developerName: "",
        position: "",
    }

    schemaModel: SchemaModelInterface = {
        top: "",
        left: "",
        hieght: "",
        width: "",
        hardwareSchemaId: 0,
    }

    listController: ControlType[] = [];
    listCharacters: Characteristic[] = [];

    listDocuments: Documents[] = [];

    isLoading = false;
    preview: string = "";

    saveIMageScheme: File | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setTop(value: string) {
        this.schemaModel.top = value
    }

    setLeft(value: string) {
        this.schemaModel.left = value
    }

    setHardwareSchemaId(value: number) {
        this.schemaModel.hardwareSchemaId = value
    }

    setHieght(value: string) {
        this.schemaModel.hieght = value
    }

    setWidth(value: string) {
        this.schemaModel.width = value
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
        this.model.supplierName = value;
    }
    setManufacturer(value: string) {
        this.model.developerName = value;
    }
    setPosition(value: string) {
        this.model.position = value;
    }

    setOpcName(value: string) {
        this.model.opcDescription = value;
    }
    setIdBlockController(value: number) {
        this.model.controlBlockId = value;
    }

    clear() {
        this.model = {
            id: undefined,
            name: "",
            fileId: "",
            category: "",
            model: "",
            supplierName: "",
            developerName: "",
            position: "",
            opcDescription: "",
            controlBlockId: 5,
        };

        this.schemaModel = {
            top: "",
            left: "",
            hieght: "",
            width: "",
            hardwareSchemaId: 0,
        }

        this.saveIMage = null;
        this.imgPreview = "";
    }

    async init(id: number) {
        this.isLoading = true;
        try {
            const [info, commands, commandsInfo, characteristics, docs] = await Promise.all([
                getInfoHardware({ id }),
                getCommandAll({ id }),
                getCommandAllInfo({ id }),
                getCharacteristicAll({ id }),
                getDocuments({ id })
            ]);

            this.model = info.data;
            this.listController = commands.data;
            this.listController = [... this.listController, commandsInfo.data];
            this.listCharacters = characteristics.data;
            this.listDocuments = docs.data;
        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        } finally {
            this.isLoading = false;
        }
    }

    async create() {
        const formData = new FormData();
        formData.append("File", this.saveIMage);


        // const response = await fetch("http://hydrig.gsurso.ru/image/upload", {
        const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
            method: "POST",
            body: formData
        });


        const result = await response.json();

        this.model.fileId = result.id;


        await createHardware({
            name: this.model.name,
            category: this.model.category,
            developerName: this.model.developerName,
            supplierName: this.model.supplierName,
            photoName: "ni",
            fileId: this.model.fileId,
            position: this.model.position,
            opcDescription: this.model.opcDescription,
            model: this.model.model,
            controlBlockId: this.model.controlBlockId,
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

    async createCharacteristicOne(characteristics: Characteristic) {
        if (this.model.id == 0 || this.model.id == null) return

        await createCharacteristic({
            hardwareId: this.model.id,
            name: characteristics.name,
            value: characteristics.value
        }).then((resa) => {
            toast.success("Характеристики добавлены", { progressStyle: { background: "green" } })
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

    async createControlOne(controls: ControlType) {
        if (this.model.id == 0 || this.model.id == null) return

        if (controls.isInfo) {
            await createOndeInfo({
                hardwareId: this.model.id,
                name: controls.name,
                mesurement: controls.mesurement,
                plcNodeid: controls.plcNodeid,
                isValue: controls.isValue,
            }).then((resa) => {
                console.log(resa.data)
                toast.success("Управления добавлены Инфо", { progressStyle: { background: "green" } })
            })
        } else {
            await createOndeCommand({
                hardwareId: this.model.id,
                name: controls.name,
                mesurement: controls.mesurement,
                plcNodeid: controls.plcNodeid,
                isValue: controls.isValue,
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

        const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
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
                hardwareSchemaId: this.schemaModel.hardwareSchemaId,
                fileId: schemaImageId,
                hardwareId: this.model?.id
            }).then((res) => {
                if (res.data) {
                    toast.success("Схема создана", { progressStyle: { background: "green" } })
                }
            })
        }
    }

    async createDocument(data: Documents) {
        try {
            const formData = new FormData();
            formData.append("Title", data.title);
            formData.append("File", data.file);
            formData.append("HardwareId", this.model.id);

            const response = await fetch("https://triapi.ru/research/api/FileStorage/documents/upload", {
                method: "POST",
                body: formData
            })

            this.listDocuments = this.listDocuments.filter(item => item.id !== Number(id))
            toast.success("Документ добавлен", { progressStyle: { background: "green" } })

        } catch (error) {
            toast.success("Ошибка при добавлении документа", { progressStyle: { background: "red" } })
        }
    }


    async updateInfo() {
        if (this.model.id) {

            if (this.saveIMage) {
                const formData = new FormData();
                formData.append("File", this.saveIMage);

                const response = await fetch("https://triapi.ru/research/api/FileStorage/images/upload", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                console.log(result.id)
                this.model.fileId = result.id;
            }


            await updateInfoHardware({
                id: this.model.id,
                name: this.model.name,
                category: this.model.category,
                developerName: this.model.developerName,
                supplierName: this.model.supplierName,
                fileId: this.model.fileId,
                position: this.model.position,
                opcDescription: this.model.opcDescription,
                model: this.model.model,
            }).then((res) => {
                toast.success("Оборудование обновлено", { progressStyle: { background: "green" } })
            })


        }
    }

    async deleteHardware({ id, navigate }: { id: number, navigate: () => void }) {
        await deleteInfoHardware({ id: id }).then(() => {
            toast.success("Оборудование удалено", { progressStyle: { background: "green" } })
            navigate();
        })
    }

    async deleteCharacter(id: string) {
        await deleteCharacteristiс({ id: Number(id) }).then(() => {
            toast.success("Характеристика удалена", { progressStyle: { background: "green" } })
        })
    }

    async deleteCommand(id: string) {
        await deleteCommandApi({ id: Number(id) }).then(() => {
            this.listController = this.listController.filter(item => item.id !== Number(id))
            toast.success("Управление удалена", { progressStyle: { background: "green" } })
        })
    }
}

export const equipmentCreateModel = new EquipmentCreateModel();