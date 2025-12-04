import { Icon } from '@/shared/ui/icon';
import { Selector } from '@/shared/ui/Selector/selector';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
export const FilterObjects = observer(() => {

    const [open, setOpen] = useState<boolean>(false);
    const funcFocus = () => {
        setOpen(true)
    }
    const funcBlur = () => {
        setOpen(false)
    }

    return (
        <div className='flex gap-4 ml-5 cursor-pointer relative' onMouseMove={funcFocus} onMouseLeave={funcBlur}>
            <div className="">
                <Icon systemName='filter' />
            </div>
            <div className="text-[#757575]">Фильтр</div>

            {open &&
                <div className='absolute z-[5] top-[100%] l-0 bg-white   shadow-md w-[293px] p-[15px_12px_10px_22px] rounded'
                    style={{
                        animation: 'fadeInUp 0.2s ease forwards'
                    }}
                >
                    <div className='font-semibold mb-[9px]'>Районы</div>
                    <Selector
                        titleClass="border flex p-2 rounded"
                        title="Районы"
                        icon='arrow-down'
                        items={[
                            {
                                value: "Высокогорский",
                                title: "Высокогорский",
                            },
                            {
                                value: "Сабинский",
                                title: "Сабинский",
                            }
                        ]} />

                    <div className='font-semibold mb-[9px] mt-[12px]'>Организация</div>
                    <Selector
                        title="Организация"
                        titleClass="border flex p-2 rounded"
                        icon='arrow-down'
                        items={[
                            {
                                value: "ВКС",
                                title: "ВКС",
                            },
                            {
                                value: "ООО “Оргнизация”",
                                title: "ООО “Оргнизация”",
                            }
                        ]} />
                </div>
            }
        </div>
    );
});