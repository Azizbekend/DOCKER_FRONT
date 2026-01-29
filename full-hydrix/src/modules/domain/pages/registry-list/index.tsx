import { DespetcherTest } from '@/packages/entities/despetcher-test/type';
import { Table } from '@/packages/shared-ui/table/index';
import { observer } from 'mobx-react-lite';
import { columns } from './components/columns';


export const RegistryObjects = observer(({ list }: { list: DespetcherTest[] }) => {


    const handleRowClick = (row: DespetcherTest) => {
        window.location.href = `/domain/passport/${row.id}/information`;
    };

    return (
        <Table
            classNames={{
                thead: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200",
            }}
            columns={columns}
            data={list}
            onRowClick={handleRowClick}
        />
    )
});