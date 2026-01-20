import { authorizationInstance } from "@/app/api/instances/instance-authorization"
import { PassportObject, User } from "@/app/routers/api-router"
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
