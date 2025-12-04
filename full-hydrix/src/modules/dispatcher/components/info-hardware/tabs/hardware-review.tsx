import { observer } from 'mobx-react-lite';
import { Icon } from "@/shared/ui/icon"
import { Characteristic } from '@/modules/dispatcher/pages/equipment-create/components/characteristic/type';
import { hardwareModel } from '@/entities/hardware/model';

export const HardwareReview = observer(() => {

    const { сharacteristic, model } = hardwareModel


    return (
        <>
            <div className="info-comp__content">
                <div className="info-comp__section">
                    <div className="info-comp__subtitle">Характеристики</div>

                    <div className="info-comp__item">
                        <div className="info-comp__title">Модель</div>
                        <div className="info-comp__description">{model.position}</div>
                    </div>
                    <div className="info-comp__item">
                        <div className="info-comp__title">Производительность</div>
                        <div className="info-comp__description">{model.developerName}</div>
                    </div>
                    <div className="info-comp__item">
                        <div className="info-comp__title">Поставщик</div>
                        <div className="info-comp__description">{model.supplierName}</div>
                    </div>
                    <div className="info-comp__item">
                        <div className="info-comp__title">Производитель</div>
                        <div className="info-comp__description">{model.developerName}</div>
                    </div>

                    {сharacteristic.map((item, key) => {
                        return (
                            <div className="info-comp__item" key={key}>
                                <div className="info-comp__title">{item.name}</div>
                                <div className="info-comp__description">{item.value}</div>
                            </div>
                        )
                    })}


                </div>
                <div className="info-comp__section">
                    <div className="info-comp__subtitle">Документация</div>

                    <div className="info-comp__doc">
                        <Icon systemName="docs" />
                        <span>Паспорт</span>
                    </div>
                    <div className="info-comp__doc">
                        <Icon systemName="docs" />
                        <span>Инструкция</span>
                    </div>
                    <div className="info-comp__doc">
                        <Icon systemName="docs" />
                        <span>Гарантийный талон</span>
                    </div>
                </div>
            </div>
        </>
    );
});