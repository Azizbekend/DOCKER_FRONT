import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';

export const BLOCK = observer(() => {
    return (
        <>
            {/* Ход строительства */}
            <BlockContainer title="Ход строительства">
                <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-800">IV квартал 2025 г.</span>
                            <span className="text-green-600 font-semibold">100%</span>
                        </div>
                        <div className="mt-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { stage: "Оформление ЗПО", date: "01.03.2023 – 01.03.2023", progress: "0 / 0" },
                            { stage: "ИРД", date: "01.03.2023 – 01.03.2023", progress: "0 / 0" },
                            { stage: "ПИР", date: "01.03.2023 – 01.10.2023", progress: "1 / 1" },
                            { stage: "СМР", date: "21.03.2025 – 01.11.2025", progress: "0 / 1" },
                            { stage: "Оформление прав на ОКС", date: "01.11.2025 – 01.03.2026", progress: "0 / 1" }
                        ].map((item, index) => (
                            <div key={index} className={`p-3 rounded-lg ${index === 3 ? 'bg-blue-100' : 'bg-white'} border border-gray-200`}>
                                <div className="flex justify-between">
                                    <div>
                                        <div className="font-medium text-gray-800">{item.stage}</div>
                                        <div className="text-xs text-gray-500">{item.date}</div>
                                    </div>
                                    <div className="text-gray-600 font-medium">{item.progress}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BlockContainer>
        </>
    );
});