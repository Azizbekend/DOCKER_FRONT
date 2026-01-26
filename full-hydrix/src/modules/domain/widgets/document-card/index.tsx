import { DocumentTestType } from "@/packages/entities/documents/type";
import { Icon } from "@/packages/shared-ui/icon";


export const DocumentCard = ({ doc }: { doc: DocumentTestType }) => {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 ">
            <div className="flex items-center gap-3">
                <div>
                    <div className="font-medium text-gray-800 text-sm">{doc.name}</div>
                    <div className="text-xs text-gray-600">{doc.number}</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
                    title="Просмотреть документ"
                >
                    <Icon systemName="eye" className="w-4 h-4" />
                </a>
                <button
                    className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-colors"
                    title="Удалить документ"
                >
                    <Icon systemName="delete" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};