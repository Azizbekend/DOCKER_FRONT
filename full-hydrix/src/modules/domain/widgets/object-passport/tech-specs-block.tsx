import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';


interface TechSpecsBlockProps {
    cards: any
    openPanel: ({ nodeId }: { nodeId: string[]; }) => void
}

export const TechSpecsBlock = observer(({ cards, openPanel }: TechSpecsBlockProps) => {

    return (
        <BlockContainer title="Технические характеристики">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((spec, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-3 mb-3">
                            <div>
                                <h4 className="font-semibold text-gray-800 text-sm">{spec.name}</h4>
                                <p className="text-xs text-gray-600">{spec.unit}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
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
                                // onClick={() => openPanel({ nodeId: spec.plcNodes })}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors"
                                title="Показать график"
                            >
                                Показать график
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </BlockContainer>
    );
});