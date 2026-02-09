import { Table } from '@/packages/shared-ui/table/index';
import { observer } from 'mobx-react-lite';
import { columns } from './components/columns';
import { PassportRegistryDataType } from '@/packages/entities/object/type';


export const RegistryObjects = observer(({ list, isLoading }: { list: PassportRegistryDataType[],  isLoading: boolean }) => {

    const handleRowClick = (row: PassportRegistryDataType) => {
        window.location.href = `/domain/passport/${row.id}/information`;
    };

    return (
        <Table
            classNames={{
                thead: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 z-30 relative",
                table: "!min-w-[1800px]",
            }}
            columns={columns}
            data={list}
            onRowClick={handleRowClick}
            isLoading={isLoading}
        />
    )
});