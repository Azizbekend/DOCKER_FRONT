interface Props {
    files: any;
    onAction: (id: number) => void;
}

export const StageFileList = ({ files, onAction }: Props) => {
    return (
        <div className="">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные файлы:</h4>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((fileItem: any) => (
                    <li
                        key={fileItem.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
                    >
                        <div className="flex items-center gap-2 truncate">
                            {fileItem.type === "photo" ? (
                                <span className="text-blue-500">📷</span>
                            ) : (
                                <span className="text-green-500">📄</span>
                            )}
                            <span className="truncate">{fileItem.fileName}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => onAction(fileItem.id)}
                            className={`${fileItem.fileId ? "text-green-500 hover:text-green-700" : "text-red-500 hover:text-red-700"} text-xs font-semibold`}
                        >
                            {fileItem.fileId ? "Посмотреть" : "Удалить"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>


    );
}