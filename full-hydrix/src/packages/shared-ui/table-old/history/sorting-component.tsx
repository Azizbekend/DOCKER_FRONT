import { useState } from "react";
import { ExtendedColumnDef, Filter } from "./table";
import { Button } from "./button";

interface SortFilterComponentProps {
    column: ExtendedColumnDef<any, any>; // Используем расширенный тип
    onSort: (columnId: string, direction: "asc" | "desc") => void;
    onFilter: (columnId: string, filterValues: Record<string, boolean>) => void;
    filterOptions?: Filter[];
}

const SortFilterComponent: React.FC<SortFilterComponentProps> = ({
    column,
    onSort,
    onFilter,
    filterOptions,
}) => {
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [selectedFilters, setSelectedFilters] = useState<Record<string | number, boolean>>(
        filterOptions
            ? filterOptions.reduce(
                (acc, option) => ({ ...acc, [option.value]: true }),
                {}
            )
            : {}
    );

    const handleSort = (newDirection: "asc" | "desc") => {
        setSortDirection(newDirection);
        onSort(column.id as string, newDirection);
    };

    const handleFilterChange = (filterType: string | number) => {
        const newFilters = { ...selectedFilters, [String(filterType)]: !selectedFilters[String(filterType)] };
        setSelectedFilters(newFilters);
        onFilter(column.id as string, newFilters);
    };

    return (
        <div className="absolute bg-white text-black text-[14px] font-normal right-0 top-[100%] flex flex-col shadow-[1px_1px_5px_0px_#0000001A]">
            {column.canSort && (
                <>
                    <Button
                        onClick={() => handleSort("asc")}
                        class={`!text-black !py-2 !px-3 ${
                            sortDirection === "asc" ? "!bg-[#EFF4FA]" : ""
                        }`}
                    >
                        Сортировать по возрастанию
                    </Button>
                    <Button
                        onClick={() => handleSort("desc")}
                        class={`!text-black !py-2 !px-3 ${
                            sortDirection === "desc" ? "!bg-[#EFF4FA]" : ""
                        }`}
                    >
                        Сортировать по убыванию
                    </Button>
                </>
            )}

            <div className="py-3 px-3 flex flex-col gap-2">
                <p className="text-left">Фильтр:</p>
                {filterOptions && (
                    <div className="flex flex-col gap-2">
                        {filterOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="custom-checkbox"
                                    checked={!!selectedFilters[option.value]}
                                    onChange={() => handleFilterChange(option.value)}
                                />
                                {option.title}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortFilterComponent;
