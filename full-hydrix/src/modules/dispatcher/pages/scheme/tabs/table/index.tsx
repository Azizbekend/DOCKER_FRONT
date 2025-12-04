import { Table } from '@/shared/ui/table/index';
import { TableColumn } from '@/shared/ui/table/setting/types';
import { observer } from 'mobx-react-lite';
import { ControlBlockAllType, TableSchemeType } from './service/table-scheme-service';
import { tableSchemeModel } from './model/table-scheme-model';
import { useEffect } from 'react';
import { InfoCh } from './InfoCh';

const columns: TableColumn<ControlBlockAllType>[] = [
    {
        header: "Название оборудования",
        key: 'name',
        cell: ({ opcDescription }) => {
            return <div className='text-center w-full underline text-[#757575] font-semibold'>{opcDescription}</div>
        },
    },
    {
        header: "Название node",
        key: 'node',
        cell: ({ name }) => {
            return <div className='text-center w-full underline text-[#757575] font-semibold'>{name}</div>
        },
    },
    {
        header: "Значение",
        key: 'node',
        cell: ({ id }) => {
            return <InfoCh idwe={id} />
        },
    },
]

export const TableScheme = observer(() => {

    const { list, getInfoSensor, init } = tableSchemeModel

    useEffect(() => {
        init()
    }, [])

    function handleRowClick(row: ControlBlockAllType) {
        getInfoSensor()
    }

    return (
        <>
            <Table
                classNames={{
                    thead: "child-th-border-left"
                }}
                columns={columns}
                data={list}
                onRowClick={handleRowClick}
            />

        </>
    );
});