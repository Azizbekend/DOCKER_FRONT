// export type TableType = {
//     data: any[];
//     columns: ExtendedColumnDef<any, any>[];
//     class?: string;
//     pageSize?: number;
//     onRowClick?: (value: any, event?: any) => void;
// }

import { Table } from "@tanstack/react-table";

// export type TableContainerType = {
//     className?: string,

// }
// export type TableHeadType = {
// }
// export type TableBodyType = {
// }
// export type TableFooterType = {
// }


// export type ExtendedColumnDef<TData, T> = ColumnDef<TData, T> & {
//     canSort?: boolean;
//     filterOptions?: Filter[];
// }

// export type Filter = {
//     value?: number;
//     title: string;
// }


export interface TableColumn<T> {
    key: string;
    header: string;
    width?: string;
    cell?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
    classNames?: {
        body?: string;
        table?: string;
        thead?: string;
        tbody?: string;
        tfoot?: string;
    }
    columns: TableColumn<T>[];
    data: T[];
    options?: {
        pageSize: number[],
    };
    onRowClick?: (value: any, event?: any) => void;
}

export interface TableFooterProps<T> {
    table: Table<T>;
    pageSizeOptions: number[];
}