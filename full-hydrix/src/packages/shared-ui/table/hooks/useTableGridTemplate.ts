// hooks/useTableGridTemplate.ts
import { useMemo } from "react";
import { TableColumn } from "../types";

export const useTableGridTemplate = <T,>(
    columns: TableColumn<T>[],
    countActive?: boolean
) => {
    return useMemo(() => {
        const cols = countActive
            ? [{ width: "60px" }, ...columns]
            : columns;

        return cols.map(c => c.width || "1fr").join(" ");
    }, [columns, countActive]);
};
