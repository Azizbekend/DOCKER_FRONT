import { modelPlanedServiceList } from '@/modules/domain/features/hardware/model-planed-service-list';
import { RequestCard } from '@/packages/shared-components/request/request-card';
import Loader from '@/packages/shared-ui/loader/loader';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

interface Props {
    show: boolean;
    setShow: (value: boolean) => void;
    idPlaned: number;
}


export const ModalPlanedServicesList = observer(({ show, setShow, idPlaned }: Props) => {

    const { init, model, isLoaded } = modelPlanedServiceList

    useEffect(() => {
        if (show) {
            init(idPlaned)
        }
    }, [idPlaned, show])


    return (
        <Modal title="История заявок"
            wrapperId="ModalPlanedServicesList"
            type="right"
            show={show}
            setShow={setShow}
            classNames={{
                panel: "max-w-[640px] w-full",
                body: "p-4"
            }}
            children={
                <div>
                    {isLoaded && <Loader />}
                    {model.length > 0 ? (model.map((item) => (<RequestCard key={item.id} request={item} />))) : (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-800 mb-1">Заявки не найдены</h3>
                            <p className="text-gray-600">Нет заявок</p>
                        </div>
                    )}
                </div>
            }
        />
    );
});