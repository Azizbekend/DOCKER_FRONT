import { observer } from 'mobx-react-lite';
import { Icon } from '../icon/index';
import { Children, useState, useEffect, useRef } from 'react';

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
        <div ref={containerRef} className={`relative z-10 ${props.classNames?.container}`}>
            <div 
                className={`flex items-center cursor-pointer ${props.classNames?.button}`} 
                onClick={handleButtonClick}
            >
                {props.name}
                <Icon systemName="arrow-down" className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </div>
            {open && (
                <div 
                    className={`flex flex-col gap-3 absolute top-6 right-0 px-[14px] py-[12px] bg-stone-50 rounded-lg max-h-[200px] overflow-y-auto shadow-md min-w-fit w-full no-scrollbar ${props.classNames?.body}`}
                >
                    {props.children}
                </div>
            )}
        </div>
    );
}