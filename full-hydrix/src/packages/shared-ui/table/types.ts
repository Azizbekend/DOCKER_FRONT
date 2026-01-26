import { Table } from "@tanstack/react-table";

export interface TableColumn<T> {
    key: string;
    header: string;
    width?: string;
    cell?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
    classNames?: {
        wrapper?: string;
        body?: string;
        table?: string;
        thead?: string;
        tbody?: string;
        tfoot?: string;
    }
    columns: TableColumn<T>[];
    data: T[];
    countActive?: boolean,
    options?: {
        pageSize: number[],
        pageSizeActive?: number;
    };
    id?: string;
    onRowClick?: (value: any, event?: any) => void;
}

export interface TableFooterProps<T> {
    table: Table<T>;
    pageSizeOptions: number[];

    pageIndex: number;
    pageSize: number;

    onPageChange: (pageIndex: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}
