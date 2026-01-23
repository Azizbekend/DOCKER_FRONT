interface StatisticsProps {
    all: number;
    newCound: number;
    completed: number;
    cancel: number;
}

export const Statistics = ({ all, newCound, completed, cancel }: StatisticsProps) => {
    return (
        <>
            {all !== undefined &&
                <div className={`bg-[var(--clr-accent)] statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Всего заявок</div>
                    <div className="text-xl font-bold ">{all}</div>
                </div>
            }
            {newCound !== undefined &&
                <div className={`bg-blue-100 text-blue-800 statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Новых</div>
                    <div className="text-xl font-bold ">{newCound}</div>
                </div>
            }
            {completed !== undefined &&
                <div className={`bg-green-100 text-green-800 statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Завершено</div>
                    <div className="text-xl font-bold ">{completed}</div>
                </div>
            }
            {cancel !== undefined &&
                <div className={`bg-yellow-100 text-yellow-800 statistic-item rounded-xl p-5`}>
                    <div className="text-sm mb-1">Отменено</div>
                    <div className="text-xl font-bold ">{cancel}</div>
                </div>
            }
        </>
    );
};