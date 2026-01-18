// hooks/useTableColumns.ts
import { useMemo } from "react";
import { TableColumn } from "../types";

export const useTableColumns = <T,>(
    columns: TableColumn<T>[],
    countActive?: boolean
) => {
    return useMemo(() => {
        const base = columns.map(col => ({
            accessorKey: col.key,
            header: col.header,
            cell: (info: any) => {
                const row = info.row.original;
                return col.cell ? col.cell(row) : row[col.key];
            },
        }));

        if (!countActive) return base;

        return [
            {
                accessorKey: "__index",
                header: "№",
                cell: (info: any) => info.row.index + 1,
            },
            ...base,
        ];
    }, [columns, countActive]);
};
