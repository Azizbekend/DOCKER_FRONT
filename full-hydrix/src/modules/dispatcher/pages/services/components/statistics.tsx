interface StatisticsProps {
    all: number;
    inWork?: number;
    awaiting?: number;
    completed?: number;
    critical?: number;
    totalCost?: number;
}

export const Statistics = ({ all, inWork, awaiting, completed, critical, totalCost }: StatisticsProps) => {
    return (
        <>
            {all &&
                <div className={`bg-blue-100 text-blue-800 statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Общее кол-во  заявок</div>
                    <div className="text-xl font-bold ">{all}</div>
                </div>
            }
            {/* {inWork !== undefined &&
                <div className="_orange statistic-item rounded-xl p-5">
                    <div className="text-sm mb-1">В работе</div>
                    <div className="text-xl font-bold ">{inWork}</div>
                </div>
            } */}
            
            {completed !== undefined &&
                <div className={`bg-green-100 text-green-800 statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Завершено</div>
                    <div className="text-xl font-bold ">{completed}</div>
                </div>
            }
            {awaiting !== undefined &&
                <div className={`bg-yellow-100 text-yellow-800 statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Отменены</div>
                    <div className="text-xl font-bold ">{awaiting}</div>
                </div>
            }
            {critical !== undefined &&
                <div className={`bg-red-100 text-red-800 statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Аварийные</div>
                    <div className="text-xl font-bold ">{critical}</div>
                </div>
            }
            {/* {totalCost !== undefined &&
                <div className={`_neon statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Общая стоимость</div>
                    <div className="text-xl font-bold ">{totalCost}</div>
                </div>
            } */}

        </>
    );
};