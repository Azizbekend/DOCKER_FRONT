// TODO: Реализовать работу с API
// import instance from "@/api/instances";
// import { UserRoutes } from "@/api/api-router";

// export const register = (params: RegistrationRequest) => {
//     return instance.post(UserRoutes.Create, params);
// }

export type RegistrationType = {
    organizationName: string;
    email: string;
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    inn: string;
    kpp: string;
    address: string;
    ogrn: string;
    municipal: string;
}

export type RegistrationProps = {
    show: boolean;
    onClose: () => void;
}