import { useEffect } from "react";
import authModulsModel from "./models/menu-moduls-model";
import { cartLinks, cartLinksCompany } from "./utils/items-links";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";
import { Role } from "@/packages/entities/user/enums";

export const MenuModulsView = observer(() => {
    const { init, itemsInformations } = authModulsModel;
    const { user } = useAuth();

    useEffect(() => {
        if (user?.roleId == Role.Ministry) {
            init(cartLinks);
        } else {
            init(cartLinksCompany);
        }
    }, []);

    return (
        <div
            className="rounded-2xl w-full max-w-[664px] bg-white shadow-xl border border-gray-100 py-12 px-8"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
            <div className="text-center mb-8">
                <div className="text-2xl md:text-3xl uppercase font-normal text-gray-700 mb-2">
                    Приветствуем в
                </div>
                <div className="text-3xl md:text-3xl uppercase font-bold text-[#4A85F6]">
                    ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {itemsInformations.map((item, index) => {
                    const hasAccess = item.userIds.length > 0;
                    return hasAccess ?
                        <Link
                            key={index}
                            to={item.link}
                            className={`rounded-xl text-white text-lg md:text-xl font-bold flex items-center justify-center min-h-[100px] text-center px-4 py-6 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-[#4A85F6] hover:from-[#3a6bc9] hover:to-[#2a52a0]`}
                        >
                            <span className="tracking-wide">{item.name}</span>
                        </Link>

                        :

                        <div
                            key={index}
                            className={`rounded-xl text-white text-lg md:text-xl font-bold flex items-center justify-center min-h-[100px] text-center px-4 py-6 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-gray-500 opacity-70`}
                        >
                            <span className="tracking-wide">{item.name}</span>
                        </div>

                })}
            </div>
        </div >
    );
});
