import { Icon } from '@/shared/ui/icon';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

interface PassportHeaderPanelProps {
    title: string;
    to?: string;
    rightBlock?: React.ReactNode;
}

export const PassportHeaderPanel = observer(({ title, rightBlock, to = "/domain/list" }: PassportHeaderPanelProps) => {
    return (
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between h-[100px] gap-4 z-2 rounded-2xl bg-white shadow-sm p-6">
            <div className="flex items-center gap-4">
                <Link
                    to={to}
                    className="flex items-center justify-center w-10 h-10 bg-[#4A85F6] rounded-lg hover:bg-[#3a6bc9] transition-colors"
                >
                    <Icon systemName="arrow-left" className="text-white" />
                </Link>
                <h1 className="text-xl md:text-2xl font-bold">
                    {title}
                </h1>
            </div>


            <div className="flex gap-4 justify-end">
                {rightBlock}
            </div>
        </div>
    );
});