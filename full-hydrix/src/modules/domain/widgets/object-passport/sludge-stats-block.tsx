import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { ReagentStatsCard } from './reagent-stats-card';
import { PassportStatisticSedimentListType } from '@/packages/entities/object/type';


interface ReagentStatsCardProps {
    data: PassportStatisticSedimentListType
}

export const SludgeStatsBlock = observer(({ data }: ReagentStatsCardProps) => {
    return (
        <BlockContainer title="Статистика по осадкам">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(data).map((item, idx) => <ReagentStatsCard key={idx} item={item} />)}
            </div>
        </BlockContainer>
    );
});