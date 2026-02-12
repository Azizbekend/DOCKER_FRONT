import { isAdmin } from "@/packages/entities/user/utils";
import { Icon } from "@/packages/shared-ui/icon";
import { useEffect, useState } from "react";

export const DocumentCard = ({ doc, onFileViewer }: { doc: any, onFileViewer: (id: number) => void, }) => {
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsTablet(width >= 768 && width <= 1194);
            setIsMobile(width < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Базовые стили для всех устройств
    const baseStyles = "flex items-start justify-between bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer";

    // Адаптивные стили в зависимости от устройства
    const getPaddingStyles = () => {
        if (isMobile) {
            return "px-3 py-2.5";
        } else if (isTablet) {
            // Для планшетов используем промежуточные значения
            return "px-3.5 py-3";
        } else {
            // Для десктопа оставляем как было
            return "px-4 py-3";
        }
    };

    const getTextStyles = () => {
        // Для всех устройств оставляем базовый размер, но меняем line-height при необходимости
        if (isMobile) {
            return "text-sm leading-tight";
        } else if (isTablet) {
            return "text-sm lg:text-base leading-snug";
        } else {
            return "text-base leading-normal";
        }
    };

    // Иконки всегда одинакового размера на всех устройствах
    const iconStyles = "text-gray-400 w-6 h-6 flex-shrink-0";

    const getGapStyles = () => {
        if (isMobile) {
            return "gap-2.5";
        } else if (isTablet) {
            return "gap-3 lg:gap-4";
        } else {
            return "gap-4";
        }
    };

    const getContentWidth = () => {
        if (isMobile) {
            return "w-[calc(100%-24px)]"; // 100% минус ширина иконки
        } else if (isTablet) {
            return "w-[calc(100%-24px)] lg:w-[calc(100%-24px)]";
        } else {
            return "w-[calc(100%-24px)]";
        }
    };

    if (isAdmin()) {
        return (
            <div onClick={() => onFileViewer(doc.docId)} className={`${baseStyles} ${getPaddingStyles()}`}>
                {/* // <a
            //     href={"https://triapi.ru/research/api/FileStorage/download?id=" + doc.docId}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     download={true}
            //     className={`${baseStyles} ${getPaddingStyles()}`}
            //     style={{
            //         WebkitTapHighlightColor: 'transparent',
            //         touchAction: 'manipulation'
            //     }}
            // > */}
                <div className={`flex items-start ${getGapStyles()} w-full`}>
                    <Icon
                        systemName="docs-blue"
                        className={iconStyles}
                    />
                    <div className={`font-medium text-gray-800 ${getTextStyles()} ${getContentWidth()} break-words overflow-wrap-anywhere hyphens-auto`}>
                        {doc.name}
                    </div>
                </div>
                <div className="flex-shrink-0"></div>
                {/* // </a> */}
            </div >
        );
    }

    return (
        <div
            className={`${baseStyles} ${getPaddingStyles()}`}
            style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
            }}
        >
            <div className={`flex items-start ${getGapStyles()} w-full`}>
                <Icon
                    systemName="docs-blue"
                    className={iconStyles}
                />
                <div className={`font-medium text-gray-800 ${getTextStyles()} ${getContentWidth()} break-words overflow-wrap-anywhere hyphens-auto`}>
                    {doc.name}
                </div>
            </div>
            <div className="flex-shrink-0"></div>
        </div>
    );
};