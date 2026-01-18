import { Link, useNavigate } from "react-router-dom";
import { hardwareListModel } from "@/modules/dispatcher/pages/hardware-list/model/hardware-list-model";
import { Icon } from "@/packages/shared-ui/icon";

export const ActivateButton = ({ id }: { id: number }) => (
    <button
        onClick={(e) => {
            e.stopPropagation();
            hardwareListModel.active(id);
        }}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4A85F6] text-white hover:bg-[#3a6bc9] transition-colors"
    >
        Активировать
    </button>
);


// Кнопка редактирования
export const EditButton = ({ to }: { to: string }) => {
    return (
        <button
            title="Редактировать"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
            <Link to={to} >
                <Icon systemName="edit" className="w-4 h-4" />
            </Link>
        </button >
    );
};

// Кнопка экспорта
export const ExportButton = ({ className }: { className?: string }) => (
    <button className={"flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium" + (className && (" " + className))}>
        <Icon systemName="download" className="" />
        Экспортировать
    </button>
);