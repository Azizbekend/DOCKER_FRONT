// import { AddAddress } from "./add-address-2"
import createOrderModel from "./entities/create-order-model"
import { AddDetails } from "./add-details";
import { observer } from "mobx-react-lite";
import { Created } from "./created";
import YandexMapComponent from "./add-adderss";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Cashless } from "./cashless";
import clientModel from "@/modules/client/kernel/model/client-model";
import adminModel from "@/modules/admin/kernel/model/admin-model";
import { toast } from "react-toastify";

export const CreateOrder = observer(() => {
    const { pageCounter, setPage } = createOrderModel;
    const location = useLocation();
    const { user } = clientModel;
    const [params] = useSearchParams();

    useEffect(() => {
        if (params.get("result") != null) {
            if (params.get('result') === "success") {
                createOrderModel.clearData();
                setPage(4)
                createOrderModel.save(user?.id ?? 0, adminModel.companyId ?? null);
                params.delete('result');
                const newUrl = `${window.location.pathname}?${params.toString()}`;
                window.history.replaceState(null, '', newUrl);
            }
            else {
                toast("Не удалось создать заявку", { progressStyle: { background: "red" } });
            }
        }
    }, [location])

    return (
        <>
            {pageCounter === 1 && <YandexMapComponent />}
            {pageCounter === 2 && <AddDetails />}
            {pageCounter === 3 && <Cashless />}
            {pageCounter === 4 && <Created />}
        </>
    )

})