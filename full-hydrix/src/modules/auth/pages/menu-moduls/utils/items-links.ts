import { Role } from "@/entities/user/role";
import { MenuItemType } from "../services/menu-moduls-service";

export const cartLinks: MenuItemType[] = [
    {
        name: "Единый реестр объектов",
        link: "/domain/list",
        userIds: [Role.Client, Role.Ministry]
    },
    {
        name: "Trieco",
        link: "/trieco",
        userIds: [Role.Client, Role.Ministry]
    },
    {
        name: "Gis",
        link: "/gis/companies",
        userIds: [Role.Client, Role.Ministry]
    },
    {
        name: "управление ЖБО",
        link: "",
        userIds: [Role.Client, Role.Ministry]
    },
    {
        name: "Оцифровка сетей",
        link: "",
        userIds: []
    },
    {
        name: "Лаборатория",
        link: "",
        userIds: []
    },
    {
        name: "Услуги",
        link: "",
        userIds: []
    },
    {
        name: "Сопровождение пользователей",
        link: "",
        userIds: [Role.Client, Role.Ministry]
    },
];