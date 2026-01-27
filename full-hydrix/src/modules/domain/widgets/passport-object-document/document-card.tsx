import { DocumentTestType } from "@/packages/entities/documents/type";
import { Button } from "@/packages/shared-ui/button";
import { Icon } from "@/packages/shared-ui/icon";
import { passportDocuments } from "../../features/passport/passport-documents";


export const DocumentCard = ({ doc }: { doc: DocumentTestType }) => {
    const { deleteDoc } = passportDocuments

    return (
        <div className="flex items-center justify-between px-3 py-2.5 lg:px-4 lg:py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div className="flex items-center gap-3 lg:gap-4">
                <Icon systemName="docs-blue" className="text-gray-400 w-6 h-6" />
                <div className="font-medium text-gray-800 text-sm lg:text-base">{doc.name}</div>
            </div>
            <div></div>
        </div>
    );
};

{/* <a href={"https://triapi.ru/research/api/FileStorage/document/download?id=" + doc.docId} download={true}
            className="flex items-center justify-between px-3 py-2.5 lg:px-4 lg:py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
            <div className="flex items-center gap-3 lg:gap-4">
                <Icon systemName="docs-blue" className="text-gray-400 w-6 h-6" />
                <div className="font-medium text-gray-800 text-sm lg:text-base">{doc.name}</div>
            </div>
            <div></div>
            <Button class="p-1.5 lg:p-2 hover:bg-red-50 rounded-full" onClick={() => deleteDoc(doc.id)}>
                <Icon systemName="delete-red" className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
        </a> */}