import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import { Icon } from "../icon";
import { useSearch } from "../Inputs/hooks/hook-search";
import { Input } from "../Inputs/input-text";

type Props = {
    placeholder: string;
    items: Item[];
    onSelect?: (item: Item) => void;
    classWripper?: string;
    className?: string;
    titleClass?: string;
    icon?: string;
    notEditTitle?: boolean;
}

type Item = {
    value: string | number;
    title: string;
}

export const SelectorSearch = observer(({ placeholder, items, onSelect, className, classWripper, icon, titleClass, notEditTitle }: Props) => {
    let [isOpen, setOpen] = useState(false)

    const { search, setSearch, results } = useSearch<Item>({ data: items, searchFields: ['title'] })

    const onChange = (value: string) => {
        setSearch(value)
    }


    return (
        <div className={`flex flex-col cursor-pointer relative  rounded-lg ${classWripper}`} onClick={() => {
            setOpen(!isOpen)
        }}>
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
                {results.length == 0 && <div className="py-3 px-2">Пусто...</div>}
                {results.map(item => (
                    <div className="hover:bg-[#e2e2e2] py-3 px-2" onClick={() => { onChange(item.title); onSelect && onSelect(item) }}>
                        <span className="">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
})