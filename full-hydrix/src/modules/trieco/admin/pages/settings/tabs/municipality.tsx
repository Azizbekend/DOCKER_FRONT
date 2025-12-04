import { Button, Input } from "@/app/cores/core-trieco/UIKit";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import { municipalityModel } from "../models/municipality-model";
import { Municipality } from "@/app/cores/core-trieco/network/company/municipality";
import { updateMunicipalities, getUserCompany, deleteMunicipalities } from "@/app/cores/core-trieco/network/user/user";
import { useAuth } from "@/entities/user/context";

export const MunicipalityPanel = observer(() => {
    const [selectedMunicipalities, setSelectedMunicipalities] = useState<Municipality[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isMunicipalitiesShow, setMunicipalitiesShow] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { initUser, user } = useAuth();

    useEffect(() => {
        initUser();
    }, []);

    useEffect(() => {
        const initData = async () => {
            if (!municipalityModel.municipalites.length) {
                await municipalityModel.init();
            }
            loadUserMunicipalities();
        };
        initData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setMunicipalitiesShow(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const getCompanyId = () => {
        if (user?.companyId) {
            toast("Компания не найдена.", { progressStyle: { background: "red" } });
            return null;
        }
        return user?.companyId;
    };

    const isSavedInDatabase = (id: number) => {
        return municipalityModel.municipalites.some((m) => m.id === id);
    };

    const selectMunicipality = (municipality: Municipality) => {
        if (selectedMunicipalities.some((m) => m.id === municipality.id)) {
            toast("Этот район обслуживания уже добавлен.", { progressStyle: { background: "red" } });
            return;
        }
        toast("Район успешно выбран.", { progressStyle: { background: "green" } });
        setSelectedMunicipalities((prev) => [...prev, municipality]);
        setError(null);
    };

    const isSelected = (id: number) => selectedMunicipalities.some((m) => m.id === id);

    const filteredMunicipalities = searchQuery
        ? municipalityModel.municipalites.filter((municipality) =>
            municipality.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : municipalityModel.municipalites;

    const loadUserMunicipalities = async () => {
        if (!user) {
            toast("Пользователь не найден.", { progressStyle: { background: "red" } });
            return;
        }

        try {
            const userCompanyResponse = await getUserCompany({ UserId: user.id });
            const userCompany = userCompanyResponse.data;

            if (!userCompany) {
                toast("Компания пользователя не найдена.", { progressStyle: { background: "red" } });
                return;
            }

            const selectedMunicipalitiesIds = userCompany?.companyMunicipalityIds || [];
            const allMunicipalities = municipalityModel.municipalites || [];

            const selected = allMunicipalities.filter(municipality =>
                selectedMunicipalitiesIds.includes(municipality.id)
            );

            setSelectedMunicipalities(selected);

        } catch (error) {
            console.error("Ошибка при загрузке данных пользователя:", error);
        }
    };

    const handleSaveSelection = async () => {
        const companyId = getCompanyId();
        if (!companyId || !user) return;

        try {
            const userCompanyResponse = await getUserCompany({ UserId: user.id });
            const userCompany = userCompanyResponse.data;
            const existingMunicipalityIds = userCompany?.companyMunicipalityIds || [];

            if (existingMunicipalityIds.length > 0) {
                await deleteMunicipalities({
                    companyId,
                    municipalityIds: existingMunicipalityIds,
                });
            }

            const uniqueMunicipalityIds = [
                ...new Set(selectedMunicipalities.map((municipality) => municipality.id)),
            ];

            await updateMunicipalities({
                companyId,
                municipalityIds: uniqueMunicipalityIds,
            });
            loadUserMunicipalities();

            toast("Районы успешно сохранены.");
        }
        catch (error) {
            console.error("Ошибка при сохранении районов:", error);
        }
    };


    const removeMunicipality = async (id: number) => {
        const companyId = getCompanyId();
        if (!companyId) return;

        const isSaved = isSavedInDatabase(id);

        if (!isSaved) {
            setSelectedMunicipalities((prev) => prev.filter((municipality) => municipality.id !== id));
            return;
        }

        try {
            await deleteMunicipalities({
                companyId,
                municipalityIds: [id],
            });
            setSelectedMunicipalities((prev) => prev.filter((municipality) => municipality.id !== id));
            toast("Район успешно удален.", { progressStyle: { background: "green" } });
        }
        catch (error) {
            console.error("Ошибка при удалении района:", error);
        }
    };

    const removeAllMunicipalities = async () => {
        const companyId = getCompanyId();
        if (!companyId) return;

        try {
            const savedMunicipalities = municipalityModel.municipalites.filter(m => isSavedInDatabase(m.id));
            const municipalityIds = savedMunicipalities.map(municipality => municipality.id);

            if (municipalityIds.length > 0) {
                await deleteMunicipalities({
                    companyId,
                    municipalityIds,
                });
            }
            toast("Районы успешно удалены.", { progressStyle: { background: "green" } });

            setSelectedMunicipalities((prev) => prev.filter((municipality) => !isSavedInDatabase(municipality.id)));
            loadUserMunicipalities();
        } catch (error) {
            console.error("Ошибка при удалении всех районов:", error);
        }
    };


    return (
        <div className="flex flex-col gap-6">
            <span className="text-[20px] font-bold">Обслуживаемые территории</span>
            <p className="text-[16px] font-semibold">Выберите район обслуживания</p>

            {error && <div className="text-red-500">{error}</div>}

            {selectedMunicipalities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedMunicipalities.map((x) => (
                        <div
                            key={x.id}
                            className="bg-[#4080FB] bg-opacity-10 py-3 px-4 text-[#4080FB] flex items-center cursor-pointer rounded-lg"
                        >
                            <span>{x.name}</span>
                            <button
                                onClick={() => removeMunicipality(x.id)}
                                className="ml-2"
                                aria-label="Удалить"
                            >
                                <Icon systemName="delete" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div ref={wrapperRef} className="relative w-[350px]">
                <Input
                    headerText="Районы обслуживания"
                    onChange={(value) => setSearchQuery(value)}
                    placeholder="Поиск..."
                    type="text"
                    onFocus={() => setMunicipalitiesShow(true)}
                    icon="menu"
                    iconActive="menu-active"

                />

                {isMunicipalitiesShow && (
                    <div className="flex flex-col border border-[#EFF4FA] bg-white text-[#4A85F6] max-h-[300px] overflow-y-scroll w-[350px] absolute shadow-[1px_1px_5px_0px_#0000001A] rounded-lg">

                        {filteredMunicipalities.length > 0 ? (
                            filteredMunicipalities.map((x) => (
                                <div
                                    key={x.id}
                                    onClick={() => selectMunicipality(x)}
                                    className={`flex items-center justify-between text-[14px] cursor-pointer px-3 py-2 border-b  hover-item transition-all
                                        ${isSelected(x.id) ? "bg-[#4080FB] bg-opacity-10 text-[#4080FB] border-[#B7C8E8]" : "text-[#4A85F6] border-white"}`}
                                >
                                    {x.name}
                                    {isSelected(x.id) && <span>✔</span>}
                                </div>
                            ))
                        ) : (
                            <div className="text-[#4A85F6] px-3 py-2">Район не найден</div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-3">
                <Button
                    onClick={handleSaveSelection}
                    disabled={selectedMunicipalities.length === 0}
                    class="bg-[#4A85F6] rounded-lg py-3 px-10 font-bold"
                >
                    Сохранить районы обслуживания
                </Button>

                <Button
                    onClick={removeAllMunicipalities}
                    disabled={selectedMunicipalities.length === 0}
                    class="bg-red-500 text-white py-3 px-10 font-bold rounded-lg"
                >
                    Удалить все
                </Button>
            </div>
        </div>
    );
});
