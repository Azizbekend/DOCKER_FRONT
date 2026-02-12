import { serviceStagesFormModel } from '@/modules/dispatcher/features/service-stage/models/form-model';
import { ServiceForStageCardInterface, ServiceStageType } from '@/packages/entities/service-requests/type';
import { useAuth } from '@/packages/entities/user/context';
import { getObjectId } from '@/packages/functions/get-data/get-object-data';
import { Button } from '@/packages/shared-ui/button/button';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { Textarea } from '@/packages/shared-ui/textarea';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { StageFileList } from './stage-file-list';



interface StageFormCreateProps {
    setIsOpenForm: (value: boolean) => void,
    pushStage: (data: ServiceStageType) => void
    serviceData: ServiceForStageCardInterface
}


export const StageFormCreate = observer(({
    setIsOpenForm,
    pushStage,
    serviceData,
}: StageFormCreateProps) => {

    const { user } = useAuth()

    const { model, init: formInit, setServiceId, setCreatorId,
        setRequiredCount, clear, setImplementerId, setDiscription,
        setStageType, create, companyList, getUserList, implementersCompaneId, userList,
        files, addFile, removeFile, setFileName } = serviceStagesFormModel

    useEffect(() => {
        formInit()
    }, [])

    const onSubmit = () => {
        create(pushStage, serviceData.id, user!.id, user!.companyId, getObjectId(), serviceData.hardwareId, serviceData.type, setIsOpenForm)
    }

    const fileInputs = [
        { label: "Фотографии", type: "photo" as const, accept: "image/*", color: "blue" },
        { label: "Документы", type: "document" as const, accept: ".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip", color: "green" }
    ];


    return (
        <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">

            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-gray-800">Этап {model.length + 1}</h3>
                </div>
            </div>

            <div className="px-4 py-6 space-y-4">
                <InputContainer headerText="Тип этапа">
                    <Selector
                        className="px-4 py-3"
                        placeholder="Тип этапа"
                        classWripper="w-full"
                        items={[
                            { value: 'Общий', title: "Общий" },
                            { value: 'Поставочная', title: "Поставочная" },
                        ]}
                        onSelect={(item) => { setStageType(item.value.toString()) }}
                        icon="arrow-down"
                    />
                </InputContainer>

                <InputContainer headerText={(model.stageType === "Общий") ? "Описание нового этапа" : "Что требуется для поставки"}>
                    <Textarea
                        placeholder="Введите описание этапа..."
                        value={model.discription}
                        onChange={setDiscription}
                        className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
                    />
                </InputContainer>

                {model.stageType === "Поставочная" &&
                    <InputContainer headerText={"Введите требующееся кол-во"}>
                        <Input
                            type="number"
                            placeholder="Введите требующееся кол-во"
                            value={model.requiredCount === 0 ? "" : model.requiredCount}
                            onChange={(e) => { setRequiredCount(Number(e)) }}
                            className="w-full outline-none disabled:bg-zinc-200 flex items-center border p-2 rounded-lg py-3"
                        />
                    </InputContainer>
                }

                <InputContainer headerText="Выберете компанию">
                    <Selector
                        placeholder="Выберете компанию"
                        classWripper="w-full"
                        items={companyList}
                        onSelect={(item) => { getUserList(Number(item.value)) }}
                        icon="arrow-down"
                    />
                </InputContainer>

                {implementersCompaneId != 0 && (userList.length > 0 ?
                    <InputContainer headerText="Выберете ответственное лицо">
                        <Selector
                            placeholder="Выберете ответственное лицо"
                            classWripper="w-full"
                            items={userList}
                            onSelect={(item) => { setImplementerId(Number(item.value)) }}
                            icon="arrow-down"
                        />
                    </InputContainer>
                    :
                    <div>У компании отсутвствуют ответственные лица </div>)
                }
            </div>

            <div className="px-4 space-y-4 mb-4">
                {fileInputs.map((input) => (
                    <InputContainer key={input.label} headerText={input.label}>
                        <label className="cursor-pointer">
                            <div className={`w-full py-2 px-4 text-sm font-semibold text-${input.color}-700 bg-${input.color}-50 rounded-lg hover:bg-${input.color}-100 transition-colors`}>
                                Загрузка {input.type == "photo" ? "фото" : "документов"}
                            </div>
                            <input
                                type="file"
                                accept={input.accept}
                                multiple
                                className="hidden"
                                onChange={(e) =>
                                    Array.from(e.target.files || []).forEach((file) => addFile(file, input.type))
                                }
                            />
                        </label>
                    </InputContainer>
                ))}


                {files.length > 0 && <StageFileList files={files} onAction={removeFile} />}
            </div>


            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-2">
                    <Button onClick={onSubmit} styleColor="blue" class="w-full py-2">
                        Создать этап
                    </Button>
                    <Button onClick={() => { setIsOpenForm(false); clear() }} styleColor="gray" class="w-full py-2">
                        Отмена
                    </Button>
                </div >
            </div>
        </div>
    );
});