export type Crumb = {
    key: string;
    title: string;
    path?: string;
};


export type RouteConfig = {
    path: string;
    breadcrumb?: (params: Record<string, string>) => string | null;
};

export type BreadcrumbsProps = {
    routes?: RouteConfig[];
    separator?: React.ReactNode;
    className?: string;
    maxItems?: number;
    hideLast?: boolean;
};

export type TestBreadcrumbsProps = {
    routes: {
        name: string;
        path: string;
    }[],
    classNames?: {
        container?: string;
        items?: string;
        item?: string;
        active?: string;
    };
};
