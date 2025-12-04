import { baseInstance } from "../api";

export const getFNSData = (params: GetFNSRequest) => {
    return baseInstance.get("/fns/egr", {
        params: {
            key: import.meta.env.VITE_FNS_KEY,
            req: params.INN
        }
    })
}

export type GetFNSRequest = {
    INN: string;
}