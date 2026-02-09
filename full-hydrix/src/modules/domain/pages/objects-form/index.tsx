// ObjectsForm.tsx
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createObjectModel } from './models/create-model';
import { BasicInfoSection } from '../../widgets/object-passport-form/BasicInfoSection';
import { CoordinatesSection } from '../../widgets/object-passport-form/CoordinatesSection';
import { ParametersSection } from '../../widgets/object-passport-form/ParametersSection';
import { DescriptionSection } from '../../widgets/object-passport-form/DescriptionSection';
import { Icon } from '@/packages/shared-ui/icon';
import { Button } from '@/packages/shared-ui/button/button';

export const ObjectsForm = observer(() => {
    const {
        model,
        setName,
        setAdress,
        setOperatingOrganization,
        setCustomerName,
        setGeneralContractorName,
        setLatitude,
        setLongitude,
        setProjectEfficiency,
        setHourEfficiency,
        setPowerConsump,
        setWaterConsump,
        setWetExcessSludge,
        setDryExcessSludge,
        setTrash,
        setPeskoPulpa,
        setAquaPack30,
        setAquaFlock650,
        setUfoAcid,
        setMbrAcid,
        setGypochloride,
        setObjectDiscription,
        setImg,
        setImgDiscription,
        imgPreview,
        imgPreviewDiscription,
        clear,
        createObject
    } = createObjectModel;

    useEffect(() => {
        clear();
    }, []);

    const formFieldsFace = [
        { key: 'name', label: 'Название', setter: setName, type: 'text', width: '1fr' as const },
        { key: 'address', label: 'Адрес', setter: setAdress, type: 'text', width: '1fr' as const },
        { key: 'operatingOrganization', label: 'Эксплуатирующая организация', setter: setOperatingOrganization, type: 'text', width: '1fr' as const },
        { key: 'customerName', label: 'Заказчик', setter: setCustomerName, type: 'text', width: '1fr' as const },
        { key: 'generalContractorName', label: 'Генеральный подрядчик', setter: setGeneralContractorName, type: 'text', width: '1fr' as const },
    ] as const;

    const formFieldsCoordinate = [
        { key: 'latitude', label: 'Широта', setter: setLatitude, type: 'text', width: '0.5fr' as const },
        { key: 'longitude', label: 'Долгота', setter: setLongitude, type: 'text', width: '0.5fr' as const },
    ] as const;

    const technicalParameters = [
        { key: 'projectEfficiency', label: 'Проектная производительность', setter: setProjectEfficiency, type: 'number', width: '0.5fr' as const },
        { key: 'hourEfficiency', label: 'Часовая производительность', setter: setHourEfficiency, type: 'number', width: '0.5fr' as const },
        { key: 'powerConsump', label: 'Электроэнергия', setter: setPowerConsump, type: 'number', width: '0.5fr' as const },
        { key: 'waterConsump', label: 'Водоснабжение', setter: setWaterConsump, type: 'number', width: '0.5fr' as const },
    ] as const;

    const reagents = [
        { key: 'aquaPack30', label: 'Коагулянт Аквапак 30', setter: setAquaPack30, type: 'number', width: '0.5fr' as const },
        { key: 'aquaFlock650', label: 'Флокулянт Аквафлок 650', setter: setAquaFlock650, type: 'number', width: '0.5fr' as const },
        { key: 'ufoAcid', label: 'Щавелевая кислота (Промывка ламп УФО)', setter: setUfoAcid, type: 'number', width: '0.5fr' as const },
        { key: 'mbrAcid', label: 'Щавелевая кислота (Хим.промывка МБР)', setter: setMbrAcid, type: 'number', width: '0.5fr' as const },
        { key: 'gypochloride', label: 'Гипохлорит натрия ГОСТ 11086-76 марка А', setter: setGypochloride, type: 'number', width: '0.5fr' as const },
    ] as const;

    const wasteOutputs = [
        { key: 'wetExcessSludge', label: 'Избыточный активный ил (Влажный)', setter: setWetExcessSludge, type: 'number', width: '0.5fr' as const },
        { key: 'dryExcessSludge', label: 'Избыточный активный ил (Обезвоженный)', setter: setDryExcessSludge, type: 'number', width: '0.5fr' as const },
        { key: 'trash', label: 'Отбросы', setter: setTrash, type: 'number', width: '0.5fr' as const },
        { key: 'peskoPulpa', label: 'Пескопульпа', setter: setPeskoPulpa, type: 'number', width: '0.5fr' as const },
    ] as const;

    return (
        <div className="bg-white p-5 rounded-lg">
            <div className="flex gap-x-[20px] gap-y-[10px] w-full">
                <label className="w-[50%] h-[350px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                    <input className="hidden" type="file" onChange={(e) => setImg(e)} />
                    {imgPreview ? (
                        <img src={imgPreview} className="p-5 max-w-full max-h-full object-contain" />
                    ) : (
                        <>
                            <Icon systemName="file-plus-blue" />
                            <span className="text-[var(--clr-accent)] font-semibold">Загрузить фото</span>
                        </>
                    )}
                </label>

                <div className="space-y-4 w-full">
                    <BasicInfoSection fields={formFieldsFace} model={model} />
                    <CoordinatesSection fields={formFieldsCoordinate} model={model} />
                </div>
            </div>

            <ParametersSection title="Технические параметры" fields={technicalParameters} model={model} columns={4} />
            <ParametersSection title="Реагенты" fields={reagents} model={model} columns={5} />
            <ParametersSection title="Отходы" fields={wasteOutputs} model={model} columns={4} />

            <DescriptionSection
                imgPreview={imgPreview}
                imgPreviewDiscription={imgPreviewDiscription}
                setImg={setImg}
                setImgDiscription={setImgDiscription}
                description={model.objectDiscription}
                setDescription={setObjectDiscription}
            />

            <Button styleColor='blue' onClick={createObject} class='px-20 py-5 text-lg'>
                Создать
            </Button >
        </div>
    );
});
