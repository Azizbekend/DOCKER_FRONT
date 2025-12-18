import { HardWareStatus } from "../../../types/type";

export function useHardwarePhoto() {
    const getPhoto = (name: string | number) => `https://triapi.ru/research/api/FileStorage/images/download?id=${name}`;

    const addStatusClass = (status: HardWareStatus) => {

        if (!status) return "";
        return { OK: "", WORK: "-work", ERROR: "-error" }[HardWareStatus[status]];

    };

    return { getPhoto, addStatusClass };
}
