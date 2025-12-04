import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Icon } from "./icon";

type Props = {
    title: string;
    items: Item[];
    onSelect?: (item: Item) => void;
}

type Item = {
    value: string | number;
    title: string;
}

export const Selector = observer(({ title, items, onSelect }: Props) => {
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchInputClick = (e: React.MouseEvent) => {
        // Предотвратить закрытие списка при клике на поле поиска
        e.stopPropagation();
    };

    return (
        <div
            className="flex flex-col cursor-pointer relative border-2 rounded-md border-[#BCBCBC] outline-none py-2 px-2 min-h-[38px] font-normal"
            onClick={() => {
                setOpen(!isOpen);
            }}
        >
            <span className={`${selected !== "" ? "text-black" : "text-[#bcbcbc]"}`}>
                {selected !== "" ? selected : title}
            </span>

            <div className="text-gray-500 absolute top-1/2 transform -translate-y-1/2 right-2">
                <Icon systemName="arrow-down" className="text-gray-500" height={20} width={20} />
            </div>

            <div
                className={`absolute left-0 z-50 rounded-md top-[110%] w-full bg-white transition-all ease-in-out ${isOpen ? "!max-h-[200px] border-[1px] overflow-y-auto" : "max-h-0 border-0 h-0 overflow-hidden"
                    }`}
            >
                <input
                    type="text"
                    placeholder="Поиск..."
                    className="w-full py-2 px-3 border-b-[1px] border-[#BCBCBC] outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={handleSearchInputClick} 
                />

                {filteredItems.map((item) => (
                    <div
                        key={item.value}
                        className={`hover:bg-[#4A85F6] hover:text-white py-2 px-3 rounded-sm font-normal ${selected === item.value ? "text-white bg-[#4a85f6]" : ""
                            }`}
                        onClick={() => {
                            setSelected(item.title);
                            onSelect && onSelect(item);
                            setSearchTerm(""); // Очищаем поиск после выбора
                            setOpen(false); // Закрываем выпадающий список
                        }}
                    >
                        <span>{item.title}</span>
                    </div>
                ))}

                {/* Если нет подходящих элементов */}
                {filteredItems.length === 0 && (
                    <div className="py-2 px-3 text-gray-500">Ничего не найдено</div>
                )}
            </div>
        </div>
    );
});
