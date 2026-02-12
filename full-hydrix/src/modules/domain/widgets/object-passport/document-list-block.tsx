import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { FileViewer } from '@/packages/shared-ui/file-viewer';
import { Icon } from '@/packages/shared-ui/icon';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface DocumentListBlockProps {
    docs: any[];
}

export const DocumentListBlock = observer(({ docs }: DocumentListBlockProps) => {

    const [openViewer, setOpenViewer] = useState<boolean>(false)
    const [fileId, setFileId] = useState<number>(0)

    const openFileViewer = (id: number) => {
        setFileId(id)
        setOpenViewer(true)
    }

    const closeFileViewer = () => {
        setFileId(0)
        setOpenViewer(false)
    }

    return (
        <BlockContainer title="Документы">
            {openViewer && <FileViewer fileId={fileId} isOpen={openViewer} onClose={closeFileViewer} />}

            <div className="space-y-2">

                {docs.map((doc, key) =>
                    <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => openFileViewer(doc.docId)}>
                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon systemName="docs" className="text-blue-700 w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-800 font-medium text-sm">{doc.name}</span>
                        {/* <span className="text-gray-800 font-medium text-sm">Инструкция по эксплуатации</span> */}
                    </div>
                )}

                {/* <a href={doc} download={true} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"> */}
                {/* </a> */}

            </div>
        </BlockContainer>

    );
});