import { Icon } from '@/packages/shared-ui/icon';
import { observer } from 'mobx-react-lite';
import { BlockSelect } from '../../components/block-select';
import { everyKapitalServerDate, everyPlanerServerDate } from '../../data/hardware-serves-data';
import { InfoObject } from '../../components/info-object';
import InputCheckbox from '@/packages/shared-ui/Inputs/input-checkbox';
import { Link } from 'react-router-dom';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { Button } from '@/packages/shared-ui/button/button';
import { useState } from 'react';
import { HardwareServesProps } from '@/packages/entities/hardware/type';
import { useAuth } from '@/packages/entities/user/context';
import { isAdmin } from '@/packages/entities/user/utils';

export const HardwareServes = observer(({ getCommands, servicesWeek, checkedService, idHardware, missedService }: HardwareServesProps) => {

    const [btnCount, setBtnCount] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    const handleService = () => {
        checkedService(btnCount)
        setShow(false)
    }

    const handleServiceOpen = (id: number) => {
        setBtnCount(id.toString())
        setShow(true)
    }

    const { user } = useAuth();

    return (
        <div className="w-full mt-10 p-[0_0_50px_0]">
            <Modal
                title="Подтвердить выполнение задачи"
                wrapperId="wardhare"
                type="center"
                show={show}
                setShow={setShow}
                children={
                    <div
                        className="py-6 px-8 text-gray-800 text-lg font-medium text-center leading-relaxed"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                        Вы подтверждаете выполнение задачи?
                    </div>
                }
                footerSlot={
                    <div className="flex justify-end gap-3 p-6">
                        <Button
                            class="px-5 py-2.5 rounded-lg font-medium text-white bg-gray-500 hover:bg-gray-700 transition-colors"
                            onClick={() => setShow(false)}
                        >
                            Отмена
                        </Button>
                        <Button
                            class="px-5 py-2.5 rounded-lg font-medium text-white bg-[#4A85F6] hover:bg-[#3a6bc9] transition-colors shadow-sm"
                            onClick={handleService}
                        >
                            Подтвердить
                        </Button>
                    </div>
                }
                classNames={{
                    panel: "max-w-md w-full rounded-2xl border border-gray-200 shadow-xl",
                    header: "border-b border-gray-100",
                    title: "text-xl font-bold text-gray-800"
                }}
            />


            {false &&
                <div className="border-2 border-[#4A85F6] bg-[#4A85F620] rounded-[8px] mb-5 flex items-center justify-center gap-[16px] py-[16px] pl-[16px] pr-[34px]">
                    <Icon systemName="info-blue" width={32} />
                    <div className="text-regular text-[#4A85F6]">Нужно проверить и заменить масла</div>
                </div>
            }


            {missedService.length > 0 &&
                <BlockSelect title="Пропущенное обслуживание"
                    className="flex flex-col gap-3 text-gray"
                    isOpen={true}
                    children={
                        <>

                            {(idHardware === 28 || idHardware === 26 || idHardware === 28) && (user.id == 37 || isAdmin()) &&
                                <InfoObject
                                    className='w-full '
                                    children={
                                        <div className='flex items-center gap-2 text-red-500' onClick={() => handleServiceOpen(item.id)}>
                                            <span className='font-bold'>X</span>
                                            ТО-1 Замена масла через 300 ч (25.12.2025)
                                        </div>
                                    }
                                />
                            }

                            {missedService.map((item, key) => {
                                return (
                                    <InfoObject
                                        key={key}
                                        className='w-full '
                                        info={item.discription}
                                        children={
                                            <div className='flex items-center gap-2 text-red-500' onClick={() => handleServiceOpen(item.id)}>
                                                <span className='font-bold'>X</span>
                                                {item.title}
                                            </div>
                                        }
                                    />
                                    // <InfoObject key={key}
                                    //     className='w-full '
                                    //     info={item.discription}

                                    //     children={
                                    //         <div className='flex items-center gap-4 justify-between ' onClick={() => handleServiceOpen(item.id)}>
                                    //             <InputCheckbox
                                    //                 disabled
                                    //                 label={item.title}
                                    //             />
                                    //             <Icon systemName='info-blue' className='min-w-[30px] min-h-[30px] w-[30px] h-[30px]' />
                                    //         </div>
                                    //     }
                                    // />
                                )
                            })}
                        </>
                    } />
            }

            {getCommands.length == 0 && <div className='border-y border-gray-500 py-4'>На сегодня задач нет</div>}


            {getCommands.length > 0 &&
                <BlockSelect title="Ежедневное обслуживание"
                    className="flex flex-col gap-3 text-gray"
                    isOpen={true}
                    children={
                        getCommands.map((item, key) => {
                            return (
                                <InfoObject key={key}
                                    className='w-full '
                                    info={item.discription}

                                    children={
                                        <div className='flex items-center gap-4 justify-between ' onClick={() => handleServiceOpen(item.id)}>
                                            <InputCheckbox
                                                disabled
                                                label={item.title}
                                            />
                                            <Icon systemName='info-blue' className='min-w-[30px] min-h-[30px] w-[30px] h-[30px]' />
                                        </div>
                                    }
                                />
                            )
                        })
                    } />
            }

            {servicesWeek.length > 0 &&
                <BlockSelect
                    title="Обслуживание на ближайшую неделю"
                    className='flex flex-col gap-2'
                    children={
                        servicesWeek.map((item, key) => {
                            return (
                                <InfoObject key={key}
                                    className='w-full'
                                    info={item.discription}
                                    children={
                                        <div className='flex items-end gap-4 justify-between border-b border-gray-300 pb-2'>
                                            <div className='flex flex-col flex-1'>
                                                <span className='font-bold text-[var(--clr-accent)] mt-1 text-[12px]'>
                                                    {new Date(item.nextMaintenanceDate).toLocaleDateString('ru-RU', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    }).replace(/\//g, '.')}
                                                </span>
                                                <span>{item.title}</span>
                                            </div>
                                            {/* <Link to="/dispatcher/orders/create/form" className='bg-[var(--clr-accent)] min-w-[37px] min-h-[35px] rounded-lg p-2'>
                                                <Icon systemName='plus-circle-white' />
                                            </Link> */}
                                        </div>
                                    }
                                />
                            )
                        })
                    } />
            }



            {false && <>
                <BlockSelect
                    title="Периодическое (плановое) обслуживание"
                    className='flex flex-col gap-2'
                    children={
                        everyPlanerServerDate.map((item, key) => {
                            return (
                                <InfoObject key={key}
                                    className='w-full'
                                    info={item.info}
                                    children={
                                        <div className='flex items-end ap-2 justify-between'>
                                            <div className='flex flex-col'>
                                                <span className='mt-1 text-[12px]'>{item.date}</span>
                                                <span>{item.title}</span>
                                            </div>
                                            <Link to="/dispatcher/orders/create/form" className='bg-[var(--clr-accent)] rounded-lg p-2'>
                                                <Icon systemName='plus-circle-white' />
                                            </Link>
                                        </div>
                                    }
                                />
                            )
                        })
                    } />
                <BlockSelect title="Капитальное обслуживание" children={
                    everyKapitalServerDate.map((item, key) => {
                        return (
                            <>
                                <div className='flex items-end ap-2 justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='mt-1 text-[12px]'>{item.date}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <Link to="/dispatcher/orders/create/form" className='bg-[var(--clr-accent)] rounded-lg p-2'>
                                        <Icon systemName='plus-circle-white' />
                                    </Link>
                                </div>
                            </>
                        )
                    })
                } />
            </>}

        </div>
    );
});