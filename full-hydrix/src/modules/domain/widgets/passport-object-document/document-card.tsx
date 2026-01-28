import { DocumentTestType } from "@/packages/entities/documents/type";
import { Button } from "@/packages/shared-ui/button";
import { Icon } from "@/packages/shared-ui/icon";
import { passportDocuments } from "../../features/passport/passport-documents";
import { useEffect } from "react";


export const DocumentCard = ({ doc }: { doc: DocumentTestType }) => {
    const { deleteDoc } = passportDocuments

    return (
        <a href={"https://triapi.ru/research/api/FileStorage/images/download?id=" + doc.docId}
            target="_blank"
            rel="noopener noreferrer"
            download={true}
            className="flex items-center justify-between px-3 py-2.5 lg:px-4 lg:py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div className="flex items-center gap-3 lg:gap-4">
                <Icon systemName="docs-blue" className="text-gray-400 w-6 h-6" />
                <div className="font-medium text-gray-800 text-sm lg:text-base">{doc.name}</div>
            </div>
            <div></div>
            download={true}
        </a>
    );
};