// hooks/useTableStorageState.ts
import { useEffect, useState } from "react";

type Options = {
    tableId: string;
    defaultPageIndex?: number;
    defaultPageSize?: number;
};

type TableState = {
    pageIndex: number;
    pageSize: number;
};

export const useTableStorageState = ({ tableId, defaultPageIndex = 0, defaultPageSize = 10, }: Options) => {
    const storageKey = `table:${tableId}`;

    const read = (): TableState => {
        const raw = sessionStorage.getItem(storageKey);
        if (raw) {
            return JSON.parse(raw);
        }
        return {
            pageIndex: defaultPageIndex,
            pageSize: defaultPageSize,
        };
    };

    const [state, setState] = useState<TableState>(read);


    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(state));
    }, [state, storageKey]);

    return {
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,

        setPageIndex: (pageIndex: number) => setState(s => ({ ...s, pageIndex })),
        setPageSize: (pageSize: number) => setState(s => ({ ...s, pageSize })),
        reset: () => { sessionStorage.removeItem(storageKey); setState(read()); },
    };
};
