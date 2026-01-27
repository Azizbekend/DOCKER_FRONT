import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { Icon } from '@/packages/shared-ui/icon';
import { observer } from 'mobx-react-lite';

export const DocumentListBlock = observer(() => {
    return (
        <BlockContainer title="Документы">
            <div className="space-y-2">
                <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon systemName="docs" className="text-blue-700 w-3.5 h-3.5" />
                    </div>
                    <span className="text-gray-800 font-medium text-sm">Паспорт объекта</span>
                </div>
            </div>
        </BlockContainer>

    );
});