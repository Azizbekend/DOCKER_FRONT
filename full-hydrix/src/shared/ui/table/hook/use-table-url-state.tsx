// hooks/useTableUrlState.ts
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

type Options = {
    tableId: string;
    defaultPage?: number;
    defaultPageSize?: number;
};

export const useTableUrlState = ({ tableId, defaultPage = 0, defaultPageSize = 10, }: Options) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const key = (name: string) => `${tableId}_${name}`;

    const getNumber = (name: string, fallback: number) => {
        const value = searchParams.get(key(name));
        return value ? Number(value) : fallback;
    };

    const pageIndex = getNumber("page", defaultPage);
    const pageSize = getNumber("pageSize", defaultPageSize);
    const scroll = getNumber("scroll", 0);

    const setParam = useCallback(
        (name: string, value: number) => {
            setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                next.set(key(name), String(value));
                return next;
            });
        },
        [setSearchParams]
    );

    return {
        pageIndex,
        pageSize,
        scroll,

        setPageIndex: (v: number) => setParam("page", v),
        setPageSize: (v: number) => setParam("pageSize", v),

        saveScroll: (el?: HTMLElement | null) => {
            const value = el ? el.scrollTop : window.scrollY;
            setParam("scroll", value);
        },

        restoreScroll: (el?: HTMLElement | null) => {
            requestAnimationFrame(() => {
                if (el) el.scrollTop = scroll;
                else window.scrollTo({ top: scroll });
            });
        },
    };
};
