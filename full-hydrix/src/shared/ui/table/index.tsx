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

    const gridTemplate = useMemo(() => {
        return props.columns
            .map(col => col.width || "1fr")
            .join(" ");
    }, [props.columns]);


    const columns = useMemo(() => {
        return props.columns.map(col => ({
            accessorKey: col.key,
            header: col.header,
            cell: (info: any) => {
                const row = info.row.original;
                return col.cell ? col.cell(row) : row[col.key];
            }
        }));
    }, [props.columns]);

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
                            <tr key={i} className={`grid items-center`}
                                style={{
                                    gridTemplateColumns: gridTemplate,
                                }}>
                                {headerGroup.headers.map((header, j) => {
                                    return (
                                        <th
                                            key={j}
                                            className="flex items-center justify-center 2xl:text-[15px] text-[13px] font-semibold text-[#8F9BB3] mt-5 py-3 px-5 relative"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="bg-white">
                        {table.getRowModel().rows.map((row, i) => (
                            <tr
                                key={i}
                                className={`grid w-full cursor-pointer  text-center border-b border-[bbc0c5]`}
                                onClick={() => props.onRowClick?.(row.original)}
                                style={{
                                    gridTemplateColumns: gridTemplate,
                                }}
                            >
                                {row.getVisibleCells().map((cell, j) => {
                                    return (
                                        <td
                                            key={j}
                                            className="2xl:text-[14px] text-[12px] text-center pt-7 pb-4 px-5 flex flex-cols items-center justify-center "
                                            // className="2xl:text-[14px] text-[12px] text-center pt-7 pb-4 px-5 flex items-center"
                                            onClick={(e) => { e.stopPropagation(); props.onRowClick && props.onRowClick(row.original) }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}

                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={props.columns.length}
                                    className="text-center py-6"
                                >
                                    Нет данных
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TableFooter
                table={table}
                pageSizeOptions={pageSize}
            />
        </div>
    );
}
