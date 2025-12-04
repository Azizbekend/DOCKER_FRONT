import { Station } from "./components/station";
import { NoStations } from "./components/no-stations";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Plant } from "@/entities/plants/types";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { Search } from "@/shared/ui/Inputs/input-search";

type Props = {
    plants: Plant[];
}

export const DrainStations = observer(({ plants }: Props) => {
    const [filteredPlants, setFiltered] = useState(plants);
    const { search, setSearch, results } = useSearch<Plant>({ data: plants, searchFields: ['firstName', 'lastName', 'patronymic', 'email', 'phone'] })

    useEffect(() => {
        setFiltered(results);
    }, [results]);

    const handleSearch = (value: string) => {
        if (value.length === 0) {
            setFiltered(results)
            return;
        }

        setFiltered(filteredPlants.filter(x => x.name.includes(value) || x.adress.includes(value)))
    }

    return (
        <div className="border-1 bg-white shadow rounded-md py-[36px] px-[29px] mb-[40px]">
            <div className="flex justify-between items-center mr-9">
                <h1 className="text-[25px] leading-[96%] text-[#222b45] font-[600]">Сливные станции</h1>
                <div className="flex items-center justify-center">
                    <Search
                        placeholder="Поиск..."
                        value={search}
                        onChange={setSearch}
                        classNames={{
                            container: "w-min rounded-lg h-[38px]",
                            input: "!w-[400px]",
                        }}
                    />
                </div>
            </div>
            {filteredPlants.length === 0 && <NoStations />}
            {
                filteredPlants.map((x, index) => (
                    <div key={index}>
                        <Station
                            title={`Сливная станция ${index + 1}`}
                            subtitle={x.name}
                            adress={x.adress}
                            coordinates={`${x.latitude}, ${x.longitude}`}
                            daily_limit={x.dailyLimit}
                            serviced_area={x.municipalities?.map(m => m.name).join(", ") || ""}
                        />
                        {index < filteredPlants.length - 1 && (
                            <div className="w-[100%] border-b-[1px] border-solid border-[#D6D6D6] mt-[32px] mb-[18px]"></div>
                        )}
                    </div>
                ))
            }
        </div>
    )
})