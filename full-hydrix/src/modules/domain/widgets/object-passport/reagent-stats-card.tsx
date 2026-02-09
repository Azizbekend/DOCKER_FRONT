import { PassportStatisticType } from '@/packages/entities/object/type';
import { Button } from '@/packages/shared-ui/button/button';
import { Icon } from '@/packages/shared-ui/icon';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';


interface SavedCalculation {
    value: number;
    answer: number;
}

interface ReagentStatsCardType {
    item: PassportStatisticType,
    objectId: string
    propertyKey: string
}

export const ReagentStatsCard = observer(({ item, objectId, propertyKey }: ReagentStatsCardType) => {

    const [value, setValue] = useState<number>(0);
    const [answer, setAnswer] = useState<number>(0);

    const storageKey = `reagent_${propertyKey}_calculation_${objectId}`;
    useEffect(() => {

        console.log(item)

        const savedData = localStorage.getItem(storageKey);

        if (savedData) {
            try {
                const parsedData: SavedCalculation = JSON.parse(savedData);
                setValue(parsedData.value);
                setAnswer(parsedData.answer);
            } catch (error) {
                console.error('Ошибка при чтении из localStorage:', error);
            }
        }
    }, [storageKey]);

    const saveToLocalStorage = (val: number, ans: number) => {
        const dataToSave: SavedCalculation = {
            value: val,
            answer: ans
        };
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    };

    const onSave = () => {
        const project = Number(item.projectConsumption);
        const actual = value;

        if (!isNaN(project) && !isNaN(actual) && project > 0) {
            const result = 100 - (actual / project * 100);
            const roundedAnswer = Number(result.toFixed(2));
            setAnswer(roundedAnswer);
            // Сохраняем в localStorage
            saveToLocalStorage(actual, roundedAnswer);
        } else {
            setAnswer(0);
            saveToLocalStorage(actual, 0);
        }
    };





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
                <div className="flex items-center justify-end gap-1">

                    <Button
                        styleColor='blue'
                        onClick={onSave}
                        class={'!rounded-[5px] py-1.5 px-1.5'}
                    >
                        <Icon systemName='chekc-white' width={15} height={15} />

                    </Button>

                    <Input
                        type="number"
                        className="text-sm font-medium text-right text-blue-600 border border-gray-300 rounded px-2 py-1 !w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Значение"
                        value={value || ""}
                        onChange={(e) => setValue(Number(e))}
                        lengthOptions={{
                            maxLength: 8
                        }}
                    />
                    <span className="text-sm text-gray-500">{item.unit}</span>
                </div>
            </div>

            {/* Экономия */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-600">Экономия</span>
                <span className="text-sm font-medium text-blue-600">{answer}%</span>
            </div>
        </div>
    );
});