import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createObjectModel } from './models/create-model';
import { Input } from '@/packages/shared-ui/Inputs/input-text';

export const ObjectsForm = observer(() => {

    const { model, setName, setLatitude, setLongitude, setAdress, setOperatingOrganization,
        setCustomerName, setGeneralContractorName, setProjectEfficiency, setFileId, clear, isValid, createObject } = createObjectModel

    useEffect(() => { clear() }, [])

    return (
        <div className='bg-white p-5 rounded-lg'>
            <div className="flex flex-wrap  gap-x-[20px] gap-y-[10px]">
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
            </div>
        </div>
    );
});