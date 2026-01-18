import { makeAutoObservable } from "mobx";
import { Crumb } from "./type";



class BreadcrumbsStore {
    crumbs: Crumb[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    set(crumbs: Crumb[]) {
        this.crumbs = crumbs.map((c, i) => ({ ...c, key: c.key ?? `${c.title}-${i}` }));
    }

    push(crumb: Crumb) {
        // avoid duplicates for same path
        const exists = this.crumbs.find((c) => c.path && crumb.path && c.path === crumb.path);
        if (!exists) this.crumbs.push({ ...crumb, key: crumb.key ?? `${crumb.title}-${Date.now()}` });
    }

    pop() {
        this.crumbs.pop();
    }

    clear() {
        this.crumbs = [];
    }
}
export const breadcrumbsStore = new BreadcrumbsStore();
