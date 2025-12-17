// hooks/useTanstackTable.ts
import {
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

type Props<T> = {
    data: T[];
    columns: any[];
    pageIndex: number;
    pageSize: number;
    onPaginationChange: (page: number, size: number) => void;
};

export const useTanstackTable = <T,>({
    data,
    columns,
    pageIndex,
    pageSize,
    onPaginationChange,
}: Props<T>) => {
    return useReactTable({
        data,
        columns,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onPaginationChange: updater => {
            const next =
                typeof updater === "function"
                    ? updater({ pageIndex, pageSize })
                    : updater;

            onPaginationChange(next.pageIndex, next.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
};
