import { useEffect, useState } from "react";

interface Props {
    files: any;
    onAction: (id: number, type?: "object" | "image") => void;
    isForm: boolean;
}

export const StageFileList = ({ files, onAction, isForm }: Props) => {

    const [isHaveDocs, setIsHaveDocs] = useState<boolean>(false)
    const [isHaveImage, setIsHaveImage] = useState<boolean>(false)

    useEffect(() => {
        setIsHaveDocs(files.some((file: any) => {
            if (file.fileType != "Photo") {
                return true
            }
        }))

        setIsHaveImage(files.some((file: any) => {
            if (file.fileType == "Photo") {
                return true
            }
        }))

    }, [])


    return (
        <div className="">
            {isForm &&
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные файлы:</h4>
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                        {files.map((fileItem: any) => (
                            <li key={fileItem.id}
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
                                    onClick={() => onAction(fileItem.fileId ? fileItem.fileId : fileItem.id, fileItem.fileType || "")}
                                    className={`${fileItem.fileId ? "text-gray-600 hover:text-black" : "text-red-500 hover:text-red-700"} text-xs font-semibold`}
                                >
                                    {fileItem.fileId ? "Посмотреть" : "Удалить"}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            }

            {!isForm && isHaveDocs &&
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные файлы:</h4>
                    <ul>
                        {files.map((fileItem: any) => fileItem.fileType != "Photo" &&
                            <li key={fileItem.id}
                                onClick={() => onAction(fileItem.fileId, fileItem.fileType)}
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
                                    onClick={() => onAction(fileItem.fileId ? fileItem.fileId : fileItem.id, fileItem.fileType || "")}
                                    className={`${fileItem.fileId ? "text-gray-600 hover:text-black" : "text-red-500 hover:text-red-700"} text-xs font-semibold`}
                                >
                                    {fileItem.fileId ? "Посмотреть" : "Удалить"}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            }

            {!isForm && isHaveImage &&
                <>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные файлы:</h4>
                    <div className="grid grid-cols-3 gap-3">
                        {files
                            .filter((fileItem: any) => fileItem.fileType === "Photo")
                            .map((fileItem: any) => (
                                <div
                                    key={fileItem.id}
                                    className="w-full h-[150px] overflow-hidden rounded-lg border border-gray-200"
                                >
                                    <img
                                        src={`https://triapi.ru/research/api/FileStorage/download?id=${fileItem.fileId}`}
                                        alt="Изображение"
                                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => onAction(fileItem.fileId, fileItem.fileType)}
                                    />
                                </div>
                            ))}
                    </div>
                </>
            }
        </div>
    );
}