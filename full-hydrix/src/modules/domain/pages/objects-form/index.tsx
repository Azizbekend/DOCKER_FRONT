import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createObjectModel } from './models/create-model';
import { Input } from '@/packages/shared-ui/Inputs/input-text';

export const ObjectsForm = observer(() => {

    // const { model, setAdress, setOperatingOrganization, setCustomerName, setGeneralContractorName, setProjectEfficiency,
    //     setLatitude, setLongitude, setName, setHourEfficiency, setPowerConsump, setWaterConsump, setWetExcessSludge, setDryExcessSludge,
    //     setTrash, setPeskoPulpa, setAquaPack30, setAquaFlock650, setUfoAcid, setMbrAcid, setGypochloride, setObjectDiscription, setImg, clear, createObject } = createObjectModel

    // useEffect(() => { clear() }, [])

    // const formFields = [
    //     { key: 'adress', label: 'Название', setter: setAdress, half: true },
    //     { key: 'name', label: 'Название', setter: setOperatingOrganization, half: true },
    //     { key: 'operatingOrganization', label: 'Адрес', setter: setCustomerName },
    //     { key: 'customerName', label: 'Адрес', setter: setGeneralContractorName },
    //     { key: 'generalContractorName', label: 'Адрес', setter: setProjectEfficiency },
    //     { key: 'projectEfficiency', label: 'Адрес', setter: setLatitude },
    //     { key: 'hourEfficiency', label: 'Адрес', setter: setLongitude },
    //     { key: 'powerConsump', label: 'Адрес', setter: setName },
    //     { key: 'waterConsump', label: 'Название', setter: setHourEfficiency, half: true },
    //     { key: 'latitude', label: 'Адрес', setter: setPowerConsump },
    //     { key: 'longitude', label: 'Адрес', setter: setWaterConsump },
    //     { key: 'wetExcessSludge', label: 'Адрес', setter: setWetExcessSludge },
    //     { key: 'dryExcessSludge', label: 'Адрес', setter: setDryExcessSludge },
    //     { key: 'trash', label: 'Адрес', setter: setTrash },
    //     { key: 'peskoPulpa', label: 'Адрес', setter: setPeskoPulpa },
    //     { key: 'aquaPack30', label: 'Название', setter: setAquaPack30, half: true },
    //     { key: 'aquaFlock650', label: 'Адрес', setter: setAquaFlock650 },
    //     { key: 'ufoAcid', label: 'Адрес', setter: setUfoAcid },
    //     { key: 'mbrAcid', label: 'Адрес', setter: setMbrAcid },
    //     { key: 'gypochloride', label: 'Адрес', setter: setGypochloride },
    //     { key: 'objectDiscription', label: 'Адрес', setter: setObjectDiscription },
    // ] as const;

    // const fieldConfigs: FieldConfig[] = [
    //     { label: 'Адрес', type: 'text', placeholder: 'Введите адрес', required: true },
    //     { label: 'Название', type: 'text', placeholder: 'Введите название', required: true, halfWidth: true },
    //     { label: 'Эксплуатирующая организация', type: 'text', placeholder: 'Введите название организации', required: true },
    //     { label: 'Заказчик', type: 'text', placeholder: 'Введите заказчика', required: true, halfWidth: true },
    //     { label: 'Генеральный подрядчик', type: 'text', placeholder: 'Введите подрядчика', required: true },
    //     { label: 'Проектная эффективность', type: 'number', placeholder: '0', required: true, halfWidth: true },
    //     { label: 'Часовая эффективность', type: 'number', placeholder: '0', required: true, halfWidth: true },
    //     { label: 'Потребление электроэнергии', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'Потребление воды', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'Широта', type: 'text', placeholder: 'Введите широту', required: true, halfWidth: true },
    //     { label: 'Долгота', type: 'text', placeholder: 'Введите долготу', required: true, halfWidth: true },
    //     { label: 'Влажный избыточный ил', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'Сухой избыточный ил', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'Мусор', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'Песко-пульпа', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'AquaPack 30', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'AquaFlock 650', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'UFO Acid', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'MBR Acid', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'Гипохлорид', type: 'number', placeholder: '0', halfWidth: true },
    //     { label: 'Описание объекта', type: 'textarea', placeholder: 'Введите описание', required: true },
    // ];



    return (
        <div className='bg-white p-5 rounded-lg'>
            {/* <div className="flex flex-wrap  gap-x-[20px] gap-y-[10px]">
                <InputContainer
                    headerText="Left"
                    classNames={{
                        wrapper: "w-[calc(50%_-_20px)]"
                    }}
                    children={
                        <Input
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            type="text"
                            placeholder="Left"
                            value={model.name}
                            onChange={setName}
                        />
                    }
                />
                <InputContainer
                    headerText="Left"
                    classNames={{
                        wrapper: "w-[calc(50%_-_20px)]"
                    }}
                    children={
                        <Input
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            type="text"
                            placeholder="Left"
                            value={model.operatingOrganization}
                            onChange={setOperatingOrganization}
                        />
                    }
                />
                <InputContainer
                    headerText="Left"
                    classNames={{
                        wrapper: "w-[calc(50%_-_20px)]"
                    }}
                    children={
                        <Input
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            type="text"
                            placeholder="Left"
                            value={model.customerName}
                            onChange={setCustomerName}
                        />
                    }
                />
                <InputContainer
                    headerText="Left"
                    classNames={{
                        wrapper: "w-[calc(50%_-_20px)]"
                    }}
                    children={
                        <Input
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            type="text"
                            placeholder="Left"
                            value={model.generalContractorName}
                            onChange={setGeneralContractorName}
                        />
                    }
                />
                <InputContainer
                    headerText="Left"
                    classNames={{
                        wrapper: "w-[calc(50%_-_20px)]"
                    }}
                    children={
                        <Input
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            type="number"
                            placeholder="Left"
                            value={model.projectEfficiency}
                            onChange={setProjectEfficiency}
                        />
                    }
                />
            </div> */}
        </div>
    );
});