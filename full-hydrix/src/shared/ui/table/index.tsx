import {
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { TableProps } from "./setting/types";
import { TableFooter } from "./table-footer";

export function Table<T>(props: TableProps<T>) {
    const [pageSize, setPageSize] = useState<number[]>(props.options?.pageSize || [10, 20, 50, 100]);


    const columns = useMemo(() => {
        const baseCols = props.columns.map(col => ({
            accessorKey: col.key,
            header: col.header,
            cell: (info: any) => {
                const row = info.row.original;
                return col.cell ? col.cell(row) : row[col.key];
            }
        }));

        // Если передан props.countActive — добавляем нумерацию первой колонкой
        if (props.countActive) {
            return [
                {
                    accessorKey: "__index",
                    header: "№",
                    cell: (info: any) => {
                        const rowIndex = info.row.index;
                        const pageIndex = info.table.getState().pagination.pageIndex;
                        const pageSize = info.table.getState().pagination.pageSize;
                        return pageIndex * pageSize + rowIndex + 1;
                    }
                },
                ...baseCols
            ];
        }

        return baseCols;
    }, [props.columns, props.countActive]);



    const gridTemplate = useMemo(() => {
        return columns
            .map((col, index) => {
                // если это первая колонка счетчика — фиксируем минимальную ширину
                if (props.countActive && index === 0) return "60px";
                const original = props.columns[index - (props.countActive ? 1 : 0)];
                return original?.width || "1fr";
            })
            .join(" ");
    }, [columns, props.columns, props.countActive]);



    const table = useReactTable({
        data: props.data,
        columns,
        initialState: {
            pagination: {
                pageSize: pageSize[0],
                pageIndex: 0,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });



    return (
        <div>
            <div className={`overflow-auto ${props.classNames?.body}`}>
                <table className={`min-w-[1100px] w-full border border-[#EFF4FA] ${props?.classNames?.table}`}>
                    <thead className={`bg-[#EFF4FA] ${props?.classNames?.thead}`}>
                        {table.getHeaderGroups().map((headerGroup, i) => (
                            <tr key={i}
                                className="grid items-center"
                                style={{ gridTemplateColumns: gridTemplate }}>

                                {headerGroup.headers.map((header, j) => (
                                    <th key={j}
                                        className="flex items-center justify-center text-[13px] font-semibold text-[#8F9BB3] py-3 px-5">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="bg-white">
                        {table.getRowModel().rows.map((row, i) => (
                            <tr key={i}
                                className="grid w-full cursor-pointer text-center border-b border-[bbc0c5]"
                                onClick={() => props.onRowClick?.(row.original)}
                                style={{ gridTemplateColumns: gridTemplate }}>

                                {row.getVisibleCells().map((cell, j) => (
                                    <td key={j}
                                        className="text-[12px] pt-7 pb-4 px-5 flex items-center justify-center"
                                        onClick={(e) => { e.stopPropagation(); props.onRowClick?.(row.original) }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6">
                                    Нет данных
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TableFooter table={table} pageSizeOptions={pageSize} />
        </div>
    );
}
