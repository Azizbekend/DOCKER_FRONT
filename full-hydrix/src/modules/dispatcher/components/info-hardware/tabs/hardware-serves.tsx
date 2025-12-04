import { Icon } from '@/shared/ui/icon';
import { observer } from 'mobx-react-lite';
import { BlockSelect } from '../components/block-select';
import { everyDayServerDate, everyKapitalServerDate, everyPlanerServerDate } from '../data/hardware-serves-data';
import { InfoObject } from '../components/info-object';
import Tooltip from '@/shared/ui/tooltip';
import InputCheckbox from '@/shared/ui/Inputs/input-checkbox';
import { Link } from 'react-router-dom';
import { hardwareModel } from '@/entities/hardware/model';

export const HardwareServes = observer(() => {

    const { services, checkedService } = hardwareModel
    const handleHeaderClick = (id: number) => {
        checkedService(id)
    }

    return (
        <div className="w-full mt-10 p-[0_0_50px_0]">

            <div className="border-2 border-[#4A85F6] bg-[#4A85F620] rounded-[8px] mb-5 flex items-center justify-center gap-[16px] py-[16px] pl-[16px] pr-[34px]">
                <Icon systemName="info-blue" width={32} />
                <div className="text-regular text-[#4A85F6]">Нужно проверить и заменить масла</div>
            </div>

            <BlockSelect title="Ежедневное обслуживание"

                className="flex flex-col gap-3"
                children={
                    services.map((item, key) => {
                        return (
                            <InfoObject key={key}
                                className='w-full'
                                // info={item.discription}

                                children={
                                    <div className='flex items-center justify-between' onClick={() => handleHeaderClick(item.id)}>
                                        <InputCheckbox
                                            label={item.discription}
                                        />
                                        <Icon systemName='info-blue' />
                                    </div>
                                }
                            />
                        )
                    })
                } />
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

        </div>
    );
});