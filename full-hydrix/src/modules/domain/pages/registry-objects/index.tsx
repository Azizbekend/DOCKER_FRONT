import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { Icon } from '@/shared/ui/icon';
import { useSearch } from '@/shared/ui/Inputs/hooks/hook-search';
import { Search } from '@/shared/ui/Inputs/input-search';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { SwitchButton } from '@/shared/ui/switch-button';
import { FilterObjects } from './components/filter-objects';
import { useEffect, useState } from 'react';
import { MapObjects } from './pages/registry-map';
import { RegistryObjects } from './pages/registry-list';
import { DespetcherTest } from '@/entities/despetcher-test/type';
import { registryModel } from './pages/model/registry-model';

export const RegistryObjectsLayout = observer(() => {

    const { list, init } = registryModel
    const { search, setSearch, results } = useSearch<DespetcherTest>({ data: list, searchFields: ["nameMinin", 'company'] })
    const { page } = useParams()

    const [isMap, setIsMap] = useState<boolean>(page === "list" ? false : true);

    useEffect(() => {

        init()
    }, [])


    const changSubPage = () => {
        setIsMap(!isMap)
    }

    return (
        <div className='h-full flex flex-col'>
            {/* <Breadcrumbs
                routes={[
                    {
                        name: 'Registry Objects',
                        path: '/domain'
                    }
                ]}
            /> */}


            <div className='flex items-center gap-[28px] mb-[38px]'>
                <Link to={"/menu-moduls"} className='bg-[var(--clr-accent)] rounded px-3 py-2 hover:opacity-50 cursor-pointer duration-300'>
                    <Icon systemName="arrow-left" />
                </Link>
                <span className='font-bold text-[#222B45] text-[34px]'>Единый реестр объектов</span>
            </div>

            <div className='mb-10 bg-white py-[5px] pl-[40px] pr-[40px] flex items-center justify-between'
                style={{
                    width: "calc(100% + 80px)",
                    marginLeft: "-40px",
                }}>

                <div className='flex items-center'>
                    <Search
                        placeholder="Поиск..."
                        value={search}
                        onChange={setSearch}
                        classNames={{
                            container: "w-min !bg-[#EEF2FA] rounded-lg h-[38px]",
                            input: "!w-[400px] bg-[#EEF2FA]",
                        }}
                    />

                    <FilterObjects />

                    <SwitchButton
                        label="Диспетчерская"
                        onChange={() => { console.log() }}
                        classNames={{
                            container: "ml-7 gap-3",
                            button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                            circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                        }}
                    />

                    <SwitchButton
                        label="Управление ЖБО"
                        onChange={() => { console.log() }}
                        classNames={{
                            container: "ml-7 gap-3",
                            button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                            circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                        }}
                    />
                </div>

                <div onClick={changSubPage} className='flex items-center gap-3 text-[#757575] cursor-pointer hover:opacity-50 duration-300'>
                    {isMap
                        ?
                        <>
                            <Icon systemName='list' />
                            <span>Объекты в виде списка</span>
                        </>
                        :
                        <>
                            <Icon systemName='map' />
                            <span>Объекты на карте</span>
                        </>
                    }
                </div>
            </div>

            <div className='flex-1'>
                {isMap ? <MapObjects /> : <RegistryObjects list={results.length > 0 ? results : []} />}
            </div>
        </div>
    );
});