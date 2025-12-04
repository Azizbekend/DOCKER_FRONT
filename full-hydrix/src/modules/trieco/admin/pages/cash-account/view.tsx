import { observer } from "mobx-react-lite";
import { CashAccountBlock } from "./components/cash-account-block";
import { TableView } from "./components/table";

export const CashAccountView = observer(() => {
    return(
        <>
            <div className="mt-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col w-[100%] gap-6">
                        <span className="text-[34px] font-semibold">Счет</span>
                        <div className="flex gap-[18px]">
                            <CashAccountBlock title="Расчеты с юр. лицами и ИП" value="0,00"/>
                            <CashAccountBlock title="Наличные расчеты" value="0,00"/>
                            <CashAccountBlock title="Эквайринг расчеты" value="0,00"/>
                            <CashAccountBlock title="Предоплаты" value="0,00"/>
                        </div>
                        <TableView />
                    </div>
                </div>
            </div>
        </>
    )
})
