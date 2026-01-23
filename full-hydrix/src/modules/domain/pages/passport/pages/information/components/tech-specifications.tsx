import { observer } from "mobx-react-lite";
import { BlockContainer } from "../../../../../../../packages/shared-components/container-blocks/block-container";
import { PassportModelIndicatorType } from "@/packages/entities/object/type";

export const TechSpecifications = observer(({ data }: { data: PassportModelIndicatorType }) => {
    return (
        <BlockContainer title="Технические характеристики" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                        {data.designPerformance.name}
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                        {data.designPerformance.value}
                    </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                        {data.hourEfficiency.name}
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                        {data.hourEfficiency.value}
                    </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                        {data.dayEfficiency.name}
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                        {data.dayEfficiency.value}
                    </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                        {data.electroConsumption.name}
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                        {data.electroConsumption.value}
                    </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                        {data.waterConsumption.name}
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                        {data.waterConsumption.value}
                    </div>
                </div>

            </div>
        </BlockContainer >
    )
})