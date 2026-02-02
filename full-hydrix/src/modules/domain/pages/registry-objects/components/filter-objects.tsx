import { Button } from '@/packages/shared-ui/button/button';
import { Icon } from '@/packages/shared-ui/icon';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

export const FilterObjects = observer(() => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative ml-4">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg border
                    transition-all
                    ${open
                        ? 'bg-blue-50 border-blue-400 text-blue-700'
                        : 'bg-white border border-gray-300 rounded-lg h-11 text-gray-600 hover:border-gray-400'}
                `}
            >
                <Icon systemName={open ? "filter-active" : "filter"} />
                <span className="text-sm font-medium">Фильтр</span>
                <Icon
                    systemName="arrow-down"
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div
                    className=" absolute z-10 top-full left-[40%] mt-2 w-[300px] rounded-xl bg-white shadow-xl border p-4"
                    style={{ animation: 'fadeInUp 0.2s ease forwards' }}
                >
                    <div className="text-sm font-semibold text-gray-800 mb-4">
                        Параметры фильтра
                    </div>

                    <div className="mb-4">
                        <div className="text-xs font-medium text-gray-500 mb-1">
                            Район
                        </div>
                        <Selector
                            placeholder="Выберите район"
                            titleClass="border flex p-2 rounded-lg"
                            icon="arrow-down"
                            items={
                                [
                                    // {
                                    //     value: "Высокогорский",
                                    //     title: "Высокогорский",
                                    // },
                                    // {
                                    //     value: "Сабинский",
                                    //     title: "Сабинский",
                                    // }
                                ]
                            }
                        />
                    </div>

                    <div className="mb-5">
                        <div className="text-xs font-medium text-gray-500 mb-1">
                            Организация
                        </div>
                        <Selector
                            placeholder="Выберите организацию"
                            titleClass="border flex p-2 rounded-lg"
                            icon="arrow-down"
                            items={[]}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between gap-2">
                        <Button
                            class='py-1 w-full'
                            styleColor='blueOutline'
                            onClick={() => {

                                //  reset logic
                            }}
                        >
                            Сбросить
                        </Button>
                        <Button
                            class='py-1 w-full'
                            styleColor='blue'
                            onClick={() => setOpen(false)}
                        >
                            Применить
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
});
