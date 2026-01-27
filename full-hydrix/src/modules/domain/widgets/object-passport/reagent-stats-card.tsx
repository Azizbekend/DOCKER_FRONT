import { ReagentStat } from '@/packages/entities/participants/type';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface ReagentStatsCardProps {
    item: ReagentStat
}


export const ReagentStatsCard = observer(({ item }: ReagentStatsCardProps) => {

    const [value, setValue] = useState<string>("");

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow">
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
                <div className="flex items-center gap-1">
                    <Input
                        type="number"
                        className="text-sm font-medium text-blue-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите значение"
                        value={value}
                        onChange={setValue}
                    />
                    <span className="text-sm text-gray-500">{item.unit}</span>
                </div>
            </div>

            {/* Экономия */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-600">Экономия</span>
                <span className="text-sm font-medium text-blue-600">{item.economy}</span>
            </div>
        </div>
    );
});