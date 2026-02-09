import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { ReagentStatsCard } from './reagent-stats-card';
import { PassportStatisticSedimentListType } from '@/packages/entities/object/type';


interface ReagentStatsCardProps {
    data: PassportStatisticSedimentListType
    objectId: string
}

export const SludgeStatsBlock = observer(({ data, objectId }: ReagentStatsCardProps) => {
    return (
        <BlockContainer title="Статистика по осадкам">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(data).map(([key, value], idx) => (<ReagentStatsCard key={idx} item={value} propertyKey={key} objectId={objectId} />))}
            </div>
        </BlockContainer>
    );
});