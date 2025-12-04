import { StringKeys } from "@/shared/type/TypeFunctions";
import { useState, useEffect } from "react";

interface UseSearchProps<T> {
    data: T[];
    searchFields?: readonly StringKeys<T>[];
    initialSearch?: string;
}

interface UseSearchReturn<T> {
    search: string;
    setSearch: (value: string) => void;
    isSearching: boolean;
    results: T[];
    originalData: T[];
}

export const useSearch = <T extends Record<string, any>,>({
    data,
    searchFields,
    initialSearch = ""
}: UseSearchProps<T>): UseSearchReturn<T> => {

    const [search, setSearch] = useState(initialSearch);
    const [filteredData, setFilteredData] = useState<T[]>(data);

    const runSearch = (): T[] => {
        const searchTerm = search.trim().toLowerCase();

        if (!searchTerm) return data;

        return data.filter(item => {
            if (searchFields && searchFields.length > 0) {
                return searchFields.some(field => {
                    const value = item[field];
                    return typeof value === "string"
                        ? value.toLowerCase().includes(searchTerm)
                        : value?.toString().toLowerCase().includes(searchTerm);
                });
            }

            return Object.values(item)
                .some(value =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm)
                );
        });
    };

    // Debounce при вводе
    useEffect(() => {
        const handler = setTimeout(() => {
            setFilteredData(runSearch());
        }, 0);

        return () => clearTimeout(handler);
    }, [search, data]);

    const isSearching = search.trim().length > 0;

    return {
        search,
        setSearch,
        isSearching,
        results: filteredData,
        originalData: data
    };
};
