import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Icon } from "../icon";

type Props = {
    title: string;
    items: Item[];
    onSelect?: (item: Item) => void;
    classWripper?: string;
    className?: string;
    titleClass?: string;
    icon?: string;
    notEditTitle?: boolean;
    defaultValue?: string | number;
}

type Item = {
    value: string | number;
    title: string;
}

export const Selector = observer(({
    title, items, onSelect, className, classWripper, icon, titleClass, notEditTitle, defaultValue
}: Props) => {

    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState<Item | null>(null);

    // Устанавливаем выбранный элемент если передан defaultValue
    useEffect(() => {
        if (defaultValue !== undefined) {
            const found = items.find(i => i.value === defaultValue);
            if (found) setSelected(found);
        }
    }, [defaultValue, items]);

    return (
        <div
            className={`flex flex-col cursor-pointer relative rounded-lg ${classWripper}`}
            onClick={() => setOpen(prev => !prev)}
        >
            <div
                className={`w-full outline-none disabled:bg-zinc-200 ${icon && "justify-between"} ${titleClass}`}
                style={{
                    borderColor: isOpen ? "var(--clr-accent)" : "var(--clr-border-gray)",
                }}
            >
                {notEditTitle
                    ? <span className={`${selected ? "text-black" : "text-[#bcbcbc]"}`}>
                        {title}
                    </span>
                    : <span className={`${selected ? "text-black" : "text-[#bcbcbc]"}`}>
                        {selected ? selected.title : title}
                    </span>
                }

                <Icon
                    systemName={icon || "arrow-down"}
                    style={{
                        transitionDuration: "0.3s",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                />
            </div>

            <div className={`absolute left-0 top-[110%] flex flex-col gap-2 bg-white border w-[350px] 
                ${isOpen ? "min-w-full w-max max-h-[150px] overflow-y-scroll z-[1]" : "hidden max-h-0"}`}>

                {items.map(item => (
                    <div
                        key={item.value}
                        className="hover:bg-[#e2e2e2] py-3 px-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelected(item);
                            onSelect && onSelect(item);
                            setOpen(false);
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
});
