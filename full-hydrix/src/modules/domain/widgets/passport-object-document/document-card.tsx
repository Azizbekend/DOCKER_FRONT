import { isAdmin } from "@/packages/entities/user/utils";
import { Icon } from "@/packages/shared-ui/icon";


export const DocumentCard = ({ doc }: { doc: any }) => {
    // const { deleteDoc } = passportDocuments

    return isAdmin() ?
        <a href={"https://triapi.ru/research/api/FileStorage/images/download?id=" + doc.docId}
            target="_blank"
            rel="noopener noreferrer"
            download={true}
            className="flex items-center justify-between px-3 py-2.5 xl:px-4 xl:py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
            <div className="flex items-center gap-3 xl:gap-4">
                <Icon systemName="docs-blue" className="text-gray-400 w-6 h-6" />
                <div className="font-medium text-gray-800 text-sm xl:text-base">{doc.name}</div>
            </div>
            <div></div>
        </a>
        :
        <div className="flex items-center justify-between px-3 py-2.5 xl:px-4 xl:py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div className="flex items-center gap-3 xl:gap-4">
                <Icon systemName="docs-blue" className="text-gray-400 w-6 h-6" />
                <div className="font-medium text-gray-800 text-sm xl:text-base">{doc.name}</div>
            </div>
            <div></div>
        </div>
};