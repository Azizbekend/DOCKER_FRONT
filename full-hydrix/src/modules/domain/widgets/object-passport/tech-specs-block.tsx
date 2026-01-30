import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PassportStatisticsPanel } from '../passport-statistics-panel';


interface TechSpecsBlockProps {
    cards: any
}

export const TechSpecsBlock = observer(({ cards }: TechSpecsBlockProps) => {


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
                {cards.map((spec, idx) => {
                    const isExpanded = expandedCardIndex === idx;
                    return (<div key={idx} className={`flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow ${isExpanded && "relative"}`}>
                        <div className="flex items-start gap-3 mb-3">
                            <div>
                                <h4 className="font-semibold text-gray-800 text-sm">{spec.name}</h4>
                                <p className="text-xs text-gray-600">{spec.unit}</p>
                            </div>
                        </div>
                        <div className="space-y-2 mb-auto">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">Проект</span>
                                <span className="text-sm font-medium text-gray-800">{spec.projectValue}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">Факт</span>
                                <span className="text-sm font-bold text-[#4A85F6]">{spec.value}</span>
                            </div>
                        </div>
                        {/* spec.plcNodes && */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <button
                                // onClick={() => onOpenStatictic(spec.plcNodes, idx)}
                                onClick={() =>
                                    toggleStatistic(idx, Boolean(spec.plcNodes?.length))
                                }

                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors"
                                title="Показать график"
                            >
                                Показать график
                            </button>
                        </div>

                        {isExpanded && (
                            <PassportStatisticsPanel
                                unit={spec.unit}
                                show
                                setShow={() => setExpandedCardIndex(null)}
                                nodeIds={spec.plcNodes}
                            />
                        )}


                    </div>)
                })}
            </div>
        </BlockContainer>
    );
});