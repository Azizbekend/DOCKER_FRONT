import { useState } from "react";

type Props = {
    items: SelectionItem[];
    onSelect?: (item: SelectionItem) => void;
    className?: string;
    selected?: number,
}

type SelectionItem = {
    value: number | string | any;
    label: string;
    disabled?: boolean;
}

export const SelectionComponent = ({ items, onSelect, className, selected }: Props) => {
    const [selectedValue, setSelectedValue] = useState(selected);

    return (
        <div className={`flex space-x-2 ${className}`}>
            {items.map((option) => (
                <button
                    key={option.value}
                    disabled={option.disabled}
                    onClick={() => { setSelectedValue(option.value); onSelect && onSelect(option) }}
                    className={`px-4 py-2 font-semibold rounded-[4px] ${option.disabled ? "bg-[#bcbcbc] text-white" : ''} ${selectedValue === option.value ? 'bg-[#4A85F6] text-white' : 'bg-[#DCDEE3] text-[#2C2A2A]'}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

