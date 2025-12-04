import { observer } from "mobx-react-lite"
import { ProfileView } from "./view"
import updateUserModel from "./model/update-user"
import { EditProfileView } from "./edit-profile-view"
import { useEffect } from "react"

export const Profile = observer(() => {
    useEffect(() => {
        updateUserModel.setPage(1);
    }, [])
    return updateUserModel.pageIndex === 1 ? <ProfileView/> : <EditProfileView/>
})