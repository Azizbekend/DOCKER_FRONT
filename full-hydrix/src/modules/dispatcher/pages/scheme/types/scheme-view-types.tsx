export interface ISchemeDrag {
    offset: IOffset,
    setOffset: (IOffset: IOffset) => void,
    bounds: 
}

export interface IOffset {
    x: number,
    y: number
}
export interface IBounds {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
}

