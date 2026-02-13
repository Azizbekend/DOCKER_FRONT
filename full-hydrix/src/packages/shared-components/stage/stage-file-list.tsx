import { useEffect, useState } from "react";

interface Props {
    files: any;
    onAction: (id: number, type?: "object" | "image") => void;
    isForm?: boolean;
    type?: "task" | "default"
}

export const StageFileList = ({ files, onAction, isForm = false, type = "default" }: Props) => {

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

    const [currentSlide, setCurrentSlide] = useState(0);

    // Отфильтрованные фото
    const filteredFiles = files.filter((fileItem: any) => fileItem.fileType === "Photo");

    const maxlenth = type == "default" ? 4 : 10
    const isShowBtns = filteredFiles.length > maxlenth


    // Функции для навигации
    const nextSlide = () => {
        if (currentSlide < filteredFiles.length - 3) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };


    return (
        <div className="">
            {isForm &&
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные файлы:</h4>
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                        {files.map((fileItem: any) => (
                            <li key={fileItem.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm cursor-pointer"
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
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные документы:</h4>
                    <ul className="space-y-4">
                        {files.map((fileItem: any) => fileItem.fileType != "Photo" && <li key={fileItem.id}
                            onClick={() => onAction(fileItem.fileId, fileItem.fileType)}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm cursor-pointer"
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

            {!isForm && isHaveImage && (
                <>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Загруженные фотографии:</h4>
                    <div className="relative">
                        {/* Слайдер с изображениями */}
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 ease-in-out gap-3"
                                style={{ transform: `translateX(-${currentSlide * (150 + 12)}px)` }} // 150px ширина + 12px gap
                            >
                                {files
                                    .filter((fileItem: any) => fileItem.fileType === "Photo")
                                    .map((fileItem: any, index: number) => (
                                        <div
                                            key={`${fileItem.id}-${index}`}
                                            className="flex-shrink-0 w-[150px] h-[150px] overflow-hidden rounded-lg border border-gray-200"
                                        >
                                            <img
                                                src={`https://triapi.ru/research/api/FileStorage/download?id=${fileItem.fileId}`}
                                                alt={`Изображение ${index + 1}`}
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                                onClick={() => onAction(fileItem.fileId, fileItem.fileType)}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {isShowBtns &&
                            <button
                                onClick={prevSlide}
                                disabled={currentSlide === 0}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center ${currentSlide === 0 ? 'opacity-50' : 'hover:bg-gray-100'
                                    }`}
                            >
                                ←
                            </button>
                        }
                        {isShowBtns &&
                            <button
                                onClick={nextSlide}
                                disabled={currentSlide >= filteredFiles.length - 3}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center ${currentSlide >= filteredFiles.length - maxlenth ? 'opacity-50' : 'hover:bg-gray-100'
                                    }`}
                            >
                                →
                            </button>
                        }

                        {isShowBtns &&
                            <div className="flex justify-center mt-4 gap-2">
                                {Array.from({ length: Math.ceil(filteredFiles.length - 2) }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        }

                    </div>
                </>
            )}
        </div>
    );
}