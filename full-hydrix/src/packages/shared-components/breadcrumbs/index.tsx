import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { TestBreadcrumbsProps } from "./type";

export const Breadcrumbs = observer(({ routes, classNames }: TestBreadcrumbsProps) => {
    return (
        <nav aria-label="Breadcrumb" className={classNames?.container}>
            <ol className={`flex items-center text-sm ${classNames?.items}`} role="list">
                {routes.length > 0 && routes.map((item, i) => {
                    const isLast = i === routes.length - 1;
                    return (
                        <li key={i} className={`flex items-center ${classNames?.item}`}>
                            {i !== 0 && <span className="px-2" aria-hidden>/</span>}

                            {isLast
                                ?
                                <Link to={item.path} className="hover:opacity-50 duration-300" onClick={(e) => { item.path }}>{item.name}</Link>
                                :
                                <span aria-current={isLast ? 'page' : undefined}>{item.name}</span>
                            }
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
});