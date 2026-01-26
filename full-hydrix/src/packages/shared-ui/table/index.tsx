import { TableProps } from "./types";
import { TableFooter } from "./components/TableFooter";

import { useTableColumns } from "./hooks/useTableColumns";
import { useTableGridTemplate } from "./hooks/useTableGridTemplate";
import { useTanstackTable } from "./hooks/useTanstackTable";
import { useTableStorageState } from "./hooks/useTablуStorageState";

import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";

export function Table<T>(props: TableProps<T>) {


    const tableState = useTableStorageState({
        tableId: props.id!,
        defaultPageSize: 20,
    });

    const columns = useTableColumns(props.columns, props.countActive);
    const gridTemplate = useTableGridTemplate(props.columns, props.countActive);

    const table = useTanstackTable({
        data: props.data,
        columns,
        pageIndex: tableState.pageIndex,
        pageSize: tableState.pageSize,
        onPaginationChange: (page, size) => {
            tableState.setPageIndex(page);
            tableState.setPageSize(size);
        },
    });


    return (
        <div className={`bg-white rounded-2xl shadow overflow-hidden border mb-10 ${props.classNames?.wrapper}`}>
            <div className={"overflow-auto h-[80vh] " + props.classNames?.body}>
                <table className={`min-w-[1100px] w-full ${props.classNames?.table}`}>
                    <TableHeader table={table} gridTemplate={gridTemplate} />
                    <TableBody
                        table={table}
                        gridTemplate={gridTemplate}
                        onRowClick={props.onRowClick}
                    />
                </table>
            </div>

            <TableFooter
                table={table}
                pageSizeOptions={props.options?.pageSize || [10, 20, 50, 100]}
                pageIndex={tableState.pageIndex}
                pageSize={tableState.pageSize}
                onPageChange={tableState.setPageIndex}
                onPageSizeChange={tableState.setPageSize}
            />

        </div>
    );
}
