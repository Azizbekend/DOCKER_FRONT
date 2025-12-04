import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { Icon } from "../icon";
import { TableFooterProps } from "./setting/types";

export function TableFooter<T>({ table, pageSizeOptions }: TableFooterProps<T>) {
    const [open, setOpen] = useState(false);

    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;

    const total = table.getFilteredRowModel().rows.length;
    const start = pageIndex * pageSize;
    const end = start + table.getRowModel().rows.length;

    return (
        <div className="w-full pb-5 mt-5">
            <div className="flex flex-row items-center gap-5 justify-center">

                <span className="text-[#717171] text-[14px] flex items-center">
                    Количество элементов на странице
                </span>

                <div className="relative">
                    <div
                        className="flex items-center cursor-pointer text-[#717171] border-b-[1px] border-[#717171]"
                        onClick={() => setOpen(!open)}
                    >
                        {pageSize}
                        <Icon
                            systemName="arrow-triangle"
                            className={`ml-3 mb-1 ${open && "rotate-180"}`}
                        />
                    </div>

                    <div
                        className={`absolute bottom-full right-0 px-[14px] py-[12px] bg-stone-50 rounded-lg shadow-[0_0px_15px_-3px_rgb(0_0_0_/_0.2)] z-10 ${!open && "hidden"
                            }`}
                    >
                        {pageSizeOptions.map((size) => (
                            <div
                                key={size}
                                className="cursor-pointer"
                                onClick={() => {
                                    table.setPageSize(size);
                                    setOpen(false);
                                }}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                <span className="text-[#717171] text-[14px]">
                    {start + 1}-{Math.min(end, total)} из {total}
                </span>

                <div
                    className="border border-gray-300 rounded-md p-2 flex items-center cursor-pointer"
                    onClick={() => table.getCanPreviousPage() && table.previousPage()}
                >
                    <Icon
                        width={12}
                        height={12}
                        systemName={`table-arrow${table.getCanPreviousPage() ? "-active" : ""}`}
                        className="rotate-180"
                    />
                </div>

                <div
                    className="border border-gray-300 rounded-md p-2 flex items-center cursor-pointer"
                    onClick={() => table.getCanNextPage() && table.nextPage()}
                >
                    <Icon
                        width={12}
                        height={12}
                        systemName={`table-arrow${table.getCanNextPage() ? "-active" : ""}`}
                    />
                </div>
            </div>
        </div>
    );
}
