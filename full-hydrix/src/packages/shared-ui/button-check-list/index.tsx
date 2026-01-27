import { Icon } from '../icon/index';
import { useState, useEffect, useRef } from 'react';

type Props = {
    children: React.ReactNode,
    name: string,
    classNames?: {
        container?: string
        button?: string,
        body?: string,
    }
}

export const ButtonCheckList = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    // Закрытие при нажатии Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    const handleButtonClick = () => {
        setOpen(!open);
    };

    return (
        <div ref={containerRef} className={`relative z-10 ${props.classNames?.container || ''}`}>
            <button
                type="button"
                className={`flex items-center bg-white justify-between px-3 py-2 rounded-lg  transition-all duration-200 min-w-[120px] ${props.classNames?.button || ''}`}
                onClick={handleButtonClick}
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <span className="text-gray-700 font-medium truncate">{props.name}</span>
                <Icon
                    systemName="arrow-down"
                    className={`ml-2 transition-transform duration-200 ease-in-out ${open ? "rotate-180" : ""} text-gray-500`}
                />
            </button>
            {open && (
                <div
                    className={`absolute flex flex-col gap-3 top-full left-[50%] translate-x-[-50%] mt-1 min-w-full w-max px-2 py-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20  ${props.classNames?.body || ''}`}
                    role="listbox"
                >
                    {props.children}
                </div>
            )}
        </div>
    );
}
