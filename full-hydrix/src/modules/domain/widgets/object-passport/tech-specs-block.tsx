import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PassportStatisticsPanel } from '../passport-statistics-panel';
import { PassportTechnicalSpecificationsType } from '@/packages/entities/object/type';


interface TechSpecsBlockProps {
    data: PassportTechnicalSpecificationsType
}

export const TechSpecsBlock = observer(({ data }: TechSpecsBlockProps) => {
    const [statisticsPanelShow, setStatisticsPanelShow] = useState<boolean>(false);
    const [nodeList, setNodeList] = useState<string[]>([]);
    const [cardFocusId, setCardFocusId] = useState<number>(0);


    const onOpenStatictic = (nodeIds: string[], id: number) => {
        if (nodeIds.length > 0) {
            setStatisticsPanelShow(true)
            setNodeList(nodeIds)

            setCardFocusId(id)
        }
    }

    const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

    const toggleStatistic = (index: number, hasNodes: boolean) => {
        if (!hasNodes) return;
        setExpandedCardIndex(prev => (prev === index ? null : index));
    };



    return (
        <BlockContainer title="Технические характеристики">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(data).map((item, idx) => {
                    const isExpanded = expandedCardIndex === idx;

                    return (
                        <div
                            key={item.id || idx}
                            className={`flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow ${isExpanded ? "relative" : ""}`}
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                                    <p className="text-xs text-gray-600">{item.unit}</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-auto">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">Проект</span>
                                    <span className="text-sm font-medium text-gray-800">{item.projectConsumption}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">Факт</span>
                                    <span className="text-sm font-bold text-[#4A85F6]">{item.value}</span>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => toggleStatistic(idx, Boolean(item.plcNodes?.length))}
                                    disabled={!item.plcNodes?.length}
                                    className={`flex items-center gap-2 font-medium text-xs transition-colors ${item.plcNodes?.length
                                        ? "text-blue-600 hover:text-blue-800"
                                        : "text-gray-400 cursor-not-allowed"
                                        }`}
                                    title={item.plcNodes?.length ? "Показать график" : "Нет данных для графика"}
                                >
                                    Показать график
                                </button>
                            </div>

                            {isExpanded && item.plcNodes?.length && (
                                <PassportStatisticsPanel
                                    unit={item.unit}
                                    show={isExpanded}
                                    setShow={() => setExpandedCardIndex(null)}
                                    nodeIds={item.plcNodes}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </BlockContainer>
    );
});