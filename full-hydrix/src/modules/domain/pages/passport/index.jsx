
import { Link } from "react-router-dom";
import { Icon } from "@/shared/ui/icon"

import { PassportParticipants } from "./tabs/participants"
import { PassportInformation } from "./tabs/information"
import { useState } from "react";

export const PassportObject = () => {

    const [isTabInformation, setIsTabInformation] = useState(true);


    return (
        <>
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

{/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-20" style={{ fontFamily: "'Open Sans', sans-serif" }}>
  <div className="flex items-center gap-3 text-gray-700">
    <Link 
      to="/domain/list" 
      className="flex items-center gap-2 text-gray-700 hover:text-[#4A85F6] transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>Единый реестр объектов</span>
    </Link>

    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-4 w-4 text-[#4A85F6]" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>

    <span className="font-medium text-[#4A85F6]">Паспорт объекта</span>
  </div>
</div> */}

            <div className="relative top-[15px]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
  <div className="absolute top-[-39px] left-[30px] flex gap-2">
    <button
      onClick={() => setIsTabInformation(true)}
      className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all duration-200 ${
        isTabInformation
          ? 'bg-[#4A85F6] text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      Паспорт
    </button>
    <button
      onClick={() => setIsTabInformation(false)}
      className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all duration-200 ${
        !isTabInformation
          ? 'bg-[#4A85F6] text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      Участники
    </button>
  </div>

  {isTabInformation ? <PassportInformation /> : <PassportParticipants />}
</div>
        </>
    )
}