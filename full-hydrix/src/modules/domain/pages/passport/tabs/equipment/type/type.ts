export type ItemsTableType = {
    name: string,
    adress: string,
    marka: string,
    manufacturer: string,
    supplier: string,
    status: number
}



export const StatusClass = (status: number) => {
    switch (status) {
        case 1:
            return "_green"
        case 2:
            return "_gray"
        case 3:
            return "_red"
    }

}
export const StatusText = (status: number) => {
    switch (status) {
        case 1:
            return "В работе"
        case 2:
            return "В ожидании"
        case 3:
            return "Авария"
    }

}