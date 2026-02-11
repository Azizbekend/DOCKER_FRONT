import { TableColumn } from "@/packages/shared-ui/table/types";
import { getStatusBadge } from "./hardware-status";
import { HardwareInterface } from "@/packages/entities/hardware/type";
import { ActivateButton, EditButton } from "./hardware-buttons";

export const columns: TableColumn<HardwareInterface>[] = [
    {
        header: "Наименование",
        key: 'name',
        cell: ({ name }) => (
            <span className="text-sm text-gray-800 font-medium line-clamp-2 h-10 overflow-hidden h-full">{name}</span>
        ),
    },
    {
        header: "Расположение",
        key: 'position',
        cell: ({ position }) => (
            <span className="text-sm text-gray-800">{position}</span>
        ),
    },
    {
        header: "Модель",
        key: 'model',
        cell: ({ model }) => (
            <span className="text-sm text-gray-800">{model}</span>
        ),
    },
    {
        header: "Изготовитель",
        key: 'developerName',
        cell: ({ developerName }) => (
            <span className="text-sm text-gray-800">{developerName}</span>
        ),
    },
    {
        header: "Поставщик",
        key: 'supplierName',
        cell: ({ supplierName }) => (
            <span className="text-sm text-gray-800">{supplierName}</span>
        ),
    },
    {
        header: "Статус",
        key: 'activatedAt',
        width: '180px',
        cell: ({ id, activatedAt }) => (
            <div className="flex items-center justify-center">
                {activatedAt === "0001-01-01T00:00:00"
                    ? <ActivateButton id={id} />
                    : getStatusBadge(activatedAt)}
            </div>
        ),
    },
    {
        header: "",
        key: 'actions',
        width: '80px',
        cell: ({ id }) => <EditButton to={"/dispatcher/hardware/form/" + id} />,
    },
];

export const domainHardwariesColumns: TableColumn<HardwareInterface>[] = [
    {
        header: "Наименование",
        key: 'name',
        cell: ({ name }) => (
            <span className="text-sm text-gray-800 font-medium line-clamp-2 h-10 overflow-hidden">{name}</span>
        ),
    },
    {
        header: "Расположение",
        key: 'position',
        cell: ({ position }) => (
            <span className="text-sm text-gray-800">{position}</span>
        ),
    },
    {
        header: "Модель",
        key: 'model',
        cell: ({ model }) => (
            <span className="text-sm text-gray-800">{model}</span>
        ),
    },
    {
        header: "Изготовитель",
        key: 'developerName',
        cell: ({ developerName }) => (
            <span className="text-sm text-gray-800">{developerName}</span>
        ),
    },
    {
        header: "Поставщик",
        key: 'supplierName',
        cell: ({ supplierName }) => (
            <span className="text-sm text-gray-800">{supplierName}</span>
        ),
    },
    {
        header: "Статус",
        key: 'activatedAt',
        width: '180px',
        cell: ({ id, activatedAt }) => (
            <div className="flex items-center justify-center">
                {activatedAt === "0001-01-01T00:00:00"
                    ? <ActivateButton id={id} />
                    : getStatusBadge(activatedAt)}
            </div>
        ),
    },
    {
        header: "",
        key: 'actions',
        width: '80px',
        cell: ({ id }) => <EditButton to={`/domain/passport/hardwares/${id}/form`} />,
    },
];