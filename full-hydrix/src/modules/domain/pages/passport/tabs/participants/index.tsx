import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { observer } from 'mobx-react-lite';
import { AddEmployeeModal } from './components/add-employee';
import { useState } from 'react';
import { CreateCompanyModal } from './components/create-company-modal';

export const PassportParticipants = observer(() => {

    const countBlock = ['Подрятчик', 'Генеральный преоктировщик']
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState<boolean>(false)
    const [showCreateCompanyModal, setShowCreateCompanyModal] = useState<boolean>(false)

    return (
        <div className='w-full bg-white rounded-xl min-h-[50vh] p-[45px_30px_50px_40px]'>
            <AddEmployeeModal show={showAddEmployeeModal} setShow={setShowAddEmployeeModal} />
            <CreateCompanyModal show={showCreateCompanyModal} setShow={setShowCreateCompanyModal} />


            <div className='text-[34px] leading-[24px] font-bold mb-8'>Участники</div>

            <Button class='bg-[var(--clr-accent)] py-[9px] px-[10px] rounded-lg text-white font-bold hover:opacity-50 duration-300 block w-fit mb-10'
                onClick={() => setShowCreateCompanyModal(true)}>
                Добавить организацию
            </Button>

            {countBlock.map((item, index) =>
                <div key={index} className='mb-10'>
                    <div className='font-bold text-[20px] mb-3'>{item}</div>
                    <div className='border border-[#CCCCCC] max-w-[700px] rounded-lg py-5 px-8'>
                        <div className='border border-[#34C759]  w-fit text-[#34C759] rounded-2xl px-3 py-1 mb-3'>Действующая</div>
                        <div className='font-bold text-[18px] mb-8'>АО "ПОДРЯТЧИК"</div>

                        <div className="flex items-center gap-3 cursor-pointer hover:opacity-50 duration-300 w-fit mb-5"
                            onClick={() => setShowAddEmployeeModal(true)}>
                            <div className='bg-[#DBE7FD] h-[50px] w-[50px] rounded-[50px] flex items-center justify-center'>
                                <Icon systemName='plus-accent' />
                            </div>
                            <div className='text-[18px] font-medium text-[var(--clr-accent)]'>Добавить</div>
                        </div>

                        <div className='flex items-top gap-4'>

                            <div className='bg-[#64B5F6] text-white font-semibold h-[50px] w-[50px] rounded-[50px] flex items-center justify-center'>
                                ПГ
                            </div>

                            <div>
                                <div className='font-semibold mb-1'>Подрятчик Гимадиева</div>
                                <a className='font-medium mb-4 text-[var(--clr-accent)] underline hover:opacity-50 duration-300 mb-3 block w-fit' href="mailto:fanzilya.gimadieva@gmail.com">fanzilya.gimadieva@gmail.com</a>
                                <div className='cursor-pointer font-medium underline hover:opacity-50 duration-300'>Посмотреть приказы и сведения</div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
});