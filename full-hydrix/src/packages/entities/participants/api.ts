import { authorizationInstance } from "@/app/api/instances/instance-authorization"
import { PassportObject, User, UserRoutes } from "@/app/routers/api-router"
import { UserAttachCompanyType, CreateParticipantType, AttachCompanyType } from "./type"
import { reserchInstance } from "@/app/api/instances"



export const participantCreate = (params: CreateParticipantType) => {
    return authorizationInstance.post(User.create, params)
}

export const userAttachCompany = (params: UserAttachCompanyType) => {
    return authorizationInstance.post(User.attachCompany, params)
}

export const getByCompany = (params: { id: number }) => {
    return reserchInstance.get(PassportObject.byCompany, { params })
}

export const attachCompany = (params: AttachCompanyType) => {
    return reserchInstance.post(PassportObject.attachCompany, params)
}

export const attachUser = (params: { objectCompanyLinkId: number, userId: number }) => {
    return reserchInstance.post(PassportObject.attachUser, params)
}

export const getCompanyObjectLinkId = (params: { companyId: number, objectId: number }) => {
    return reserchInstance.post(PassportObject.getCompanyObjectLinkId, params)
}

export const getBjCompDataId = (params: { objCompLinkId: number }) => {
    return reserchInstance.get(PassportObject.getbjCompDataId, { params })
}

export const deleteUserFromObject = (params: { userId: number, objectCompanyLinkId: number }) => {
    return reserchInstance.post(PassportObject.deleteUserFromObject, params)
}

export const getUserCompanyObjectLinkId = (params: { companyId: number, objectId: number }) => {
    return reserchInstance.post(PassportObject.getUserCompanyObjectLinkId, params)
}

export const getCompanyUsers = (params: { id: number }) => {
    return authorizationInstance.get(UserRoutes.getCompany, { params })
}

export const getCompanybyObject = (params: { id: number }) => {
    return reserchInstance.get(PassportObject.byObject, { params })
}
