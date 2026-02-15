import { modelPlanedServiceList } from '@/modules/domain/features/hardware/model-planed-service-list';
import { ServiceType } from '@/packages/entities/service-requests/type';
import { RequestCard } from '@/packages/shared-components/request/request-card';
import Loader from '@/packages/shared-ui/loader/loader';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

interface Props {
    show: boolean;
    setShow: (value: boolean) => void;
    model: ServiceType[],
    isLoaded: boolean,
    onClick: (id: number) => void
}


export const ModalPlanedServicesList = observer(({ show, setShow, model, isLoaded, onClick }: Props) => {
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
                    {model.length > 0 ? (model.map((item) => (<RequestCard key={item.id} request={item} onClick={() => onClick(item)} />))) : (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-800 mb-1">История пустая</h3>
                            <p className="text-gray-600">Нет заявок</p>
                        </div>
                    )}
                </div>
            }
        />
    );
});