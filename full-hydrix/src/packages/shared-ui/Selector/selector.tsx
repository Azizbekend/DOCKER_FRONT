import { observer } from "mobx-react-lite";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Icon } from "../icon";
import { useSearch } from "../Inputs/hooks/hook-search";
import { Input } from "../Inputs/input-text";
import { SeletectItemInterface } from "./type";

type Props = {
    placeholder: string;
    items: SeletectItemInterface[];
    onSelect?: (item: SeletectItemInterface) => void;
    classWripper?: string;
    className?: string;
    titleClass?: string;
    icon?: string;
}

export const Selector = observer(({ placeholder, items, onSelect, className, classWripper, icon, titleClass }: Props) => {
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
            <div className={`w-full outline-none disabled:bg-zinc-200 flex items-center border p-2 rounded-lg py-3 ${icon && "justify-between"} ${titleClass}`}
                style={{
                    borderColor: isOpen ? "var(--clr-accent)" : (isOpen ? "var(--clr-error)" : "var(--clr-border-gray)"),
                }}
            >

                {value ? <p>{value}</p> : <span className="text-gray-400">{placeholder}</span>}

                {icon && <Icon systemName={icon}
                    style={{ transitionDuration: "0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                }
            </div>

            <div className={`absolute left-0 top-[110%] rounded-lg flex flex-col gap-2 w-full bg-white border-[1px] ${isOpen ? "min-w-full max-h-[160px] overflow-y-scroll z-[1]" : "hidden border-0 overflow-hidden"} ${className}`}>
                {items.map(item => (
                    <div className="hover:bg-[#e2e2e2] py-3 px-2" onClick={() => { onChange(item.title); onSelect && onSelect(item) }}>
                        <span className="">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
})