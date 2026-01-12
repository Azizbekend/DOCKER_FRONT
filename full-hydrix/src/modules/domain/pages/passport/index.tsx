
import { Link, NavLink, useParams } from "react-router-dom";
import { Icon } from "@/shared/ui/icon"
import { Button } from '@/shared/ui/button';
import { PassportDocumentation } from "./tabs/documentation"
import { PassportParticipants } from "./tabs/participants"
import { PassportInformation } from "./tabs/information"
import { useState } from "react";
import { CreateCompanyModal } from "./components/create-company-modal";
import { EquipmentRegistry } from "./tabs/hardware";
import { Incident } from "./tabs/incident";

export const PassportObject = () => {

  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState<boolean>(false);


  const { tab } = useParams();

  return (
    <>
      <CreateCompanyModal show={showCreateCompanyModal} setShow={setShowCreateCompanyModal} />

      <div className="flex items-center gap-4 mb-14">
        <Link
          to="/menu-moduls"
          className="flex items-center justify-center w-11 h-11  transition-colors"
        >
          <Icon systemName="home-active" className="text-white" />
        </Link>

        <div>
          <h1 className="font-bold text-gray-800 text-4xl">Единый реестр объектов</h1>
          <div className="w-28 h-1 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
      </div>



      <div className="relative top-[15px] mb-20">
        <div className="absolute top-[-39px] left-[30px] flex gap-2">
          <NavLink to={'/domain/passport/information'}
            className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
          >
            Паспорт
          </NavLink>

          <NavLink to={'/domain/passport/participants'}
            className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
          >
            Участники
          </NavLink>

          <NavLink to={'/domain/passport/hardwares'}
            className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
          >
            Оборудования
          </NavLink>

          <NavLink to={'/domain/passport/incident'}
            className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
          >
            Аварии
          </NavLink>

          <NavLink to={'/domain/passport/documentation'}
            className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
          >
            Документация
          </NavLink>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between h-[100px] gap-4 z-2 rounded-2xl bg-white shadow-sm p-6">
          <div className="flex items-center gap-4">
            <Link
              to="/domain/list"
              className="flex items-center justify-center w-10 h-10 bg-[#4A85F6] rounded-lg hover:bg-[#3a6bc9] transition-colors"
            >
              <Icon systemName="arrow-left" className="text-white" />
            </Link>
            <h1 className="text-xl md:text-2xl font-bold">

              {tab === "information" && "Паспорт объекта"}
              {tab === "participants" && "Участники"}
              {tab === "hardwares" && "Оборудования"}
              {tab === "incident" && "Аварии"}
              {tab === "documentation" && "Документация"}
            </h1>
          </div>


          <div className="flex gap-4 justify-end">
            {tab === "information" && <>

              <Link to="/gis/company/56"
                className="flex items-center gap-2 px-6 py-3 bg-white text-[#4A85F6] font-semibold rounded-lg border border-[#4A85F6] hover:bg-[#4A85F6] hover:text-white transition-all duration-200 shadow-sm"
              >
                <span>Перейти в Управление ЖБО</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                to="/dispatcher"
                className="flex items-center gap-2 px-6 py-3 bg-[#4A85F6] text-white font-semibold rounded-lg hover:bg-[#3a6bc9] transition-colors duration-200 shadow-sm"
              >
                <span>Перейти в Диспетчерскую</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

            </>}

            {tab === "participants" &&
              <Button
                class='bg-[#4A85F6] py-3 px-6 rounded-xl text-white font-semibold hover:bg-[#3a6bc9] transition-all duration-300 flex items-center gap-2'
                onClick={() => setShowCreateCompanyModal(true)}
              >
                <Icon systemName='plus-white' />
                Добавить организацию
              </Button>
            }

          </div>
        </div>

        {tab === "information" && <PassportInformation />}
        {tab === "participants" && <PassportParticipants />}
        {tab === "hardwares" && <EquipmentRegistry />}
        {tab === "incident" && <Incident />}
        {tab === "documentation" && <PassportDocumentation />}

      </div>
    </>
  )




}

