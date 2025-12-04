import { OperatorRole } from "../user/hooks";

export type Operator = {
    userId?: number,
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    login: string;
    roleName?: string | OperatorRole;
    isRevoked?: boolean;
    waterCompanyId?: number;
    plantId?: number;
    workplace?: string;
}