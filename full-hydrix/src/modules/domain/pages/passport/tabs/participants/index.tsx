import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { observer } from 'mobx-react-lite';
import { AddEmployeeModal } from './components/add-employee';
import { useState } from 'react';
import { CreateCompanyModal } from './components/create-company-modal';

export const PassportParticipants = observer(() => {
    const participantsData = [
        {
            organization: "АО \"ВКС\"",
            role: "Эксплуатирующая организация",
            name: "Иванов Иван",
            email: "mppjkx1@mail.ru",
            phone: "+7 (843) 653-28-72",
            status: "Действующая",
            color: "#4A85F6"
        },
        {
            organization: "АО \"УКС\"",
            role: "Генеральный подрядчик",
            name: "Петров Иван",
            email: "uksr.kzn@tatar.ru",
            phone: "+7 (843) 223-19-19",
            status: "Действующая",
            color: "#34C759"
        },
        {
            organization: "ГКУ \"ГУИС\"",
            role: "Заказчик",
            name: "Сидоров Андрей",
            email: "fondgaz@yandex.ru",
            phone: "+7 (843) 221-51-89",
            status: "Действующая",
            color: "#FF9500"
        }
    ];

    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState<boolean>(false);
    const [showCreateCompanyModal, setShowCreateCompanyModal] = useState<boolean>(false);

    return (
        <div className='w-full bg-white rounded-2xl min-h-[50vh] p-8 shadow-xl border border-gray-100'>
            <AddEmployeeModal show={showAddEmployeeModal} setShow={setShowAddEmployeeModal} />
            <CreateCompanyModal show={showCreateCompanyModal} setShow={setShowCreateCompanyModal} />

            <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Участники</h1>
                    <div className="w-24 h-1 bg-[#4A85F6] rounded-full mt-2"></div>
                </div>

            <Button 
                class='bg-[#4A85F6] py-3 px-6 rounded-xl text-white font-semibold hover:bg-[#3a6bc9] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 mb-12'
                onClick={() => setShowCreateCompanyModal(true)}
            >
                 <Icon systemName='plus-white' />
                
                Добавить организацию
            </Button>

            <div className="space-y-8">
                {participantsData.map((participant, index) => (
                    <div 
                        key={index} 
                        className='border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50'
                    >
                        {/* Status badge - left aligned, elegant */}
                        <div className='flex justify-start mb-4'>
                            <span className='inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200'>
                                <div className='w-2 h-2 bg-green-600 rounded-full mr-2'></div>
                                {participant.status}
                            </span>
                        </div>

                        {/* Role - larger, bold, with accent color */}
                        <div className='font-bold text-gray-900 text-xl mb-2'>{participant.role}</div>
                        
                        {/* Organization Name - smaller, subtle */}
                        <div className='text-gray-600 text-lg mb-5 font-medium'>{participant.organization}</div>

                        {/* Contact Info */}
                        <div className='flex items-start gap-4'>
                            {/* Avatar with unique color and subtle shadow */}
                            <div 
                                className='font-bold h-12 w-12 rounded-full flex items-center justify-center text-white text-base shadow-md'
                                style={{ backgroundColor: participant.color }}
                            >
                                {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>

                            {/* Details */}
                            <div className='flex-1'>
                                <div className='font-bold text-gray-900 mb-2 text-lg'>{participant.name}</div>
                                
                                {/* Email */}
                                <div className='flex items-center gap-2 mb-2'>
                                    <div className='w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <a href={`mailto:${participant.email}`} className='text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'>
                                        {participant.email}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div className='flex items-center gap-2 mb-4'>
                                    <div className='w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.776 21 3 14.224 3 6V5z" />
                                        </svg>
                                    </div>
                                    <a href={`tel:${participant.phone.replace(/\s+/g, '')}`} className='text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200'>
                                        {participant.phone}
                                    </a>
                                </div>

                                {/* View Orders Link */}
                                <button className='text-blue-600 hover:text-blue-800 font-medium text-sm underline hover:no-underline transition-colors duration-200 flex items-center gap-1'>
                                    Посмотреть приказы и сведения
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Add Employee Button */}
                        <div className='mt-6 pt-4 border-t border-gray-200'>
                            <div 
                                className='flex items-center gap-3 text-[#4A85F6] hover:text-[#3a6bc9] font-semibold text-base transition-colors duration-200 cursor-pointer w-fit group'
                                onClick={() => setShowAddEmployeeModal(true)}
                            >
                                <div className='bg-[#DBE7FD] h-10 w-10 rounded-full flex items-center justify-center group-hover:bg-[#c2d8fc] transition-colors duration-200'>
                                    <Icon systemName='plus-accent' />
                                </div>
                                Добавить сотрудника
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});