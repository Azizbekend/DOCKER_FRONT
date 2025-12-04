import { useParams } from "react-router-dom";

import Passport from "@pages/Dispatch/About/Passport.jsx";
import Scheme from "@pages/Dispatch/About/Scheme/Scheme.jsx";
import TimModel from "@pages/Dispatch/About/TimModel.jsx";
import EquipmentRegistry from "@pages/Dispatch/About/EquipmentRegistry.jsx";
import RequestRegistry from "@pages/Dispatch/About/RequestRegistry.jsx";

export default function Informations() {
    const { about } = useParams();

    // Маппинг параметра URL -> компонент
    const pages = {
        passport: <Passport />,
        scheme: <Scheme />,
        tim_model: <TimModel />,
        equipment_registry: <EquipmentRegistry />,
        request_registry: <RequestRegistry />,
    };

    // Если параметр не совпадает — можно показать заглушку или ничего
    const content = pages[about] || <div>Выберите раздел</div>;

    return (
        <div className="dispatch-account__informations informations-dispatch">
            {content}
        </div>
    );
}
