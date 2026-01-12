import { useNavigate } from "react-router-dom";
import { hardwareListModel } from "../model/hardware-list-model";
import { Icon } from "@/shared/ui/icon";

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
export const EditButton = ({ id }: { id: number }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/dispatcher/equipment/form/${id}`);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="Редактировать"
        >
            <Icon systemName="edit" className="w-4 h-4" />
        </button>
    );
};

// Кнопка экспорта
export const ExportButton = ({ className }: { className?: string }) => (
    <button className={"flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium" + (className && (" " + className))}>
        <Icon systemName="download" className="" />
        Экспортировать
    </button>
);