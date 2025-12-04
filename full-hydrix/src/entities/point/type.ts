export type GetAllPointRequest = {
    userId: number,
}

export type UpdatePointRequest = {
    pointId: number,
    address: string,
    wasteVolume: number,
    latitude: number,
    longitude: number,
}

export type Point = {
    id: number,
    pointId: number,
    address: string,
    wasteVolume: number,
    userId: number,
    latitude: number,
    longitude: number,
}