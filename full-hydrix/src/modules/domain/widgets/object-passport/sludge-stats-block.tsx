import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { sludgeStats } from '../../features/passport/data';
import { ReagentStatsCard } from './reagent-stats-card';

export const SludgeStatsBlock = observer(() => {
    return (
        <BlockContainer title="Статистика по осадкам">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sludgeStats.map((item, idx) => <ReagentStatsCard key={idx} item={item} />)}
            </div>
        </BlockContainer>
    );
});