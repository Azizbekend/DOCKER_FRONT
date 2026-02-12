import { useEffect, useState } from "react";
import { Modal } from "./modal/modal";

interface FileViewerProps {
    fileId: number;
    isOpen: boolean;
    onClose: () => void;
    type?: "object" | "hardware";
}

export const FileViewer = ({ fileId, isOpen, onClose, type = "object" }: FileViewerProps) => {
    const [fileData, setFileData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && fileId) {
            loadFile();
        }
    }, [isOpen, fileId]);

    const loadFile = async () => {
        setLoading(true);
        setError(null);

        let getDownloadUrl: string = "";

        switch (type) {
            case "object":
                getDownloadUrl = `https://triapi.ru/research/api/FileStorage/download?id=${fileId}`;
                break;
            case "hardware":
                getDownloadUrl = `https://triapi.ru/research/api/FileStorage/documentStorage/download?id=${fileId}`;
                break;
        }

        if (getDownloadUrl == null) {
            console.log("type = null");
            return
        }


        try {
            const response = await fetch(getDownloadUrl);

            if (!response.ok) {
                throw new Error("Файл не найден или ошибка сети");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setFileData(url);
        } catch (err) {
            setError((err as Error).message || "Ошибка загрузки файла");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (fileData) {
                URL.revokeObjectURL(fileData);
            }
        };
    }, [fileData]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Загрузка файла...</p>
                </div>
            );
        }

        if (error) {
            return (
                <p className="text-xl text-red-500 font-semibold">Ошибка при загрузки документа</p>
            );
        }

        return (
            <iframe
                src={fileData!}
                className="w-full h-full flex-1 border-none"
                title="Просмотр файла"
            />
        );
    };

    return (
        <Modal
            wrapperId="fileViewer"
            show={isOpen}
            setShow={onClose}
            title="Просмотр файла"
            type="right"
            closeOnOverlay
            classNames={{ panel: "max-w-[960px] xl:max-w-[50%] !max-h-screen h-screen" }}
        >
            <div className="flex items-center justify-center h-full">
                {renderContent()}
            </div>
        </Modal>
    );
};
