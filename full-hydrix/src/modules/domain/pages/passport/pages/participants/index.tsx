import { Icon } from '@/packages/shared-ui/icon';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Button } from '@pbe/react-yandex-maps';
import { AddEmployeeModal } from './components/add-employee';
import { CreateCompanyModal } from './components/create-company-modal';
import { participantsData } from '@/packages/entities/object/data';

export const PassportParticipants = observer(() => {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState<boolean>(false);
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState<boolean>(false);

  return (
    <>
      <PassportHeaderPanel
        title="Участники"
        rightBlock={
          <Button 
            onClick={() => setShowCreateCompanyModal(true)}
            className="bg-[#4A85F6] py-2.5 px-4 sm:px-6 rounded-xl text-white font-semibold hover:bg-[#3a6bc9] transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
          >
            <Icon systemName='plus-white' className="w-4 h-4" />
            <span className="whitespace-nowrap">Добавить организацию</span>
          </Button>
        }
      />
      
      <AddEmployeeModal show={showAddEmployeeModal} setShow={setShowAddEmployeeModal} />
      <CreateCompanyModal show={showCreateCompanyModal} setShow={setShowCreateCompanyModal} />

      <div className="space-y-4">
        {participantsData.map((participant, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
          >
            {/* Status badge */}
            <div className="flex justify-start mb-3 sm:mb-4">
              <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full mr-1.5 sm:mr-2"></div>
                {participant.status}
              </span>
            </div>

            {/* Role and Organization */}
            <div className="mb-4">
              <div className="font-bold text-gray-900 text-lg sm:text-xl mb-1">{participant.role}</div>
              <div className="text-gray-600 text-base sm:text-lg font-medium">{participant.organization}</div>
            </div>

            {/* Contact Info - адаптивная сетка */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Avatar */}
              <div
                className="font-bold h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-white text-sm sm:text-base shadow-md"
                style={{ backgroundColor: participant.color }}
              >
                {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div className="font-bold text-gray-900 text-base sm:text-lg">{participant.name}</div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href={`mailto:${participant.email}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-200">
                    {participant.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.776 21 3 14.224 3 6V5z" />
                    </svg>
                  </div>
                  <a href={`tel:${participant.phone.replace(/\s+/g, '')}`} className="text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base transition-colors duration-200">
                    {participant.phone}
                  </a>
                </div>

                {/* View Orders Link */}
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base underline hover:no-underline transition-colors duration-200 flex items-center gap-1">
                  Посмотреть приказы и сведения
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add Employee Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div
                className="flex items-center gap-2 sm:gap-3 text-[#4A85F6] hover:text-[#3a6bc9] font-semibold text-sm sm:text-base transition-colors duration-200 cursor-pointer w-fit group"
                onClick={() => setShowAddEmployeeModal(true)}
              >
                <div className="bg-[#DBE7FD] h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center group-hover:bg-[#c2d8fc] transition-colors duration-200">
                  <Icon systemName='plus-accent' className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <span className="whitespace-nowrap">Добавить сотрудника</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});
