import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../icon";
import { SeletectItemInterface } from "./type";

type Props = {
    placeholder: string;
    items: SeletectItemInterface[];
    onSelect?: (item: SeletectItemInterface) => void;
    classWripper?: string;
    className?: string;
    titleClass?: string;
    icon?: string;
    defaultValue?: string;
}

export const Selector = observer(({ placeholder, items, onSelect, className, classWripper, icon, titleClass, defaultValue }: Props) => {
    let [isOpen, setOpen] = useState<boolean>(false)
    let [value, setValue] = useState<string | null>('')
    const containerRef = useRef<HTMLDivElement>(null);

    const onChange = (value: string) => {
        setValue(value)
    }

    const handleButtonClick = () => {
        setOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);


    return (
        <div ref={containerRef} className={`flex flex-col cursor-pointer relative rounded-lg ${classWripper}`} onClick={handleButtonClick}>
            <div className={`w-full outline-none disabled:bg-zinc-200 flex items-center border border-[1.5px] p-2 rounded-lg py-3 ${icon && "justify-between"} ${titleClass}`}
                style={{
                    borderColor: isOpen ? "var(--clr-accent)" : "var(--clr-border-gray)",
                }}
            >
                {(() => {
                    if (value) {
                        return <p className="text-gray-900 truncate">{value}</p>;
                    }

                    if (defaultValue) {
                        return <p className="text-gray-500 italic">{defaultValue}</p>;
                    }

                    return <span className="text-gray-400">{placeholder || 'Выберите...'}</span>;
                })()}

                {icon && <Icon systemName={icon}
                    style={{ transitionDuration: "0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                }
            </div>

            <div className={`absolute left-0 top-[110%] rounded-lg flex flex-col gap-2 w-full bg-white  border-[1px] ${isOpen ? "min-w-full max-h-[160px] overflow-y-scroll z-[1] shadow-sm" : "hidden border-0 overflow-hidden"} ${className}`}>
                {items.length === 0 ? <p className="text-sm font-medium text-gray-500 p-4">Список пустой</p> : items.map(item => (
                    <div className="hover:bg-[#e2e2e2] py-3 px-2" onClick={() => { onChange(item.title); onSelect && onSelect(item) }}>
                        <span className="">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
})