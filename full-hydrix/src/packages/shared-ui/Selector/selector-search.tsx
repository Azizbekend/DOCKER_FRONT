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
    isLoader?: boolean;
}

export const SelectorSearch = observer(({ placeholder, items, onSelect, className, classWripper, icon, titleClass, isLoader }: Props) => {
    let [isOpen, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null);

    const { search, setSearch, results } = useSearch<SeletectItemInterface>({ data: items, searchFields: ['title'] })

    const onChange = (value: string) => {
        setSearch(value)
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
        <div ref={containerRef} className={`flex flex-col cursor-pointer relative  rounded-lg ${classWripper}`} onClick={handleButtonClick}>
            <div className={`w-full outline-none disabled:bg-zinc-200 flex items-center ${icon && "justify-between"} ${titleClass}`}
                style={{
                    borderColor: isOpen ? "var(--clr-accent)" : (isOpen ? "var(--clr-error)" : "var(--clr-border-gray)"),
                }}
            >

                <Input
                    type="text"
                    value={search}
                    onChange={onChange}
                    placeholder={placeholder}
                />

                <div className="flex items-center gap-2">
                    <Icon systemName={"search-gray-dark"} />
                    {icon && <Icon systemName={icon}
                        style={{
                            transitionDuration: "0.3s",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                        }} />}
                </div>
            </div>

            <div className={`absolute left-0 top-[110%] flex flex-col gap-2 w-[350px] bg-white border-[1px] ${isOpen ? "min-w-full w-max !max-h-[150px] overflow-y-scroll z-[1]" : "max-h-0 hidden border-0 h-0 overflow-hidden"} ${className}`}>
                {isLoader ? <div className="py-3 px-2">Загрузка...</div> : results.length == 0 ? <div className="py-3 px-2">Пусто...</div> :
                    results.map(item => (
                        <div className="hover:bg-[#e2e2e2] py-3 px-2" onClick={() => { onChange(item.title); onSelect && onSelect(item) }}>
                            <span className="">{item.title}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
})