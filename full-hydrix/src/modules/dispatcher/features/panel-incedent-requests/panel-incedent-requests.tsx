import { RequestCard } from '@/packages/shared-components/request/request-card';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { incedentRequestPanelModel } from './models/incedent-request-panel-model';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { Textarea } from '@/packages/shared-ui/textarea';
import { Button } from '@/packages/shared-ui/button/button';
import { createRequestPanelModel } from './models/create-incedent-request-model';
import { getObjectId } from '@/packages/functions/get-data/get-object-data';
import { useAuth } from '@/packages/entities/user/context';
import { Input } from '@/packages/shared-ui/Inputs/input-text';

type PanelIncedentRequestsType = {
    show: boolean,
    onClose: (value: boolean) => void,
    incident: any,
    stagePanelOpen: (service: any) => void,
}

export const PanelIncedentRequests = observer(({ show, onClose, incident, stagePanelOpen }: PanelIncedentRequestsType) => {

    const { user } = useAuth()
    const { model, companyList, userList, setTitle, setDiscription, setImplementerId, init: initForm, getUserList, create } = createRequestPanelModel

    const { init, list, pushObject } = incedentRequestPanelModel
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false)

    useEffect(() => {
        if (incident) {
            setIsOpenForm(false)
            init(incident.id);
            initForm({
                incidentId: incident.id,
                hardwareId: incident.hardware.id,
                objectId: getObjectId(),
                userId: user?.id,
                creatorsCompanyId: user?.companyId,
            })
        }
    }, [incident])

    const onSubmit = () => {
        setIsOpenForm(false)
        create(pushObject)
    }

    return (
        <Modal
            wrapperId="panelIncedentRequests"
            type="right"
            show={show}
            setShow={onClose}
            title={"Аварийные заявки"}
            classNames={{
                panel: "max-w-2xl w-full rounded-l-2xl h-full",
                header: "border-b border-gray-200",
                footer: "bg-gray-50 p-6 border-t border-gray-200"
            }}

            children={
                <div className="flex flex-col gap-2 p-6">
                    <div className="space-y-5">
                        {list.length > 0 ? (
                            list.map((item) => (
                                <RequestCard key={item.id}
                                    request={item}
                                    onClick={() => stagePanelOpen(item)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12">

                                <h3 className="text-lg font-medium text-gray-800 mb-1">Заявки не найдены</h3>
                                <p className="text-gray-600">Нет заявок</p>
                            </div>
                        )}


                        {isOpenForm ?
                            <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4 border-b border-gray-100 bg-gray-50">
                                <div className="flex flex-col gap-4">
                                    <InputContainer headerText={"Наименование заявки"}>
                                        <Input
                                            placeholder="Наименование"
                                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                                            value={model.title}
                                            onChange={setTitle}
                                            type="text"
                                        />
                                    </InputContainer>

                                    <InputContainer headerText="Выберете компанию">
                                        <Selector
                                            placeholder="Выберете компанию"
                                            classWripper="w-full"
                                            items={companyList}
                                            onSelect={(item) => { getUserList(Number(item.value)) }}
                                            icon="arrow-down"
                                        />
                                    </InputContainer>


                                    {model.implementersCompaneId != 0 && (userList.length > 0 ?
                                        <InputContainer headerText="Выберете ответственное лицо">
                                            <Selector
                                                placeholder="Выберете ответственное лицо"
                                                classWripper="w-full"
                                                items={userList}
                                                onSelect={(item) => { setImplementerId(Number(item.value)) }}
                                                icon="arrow-down"
                                            />
                                        </InputContainer>
                                        : <div>У компании отсутвствуют ответственные лица </div>)
                                    }


                                    <InputContainer headerText="Описание" >
                                        <Textarea
                                            className="h-[116px]"
                                            placeholder="Описание"
                                            value={model.discription}
                                            onChange={setDiscription}
                                        />

                                    </InputContainer>

                                    <div className="flex gap-4">
                                        <Button class="bg-[#4A85F6] text-white px-6 py-2.5 rounded-lg hover:opacity-50 duration-300" onClick={onSubmit}>
                                            Создать
                                        </Button>
                                        <Button onClick={() => setIsOpenForm(true)} class="px-6 py-2.5" styleColor='gray'>
                                            Отмена
                                        </Button>
                                    </div>
                                </div >
                            </div>
                            :
                            <Button styleColor="blue" class="mb-4 py-2 w-full" onClick={() => setIsOpenForm(true)}>
                                Создать заявку
                            </Button>
                        }

                        {/*  setIsOpenForm */}
                    </div >
                </div >
            }
        />
    );
})