// import { AddAddress } from "./add-address-2"
import { AddDetails } from "./add-details";
import { observer } from "mobx-react-lite";
import { Created } from "./created";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import YandexMapComponent from "./add-adderss";
import { createOrderModel } from "./packages/entities/create-order-model";
import { useAuth } from "@/packages/entities/user/context";
import { getAdressCoordinates } from "@/packages/shared-ui/mapVK/mapVk-functions";
import Cookies from "universal-cookie";

export const CreateOrder = observer(() => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { tab } = useParams();
    const cookie = new Cookies();
    const { init, changeAddress, model, saveData, changeMunicipality, clearData, save } = createOrderModel;
    const { user } = useAuth();


    useEffect(() => {
        if (params.get("adress") !== null) {
            getAdressCoordinates({ lat: Number(params.get("latitude")), lng: Number(params.get("longitude")) || 0 }, (data: any) => {

                changeAddress(data.address || "");
                changeMunicipality(data.address_details.subregion)

                model.longitude = Number(params.get("longitude"))
                model.latitude = Number(params.get("latitude"))
            })
        }
        init(cookie.get("order") !== undefined ? cookie.get("order") : null);
    }, [])

    return (
        <>
            {tab === "map" && <YandexMapComponent getPage={() => { navigate('/trieco/client/order/create/detail'); saveData() }} />}
            {tab === "detail" && <AddDetails getPage={() => { save(user?.id); navigate('/trieco/client/order/create/сreated'); }} />}
            {tab === "сreated" && <Created getPage={() => { navigate('/trieco/client/orders'); clearData() }} />}
            {/* {pageCounter === 4 && <></>} */}
        </>
    )

})