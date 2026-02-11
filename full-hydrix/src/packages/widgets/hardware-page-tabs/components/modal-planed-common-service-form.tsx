import { planedCommonServiceFormModel } from '@/modules/dispatcher/features/planed-service/planed-common-service-form';
import { useAuth } from '@/packages/entities/user/context';
import { Button } from '@/packages/shared-ui/button/button';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { Textarea } from '@/packages/shared-ui/textarea';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

interface ModalPlanedCommonServiceFormProps {
    show: boolean;
    setShow: (value: boolean) => void;
    serviceId: number;
}

export const ModalPlanedCommonServiceForm = observer(({ show, setShow, serviceId }: ModalPlanedCommonServiceFormProps) => {
    const { model, companyList, userList, setDiscription, getUserList, setImplementerId, init, create } = planedCommonServiceFormModel

    const { user } = useAuth()

    useEffect(() => {
        const objectData = JSON.parse(localStorage.getItem('objectData') || "")

        if (show) {
            init({
                creatorId: user.userId,
                creatorsCompanyId: user?.companyId || 0,
                planServiceId: serviceId,
                objectId: objectData.id
            })
        }
    }, [serviceId])

    return (
        <Modal title="Создать заявку на обслуживание"
            wrapperId="ModalPlanedCommonServiceForm"
            type="right"
            show={show}
            setShow={setShow}
            classNames={{
                panel: "max-w-[640px] w-full",
                header: "border-b border-gray-100",
                title: "text-xl font-bold text-gray-800"
            }}
            children={
                <div className="flex flex-col gap-4 p-[28px_20px]">
                    <InputContainer headerText="Выберите компанию">
                        <Selector
                            placeholder="Выберите компанию"
                            classWripper="w-full"
                            items={companyList}
                            onSelect={(item) => { getUserList(Number(item.value)) }}
                            icon="arrow-down"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                        />
                    </InputContainer>


                    {model.implementersCompaneId != 0 && (userList.length > 0 ?
                        <InputContainer headerText="Выберите ответственное лицо">
                            <Selector
                                placeholder="Выберите ответственное лицо"
                                classWripper="w-full"
                                items={userList}
                                onSelect={(item) => { setImplementerId(Number(item.value)) }}
                                icon="arrow-down"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                            />
                        </InputContainer>
                        : <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                            У выбранной компании отсутствуют ответственные лица
                        </div>)
                    }

                    <InputContainer headerText="Описание" >
                        <Textarea
                            className="w-full min-h-[120px] border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
                            placeholder="Описание"
                            value={model.discription}
                            onChange={setDiscription}

                        />
                    </InputContainer>
                </div>
            }
            footerSlot={
                <div className="flex justify-end gap-3 p-6">
                    <Button class="px-5 py-2.5 rounded-lg font-medium text-white bg-gray-600 hover:bg-gray-700 transition-colors" onClick={() => setShow(false)}>
                        Отмена
                    </Button>
                    <Button class="px-5 py-2.5 rounded-lg font-medium text-white bg-[#4A85F6] hover:bg-[#3a6bc9] transition-colors shadow-sm" onClick={() => create(() => setShow(false))}>
                        Создать
                    </Button>
                </div>
            }
        />


    );
});