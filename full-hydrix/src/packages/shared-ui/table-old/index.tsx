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
  const [pageSize] = useState<number[]>(props.options?.pageSize || [10, 20, 50, 100]);

  const columns = useMemo(() => {
    const baseCols = props.columns.map(col => ({
      accessorKey: col.key,
      header: col.header,
      cell: (info: any) => {
        const row = info.row.original;
        return col.cell ? col.cell(row) : row[col.key];
      }
    }));
    

    if (props.countActive) {
      return [
        {
          accessorKey: "__index",
          header: "№",
          cell: (info: any) => info.row.index + 1,
        },
        ...baseCols
      ];
    }
    return baseCols;
  }, [props.columns, props.countActive]);

  const gridTemplate = useMemo(() => {
    return columns
      .map((_, index) => {
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

    
    <div className={"bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10" + props.classNames?.body}>

      

      <div className="overflow-x-auto max-h-[80vh]">
        <table className={"min-w-[1100px] w-full " + props.classNames?.table} >
          <thead className="bg-blue-50 sticky top-0">
            {table.getHeaderGroups().map((headerGroup, i) => (
              <tr key={i} className="grid items-center" style={{ gridTemplateColumns: gridTemplate }}>
                {headerGroup.headers.map((header, j) => (
                  <th
                    key={j}
                    className="py-4 px-5 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={i}
                className="grid w-full text-center bg-white hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                onClick={() => props.onRowClick?.(row.original)}
                style={{ gridTemplateColumns: gridTemplate }}
              >
                {row.getVisibleCells().map((cell, j) => (
                  <td
                    key={j}
                    className="py-4 px-5 text-sm text-gray-800 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onRowClick?.(row.original);
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mb-3 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.326"
                      />
                    </svg>
                    <span className="text-gray-600 font-medium">Нет данных для отображения</span>
                  </div>
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
