import { DespetcherTest } from '@/entities/despetcher-test/type';
import { Table } from '@/shared/ui/table/index';
import { TableColumn } from '@/shared/ui/table/setting/types';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';



const columns: TableColumn<DespetcherTest>[] = [
    {
        header: "Изображение",
        key: 'img',
        width: '200px',
        cell: ({ img }) => {
            return (
                <div>
                    <img src={"../../../../../../../public/" + img} />
                </div>
            )
        },
    },
    {
        header: "Краткое наименование",
        key: 'nameMinin',
        cell: ({ nameMinin }) => {
            return (
                <div className='font-semibold text-[17px] text-left'>{nameMinin}</div>
            )
        },
    },
    {
        header: "Организация",
        key: 'company',
        cell: ({ company }) => {
            return (
                <div className='text-center w-full'>{company}</div>
            )
        },
    },
    {
        header: "Статус подключения",
        key: 'img',
        cell: ({ statusСonnection }) => {
            return (
                <div className={`font-semibold text-center w-full ${statusСonnection ? "text-[#34C759]" : "text-[#D31313]"}`}>
                    {statusСonnection ? "Подключено" : "Не подключено"}
                </div>
            )
        },
    },
    {
        header: "Статус работы",
        key: 'img',
        cell: ({ statusJob }) => {
            return (
                <div className={`font-semibold text-center w-full ${statusJob ? "text-[#34C759]" : "text-[#D31313]"}`}>
                    {statusJob ? "Активен" : "Не активен"}
                </div>
            )
        },
    },
    {
        header: "Проектная произ., м³",
        key: 'img',
        cell: ({ volumeProjec }) => {
            return (
                <div className='text-center w-full'>{volumeProjec}</div>
            )
        },
    },
    {
        header: "Средне суточная произ., м³",
        key: 'img',
        cell: ({ volumeAverage }) => {
            return (
                <div className='text-center w-full'>{volumeAverage}</div>
            )
        },
    },
    {
        header: "Реальная произ., м³",
        key: 'img',
        cell: ({ volumeReale }) => {
            return (
                <div className='text-center w-full'>{volumeReale}</div>
            )
        },
    },
    {
        header: "Диспетчеризация",
        key: 'img',
        cell: ({ dispetcher }) => {

            if (dispetcher) {
                return <Link to="asdasd" className='text-center w-full underline text-[var(--clr-accent)] font-semibold hover:opacity-50 duration-300'>Перейти в модуль</Link>
            } else {
                return <div className='text-center w-full underline text-[#757575] font-semibold'>Перейти в модуль</div>
            }
        },
    },
]

export const RegistryObjects = observer(({ list }: { list: DespetcherTest[] }) => {



    const handleRowClick = (row: DespetcherTest) => {
        location.href = `/domain/passport`
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