import instance from "@/app/api/instances";
import { UserRoutes } from "@/app/api/instances-routes";
import { publicIpv4 } from "public-ip";

export const identifyByPhone = (params: IdentifyByPhoneRequest) => {
    return instance.get(UserRoutes.IdentifyByPhone, { params })
}

export const authorization = (params: AuthRequest) => {
    return instance.get(UserRoutes.Authorization, { params })
}

export const authorizationByPhone = (params: AuthByPhoneRequest) => {
    return instance.get(UserRoutes.AuthorizationByPhone, { params })
}

export const getIP = async () => {
    return await publicIpv4();
};

export const getUserById = (params: GetUserById) => {
    return instance.get(UserRoutes.GetById, { params })
}

export type GetUserById = {
    id: number
}

export type AuthByPhoneRequest = {
    Phone: string;
    IpAdress: string;
}

export type AuthRequest = {
    username: string,
    password: string,
    phone: string;
}

export type IdentifyByPhoneRequest = {
    phone: string;
}

export type IdentifyByPhoneResponse = {
    id: number;
}