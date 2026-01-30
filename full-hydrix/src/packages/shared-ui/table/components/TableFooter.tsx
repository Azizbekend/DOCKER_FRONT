import { useState } from "react";
import { TableFooterProps } from "../types";
import { Icon } from "../../icon";

export function TableFooter<T>({
    table,
    pageSizeOptions,
    pageIndex,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: TableFooterProps<T>) {
    const [open, setOpen] = useState(false);

    const total = table.getFilteredRowModel().rows.length;
    const start = pageIndex * pageSize;
    const end = start + table.getRowModel().rows.length;

    const canPrev = table.getCanPreviousPage();
    const canNext = table.getCanNextPage();

    return (
        <div className="not-hover w-full pb-10 mt-5">
            <div className="flex flex-row items-center gap-5 justify-center">

                <span className="text-[#717171] text-[14px]">
                    Количество элементов на странице
                </span>

                {/* PAGE SIZE SELECT */}
                <div className="relative">
                    <div
                        className="flex items-center cursor-pointer text-[#717171] border-b border-[#717171]"
                        onClick={() => setOpen(v => !v)}
                    >
                        {pageSize}
                        <Icon
                            systemName="arrow-triangle"
                            className={`ml-3 mb-1 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </div>

                    {open && (
                        <div className="absolute bottom-full right-0 px-[14px] py-[12px] bg-stone-50 rounded-lg shadow z-10">
                            {pageSizeOptions.map(size => (
                                <div
                                    key={size}
                                    className="cursor-pointer hover:text-black"
                                    onClick={() => {
                                        onPageSizeChange(size);
                                        onPageChange(0);
                                        setOpen(false);
                                    }}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RANGE */}
                <span className="text-[#717171] text-[14px]">
                    {total === 0
                        ? "0–0 из 0"
                        : `${start + 1}-${Math.min(end, total)} из ${total}`}
                </span>

                {/* PREV */}
                <div
                    className={`border rounded-md p-2 flex items-center cursor-pointer ${!canPrev && "opacity-40 cursor-not-allowed"
                        }`}
                    onClick={() => canPrev && onPageChange(pageIndex - 1)}
                >
                    <Icon
                        width={12}
                        height={12}
                        systemName={`table-arrow${canPrev ? "-active" : ""}`}
                        className="rotate-180"
                    />
                </div>

                {/* NEXT */}
                <div
                    className={`border rounded-md p-2 flex items-center cursor-pointer ${!canNext && "opacity-40 cursor-not-allowed"
                        }`}
                    onClick={() => canNext && onPageChange(pageIndex + 1)}
                >
                    <Icon
                        width={12}
                        height={12}
                        systemName={`table-arrow${canNext ? "-active" : ""}`}
                    />
                </div>
            </div>
        </div>
    );
}
