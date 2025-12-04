import { useState } from "react";

type Props =  {
    items: SelectionItem[];
    onSelect?: (item: SelectionItem) => void;
    className?: string;
    itemsStyle?: string;
    selected?: number,
}

type SelectionItem = {
    value: number | string | any;
    label: string;
    disabled?: boolean;
}

export const SelectionComponent = ({items, onSelect, className, selected, itemsStyle}: Props) => {
    const [selectedValue, setSelectedValue] = useState(selected);

    return (
        <div className={`flex space-x-2 ${className} overflow-scroll`}>
            {items.map((option) => (
                <button
                    key={option.value}
                    disabled={option.disabled}
                    onClick={() => { setSelectedValue(option.value); onSelect && onSelect(option) }}
                    className={itemsStyle + ` text-[14px] px-2 py-1 w-fit font-semibold rounded-lg ${option.disabled ? "bg-[#bcbcbc] text-white" : ''} ${selectedValue === option.value ? 'bg-[#4A85F6] text-white' : 'bg-[#DCDEE3] text-[#2C2A2A]'}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

