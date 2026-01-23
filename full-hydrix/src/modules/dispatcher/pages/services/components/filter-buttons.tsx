import { observer } from 'mobx-react-lite';


type FilterButtonsProps = {
    allRes: number,
    commonRes: number,
    supplyRes: number,
    incidentsRes: number,

    setActiveFilter: (string: string) => void,
    activeFilter: string,
}


export const FilterButtons = observer(({ allRes, commonRes, supplyRes, incidentsRes, setActiveFilter, activeFilter }: FilterButtonsProps) => {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'all'
                    ? 'bg-[var(--clr-accent)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
            >
                Все ({allRes})
            </button>
            <button
                onClick={() => setActiveFilter('general')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'general'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
            >
                Общая {commonRes}
            </button>
            <button
                onClick={() => setActiveFilter('supply')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'supply'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
            >
                Поставочная {supplyRes}
            </button>
            <button
                onClick={() => setActiveFilter('emergency')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'emergency'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
            >
                Аварийная {incidentsRes}
            </button>
        </div>
    );
});