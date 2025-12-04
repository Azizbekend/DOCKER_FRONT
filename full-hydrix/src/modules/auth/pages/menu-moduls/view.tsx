import { useEffect } from "react";
import authModulsModel from "./models/menu-moduls-model";
import { cartLinks } from "./utils/items-links";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const MenuModulsView = observer(() => {

    const { init, itemsInformations } = authModulsModel;
    useEffect(() => {
        init(cartLinks);
    }, [])



    return (
        <div className="rounded-[10px] w-[664px] bg-white shadow-[0px_0px_8px_rgba(0,_0,_0,_0.25)] shadow-black-200 py-[52px] px-[32px]">
            <div className="text-3xl uppercase font-regular mb-[12px]">Приветствуем в <br /></div>
            <div className="text-3xl uppercase font-extrabold mb-[32px]">ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»</div>
            <div className="flex gap-y-[20px] gap-x-[30px] flex-wrap">
                {itemsInformations.map((item) => {
                    return (
                        <Link to={item.link} className="rounded-md text-white text-[25px] font-bold flex items-center justify-center min-h-[98px] text-center tracking-[-0.5s] w-[calc(50%-30px)] duration-[0.3s] hover:opacity-[0.5]"
                            style={{
                                backgroundColor: item.userIds.length ? "var(--clr-accent)" : "var(--clr-gray-dark)",
                            }}>
                            <span>{item.name}</span>
                        </Link>
                    )
                })}

            </div>
        </div>
    )
})