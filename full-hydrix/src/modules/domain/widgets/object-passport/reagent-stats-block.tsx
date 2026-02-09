import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ReagentStatsCard } from './reagent-stats-card';
import { ReagentStat } from '@/packages/entities/participants/type';
import { PassportStatisticReagentListType } from '@/packages/entities/object/type';


interface ReagentStatsBlockProps {
    data: PassportStatisticReagentListType
    objectId: string
}

export const ReagentStatsBlock = observer(({ data, objectId }: ReagentStatsBlockProps) => {

    // const [reagentStats, setReagentStats] = useState<ReagentStat[]>([
    //     {
    //         id: 1,
    //         name: "Коагулянт Аквапак 30",
    //         area: "Удаление фосфатов",
    //         projectConsumption: "6,15",
    //         actualConsumption: "Поле ввода",
    //         unit: "кг/сут",
    //         economy: "формула %"
    //     },
    //     {
    //         id: 2,
    //         name: "Флокулянт Аквафлок 650",
    //         area: "Обезвоживание осадка",
    //         projectConsumption: "0,09",
    //         actualConsumption: "Поле ввода",
    //         unit: "кг/сут",
    //         economy: "формула %"
    //     },
    //     {
    //         id: 3,
    //         name: "Щавелевая кислота",
    //         area: "Промывка ламп УФО",
    //         projectConsumption: "0,1",
    //         actualConsumption: "Поле ввода",
    //         unit: "кг/мес",
    //         economy: "формула %"
    //     },
    //     {
    //         id: 4,
    //         name: "Щавелевая кислота",
    //         area: "Хим.промывка МБР",
    //         projectConsumption: "43,5",
    //         actualConsumption: "Поле ввода",
    //         unit: "кг/год",
    //         economy: "формула %"
    //     },
    //     {
    //         id: 5,
    //         name: "Гипохлорит натрия ГОСТ 11086-76 марка А",
    //         area: "Хим.промывка МБР",
    //         projectConsumption: "50",
    //         actualConsumption: "Поле ввода",
    //         unit: "кг/мес",
    //         economy: "формула %"
    //     },
    // ])

    // const handleInputChange = (id: number, value: string) => {
    //     data(prevStats =>
    //         prevStats.map(item =>
    //             item.id === id
    //                 ? { ...item, actualConsumption: value }
    //                 : item
    //         )
    //     );
    // };

    return (
        <BlockContainer title="Статистика по реагентам">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(data).map(([key, value], idx) => (<ReagentStatsCard key={idx} item={value} propertyKey={key} objectId={objectId} />))}
            </div>
        </BlockContainer>
    );
});