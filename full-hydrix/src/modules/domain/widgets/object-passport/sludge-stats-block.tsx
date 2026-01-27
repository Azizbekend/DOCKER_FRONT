import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { sludgeStats } from '../../features/passport/data';

export const SludgeStatsBlock = observer(() => {
return (
            <BlockContainer title="Статистика по осадкам">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sludgeStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    {/* Иконка и заголовок */}
                    <div className="flex items-start gap-3 mb-3">

                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.area}</p>
                      </div>
                    </div>

                    {/* Основные показатели */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Проект</span>
                        <span className="text-sm font-medium text-gray-800">{item.projectConsumption} {item.unit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Факт</span>
                        <span className="text-sm font-medium text-blue-600">{item.actualConsumption} {item.unit}</span>
                      </div>
                    </div>

                    {/* Экономия */}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-600">Экономия</span>
                      <span className="text-sm font-medium text-blue-600">{item.economy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </BlockContainer>
);
});