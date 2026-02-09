// components/TableHeader.tsx
import { flexRender } from "@tanstack/react-table";

export const TableHeader = ({ table, gridTemplate }: any) => (
    <thead className="bg-blue-50 sticky top-0">
        {table.getHeaderGroups().map((group: any, i: number) => (
            <tr
                key={i}
                className="grid items-center"
                style={{ gridTemplateColumns: gridTemplate }}
            >
                {group.headers.map((header: any, j: number) => (
                    <th
                        key={j}
                        className="py-4 px-5 text-xs font-semibold text-gray-700 uppercase text-center whitespace-pre-line"
                    >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                ))}
            </tr>
        ))}
    </thead>
);
