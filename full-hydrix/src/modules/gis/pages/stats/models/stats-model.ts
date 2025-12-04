import { makeAutoObservable } from "mobx";
import { asdGetByIdWaterCompany, getTableMunicipalities, getTableOrders, getTablePlants, MunicipalitiesResult, MunicipalityStats, OrdersStats, PlantsStats, OrdersStatsResult, PlantsStatsResult } from "../services/stats";
import { toast } from "react-toastify";
import { OrderStatus } from "@/entities/order/order-status";


export class StatsModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    pageName: string | null = 'municipalities'
    loader: boolean = false
    _breadCrumbs: { plant: string, order: string } = { plant: "", order: "" }

    _model: (MunicipalityStats | PlantsStats | OrdersStats)[] = [];
    _searchedModel: (MunicipalityStats | PlantsStats | OrdersStats)[] = [];
    public isSearch: boolean = false;
    _searchValue: string = ''
    // day week month year
    _filterTerm: string = 'day'

    _dateForGet: { startDate: Date | null, endDate: Date | null } = {
        endDate: new Date(),
        startDate: (() => {
            const today = new Date();
            today.setDate(1);
            today.setMonth(today.getMonth() - 1);
            return today;
        })(),
    };



    _municipalitiesResult: MunicipalitiesResult = {
        totalCount: 0,
        extractVolume: 0,
        recycleVolume: 0,
    };

    _plantsResult: PlantsStatsResult = {
        orderCount: 0,
        recycleVolume: 0,
        dailyLimit: 0,
    };

    _ordersResult: OrdersStatsResult = {
        countOrders: 0,
        totalVolumeExported: 0,
        costExported: 0,
        costDisposed: 0,
    };

    get municipalitiesResult() {
        return this._municipalitiesResult;
    }

    get plantsResult() {
        return this._plantsResult;
    }

    get ordersResult() {
        return this._ordersResult;
    }

    get filterTerm() {
        return this._filterTerm;
    }

    get searchValue() {
        return this._searchValue;
    }

    get model() {
        return this._model;
    }

    get searchedModel() {
        return this._searchedModel;
    }

    get dateForGet() {
        return this._dateForGet;
    }

    get breadCrumbs() {
        return this._breadCrumbs;
    }

    changeBreadCrumbsPlant(plant: string) {
        this._breadCrumbs.plant = plant;
    }

    changeBreadCrumbsOrder(order: string) {
        this._breadCrumbs.order = order;
    }

    changeDateForGet(startDate: Date | null, endDate: Date | null) {
        if (startDate !== null && endDate !== null) {
            this._dateForGet.startDate = startDate;
            this._dateForGet.endDate = endDate;

            if (this.pageName === "municipalities") this.getMunicipalitiesStats();
            // if (this.pageName === "plants") this.getPlantsStats();
            // if (this.pageName === "orders") this.getOrdersStats();

        } else {
            toast("Выберете полный период", { progressStyle: { background: "red" } })
        }
    }

    defultDateForGet() {
        this._dateForGet = {
            endDate: new Date(),
            startDate: (() => {
                const today = new Date();
                today.setDate(1);
                return today;
            })(),
        };
    }

    setPageName(value: string | null) {
        this.pageName = value
        localStorage.setItem('pageName', value ?? "");
    }

    switchLoader(value: boolean) {
        this.loader = value
    }

    search(value: string) {
        this._searchValue = value;
        this.isSearch = value !== "";

        if (this._model.length > 0) {
            this._searchedModel = this._model.filter((x) => {
                if ('municipalityName' in x) {
                    const searchStr = x.municipalityName.toLowerCase();
                    return searchStr.includes(value.toLowerCase());
                } else if ('plantName' in x) {
                    const searchStr = x.plantName.toLowerCase();
                    return searchStr.includes(value.toLowerCase());
                } else if ('arrivalEndDate' in x) {
                    const searchStr = x.arrivalEndDate.toString();
                    return searchStr.includes(value);
                }
                return false;
            });
        }
    }

    filterTermChange(value: string) {
        this._filterTerm = value
    }

    convertDateString(date: Date | null | string) {

        if (date === null) return ""

        if (typeof date === "string") return date

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;

    }

    async getMunicipalitiesStats() {
        const data = {
            EndDate: String(this._dateForGet.endDate?.toISOString()),
            StartDate: String(this._dateForGet.startDate?.toISOString()),
        }

        await getTableMunicipalities(data)
            .then((x) => {

                if (x.data && Array.isArray(x.data)) {

                    this._municipalitiesResult = {
                        totalCount: 0,
                        extractVolume: 0,
                        recycleVolume: 0,
                    };

                    this._municipalitiesResult = x.data.reduce((acc, element) => {
                        acc.totalCount += element.totalCount;
                        acc.extractVolume += element.extractVolume;
                        acc.recycleVolume += element.recycleVolume;
                        return acc;
                    }, {
                        totalCount: this._municipalitiesResult.totalCount || 0,
                        extractVolume: this._municipalitiesResult.extractVolume || 0,
                        recycleVolume: this._municipalitiesResult.recycleVolume || 0
                    });
                } else {
                    console.warn("x.data is not an array or is empty");
                }
                this._model = []

                this._model = x.data;
            })
            .catch((e) => {
                console.error(e)
                // toast("Ошибка при получении данных", { progressStyle: { background: "red" } })
            })
            .finally(() => {
                this.switchLoader(true)
            })
    }

    async getPlantsStats(id: number, municipalityName?: string) {

        const data = {
            WaterCompanyId: id,
            EndDate: String(this._dateForGet.endDate?.toISOString()),
            StartDate: String(this._dateForGet.startDate?.toISOString()),
        }

        await getTablePlants(data)
            .then(x => {

                this._model = []

                let temporaryModel: PlantsStats[] = []

                if (municipalityName) {

                    temporaryModel = x.data.filter((element: any) =>
                        element.address.toLowerCase().includes(municipalityName.toLowerCase())
                    );

                } else {
                    x.data.forEach((element: any) => {
                        temporaryModel.push(element)
                    });
                }

                this._model = temporaryModel

                this._plantsResult = {
                    orderCount: 0,
                    recycleVolume: 0,
                    dailyLimit: 0,
                };

                if (x.data && Array.isArray(x.data)) {
                    this._plantsResult = temporaryModel.reduce((acc, element) => {
                        acc.orderCount += element.orderCount;
                        acc.recycleVolume += element.recycleVolume;
                        acc.dailyLimit += element.dailyLimit;
                        return acc;
                    }, {
                        orderCount: this._plantsResult.orderCount || 0,
                        recycleVolume: this._plantsResult.recycleVolume || 0,
                        dailyLimit: this._plantsResult.dailyLimit || 0
                    });
                } else {
                    console.warn("x.data is not an array or is empty");
                }
            })
            .catch((e) => {
                console.error(e)
                // toast("Ошибка при получении данных", { progressStyle: { background: "red" } })
            })
            .finally(() => {
                this.switchLoader(true)
            })
    }

    async getOrdersStats(plantId: number) {
        const data = {
            PlantId: plantId,
            EndDate: String(this._dateForGet.endDate?.toISOString()),
            StartDate: String(this._dateForGet.startDate?.toISOString()),
        }

        await getTableOrders(data)
            .then(x => {

                if (x.data && Array.isArray(x.data)) {
                    this._ordersResult = x.data.reduce((acc, element) => {
                        if (element.orderStatusId == OrderStatus.Done) {
                            acc.countOrders += 1;
                        }

                        acc.totalVolumeExported += element.wasteVolume;
                        acc.costExported += (element.wasteVolume * element.сost);
                        acc.costDisposed += element.сost;
                        return acc;
                    }, {
                        countOrders: this._ordersResult.countOrders || 0,
                        totalVolumeExported: this._ordersResult.totalVolumeExported || 0,
                        costExported: this._ordersResult.costExported || 0,
                        costDisposed: this._ordersResult.costDisposed || 0,
                    });
                } else {
                    console.warn("x.data is not an array or is empty");
                }


                this._model = []

                this._model = x.data;
            })
            .catch((e) => {
                console.error(e)
                // toast("Ошибка при получении данных", { progressStyle: { background: "red" } })
            })
            .finally(() => {
                this.switchLoader(true)
            })
    }
}

const statsModel = new StatsModel();
export default statsModel;