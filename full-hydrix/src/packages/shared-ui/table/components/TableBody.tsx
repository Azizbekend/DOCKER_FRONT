// components/TableBody.tsx
import { flexRender } from "@tanstack/react-table";
import { TableEmpty } from "./TableEmpty";

export const TableBody = ({ table, gridTemplate, onRowClick, className }: any) => {
    const rows = table.getRowModel().rows;

    if (!rows.length) return <TableEmpty colSpan={table.getAllColumns().length} />;

    return (
        <tbody className={`divide-y divide-gray-100 ${className}`}>
            {rows.map((row: any, i: number) => (
                <tr
                    key={i}
                    className="grid text-center items-center hover:bg-blue-50 cursor-pointer"
                    style={{ gridTemplateColumns: gridTemplate }}
                    onClick={() => onRowClick?.(row.original)}
                >
                    {row.getVisibleCells().map((cell: any, j: number) => (
                        <td
                            key={j}
                            className="py-4 px-5 text-sm flex justify-center"
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};
