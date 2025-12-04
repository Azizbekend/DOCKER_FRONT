import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";
import { breadcrumbsStore } from "./model";
import { BreadcrumbsProps, Crumb } from "./type";
import { dataRoute } from "./data-route";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = observer(({ className = "", maxItems, hideLast = true }) => {
    const store = breadcrumbsStore;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const segments = location.pathname.split("/").slice(1, -1);

        const built: Crumb[] = [];
        let accumulated = "";

        for (let i = 0; i < segments.length; i++) {
            accumulated += `/${segments[i]}`;

            // find a matching route
            const route = dataRoute[segments[i]];
            if (route) {
                // extract params using matchPath
                const m = matchPath({ path: route.path, end: false }, accumulated);
                const params = (m && (m.params as Record<string, string>)) || {};
                const title = typeof route.breadcrumb === 'function' ? route.breadcrumb(params) : route.breadcrumb ?? segments[i];
                if (title) built.push({ key: `${accumulated}-${i}`, title, path: accumulated });
            } else {
                // fallback: use segment
                built.push({ key: `${accumulated}-${i}`, title: decodeURIComponent(segments[i]), path: accumulated });
            }
        }

        store.set(built);
    }, []);

    // const items = store.crumbs.slice();
    // const showItems = typeof maxItems === 'number' && items.length > maxItems ? items.slice(items.length - maxItems) : items;

    // if (showItems.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={className}>
            {/* <ol className="flex items-center text-sm" role="list">
                {showItems.map((c, i) => {
                    const isLast = i === showItems.length - 1;
                    return (
                        <li key={c.key} className="flex items-center">
                            {i !== 0 && <span className="px-2" aria-hidden></span>}

                            {c.path && (!isLast || !hideLast) ? (
                                <Link to={c.path} className="hover:underline" onClick={(e) => { }}>{c.title}</Link>
                            ) : (
                                <span aria-current={isLast ? 'page' : undefined}>{c.title}</span>
                            )}
                        </li>
                    );
                })}

            </ol> */}
        </nav>
    );
});