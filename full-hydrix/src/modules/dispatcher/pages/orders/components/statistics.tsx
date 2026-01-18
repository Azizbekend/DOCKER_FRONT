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
                <div className={`_blue statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Общее кол-во  заявок</div>
                    <div className="text-xl font-bold ">{all}</div>
                </div>
            }
            {inWork &&
                <div className={`_orange statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">В работе</div>
                    <div className="text-xl font-bold ">{inWork}</div>
                </div>
            }
            {awaiting &&
                <div className={`_brown statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Ожидают</div>
                    <div className="text-xl font-bold ">{awaiting}</div>
                </div>
            }
            {completed &&
                <div className={`_green statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Завершено</div>
                    <div className="text-xl font-bold ">{completed}</div>
                </div>
            }
            {critical &&
                <div className={`_red statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Критические</div>
                    <div className="text-xl font-bold ">{critical}</div>
                </div>
            }
            {totalCost &&
                <div className={`_neon statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Общая стоимость</div>
                    <div className="text-xl font-bold ">{totalCost}</div>
                </div>
            }

        </>
    );
};