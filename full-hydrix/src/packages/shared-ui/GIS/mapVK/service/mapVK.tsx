// Пропсы для работы с картой
export type Props = {
    mapContainer?: any,
    mapRef?: any,
    markerRef?: any,

    result?: any,
    type?: string,
    setType?: any,
    value?: string,
    getResultMap?: (data: Result) => void,
}

export type Result = {
    address: string,
    address_details: any,
    pin: [number, number],
}

// Пропсы для дефолтных данных карты
export type MapData = {
    initialZoom: number,
    initialCenter: [number, number],
    token: string,
}