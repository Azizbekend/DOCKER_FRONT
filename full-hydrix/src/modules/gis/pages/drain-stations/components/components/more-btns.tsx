import { Plant } from "@/entities/plants/types";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { BarControllerDatasetOptions } from "chart.js";
import { useState } from "react";


interface Props {
  setShowEditSidebar: () => void;
  setShowDeleteModal: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}


export const MoreBtn = ({ setShowEditSidebar, setShowDeleteModal, isMenuOpen, setIsMenuOpen }: Props) => {

  return (
    <div className="relative z-10">
      <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Icon systemName="more" />
      </Button>
      {isMenuOpen && (
        <div className="absolute z-10 text-xs transform rounded-[2px] -translate-y-1 -translate-x-[154px] leading-none bg-white shadow w-[160px] border-[#eff4fa] ">
          <Button
            onClick={() => { setShowEditSidebar(); setIsMenuOpen(!isMenuOpen) }}
            class="hover:bg-[#EFF4FA] !rounded-none w-[100%] px-3 py-2"
          >
            <span className="text-[#000] text-[14px]">Редактировать</span>
          </Button>
          <Button
            onClick={setShowDeleteModal}
            class="hover:bg-[#EFF4FA] !rounded-none w-[100%]  px-3 py-2"
          >
            <span className="text-[#D31313] text-[14px]">Удалить</span>
          </Button>
        </div>
      )}
    </div>
  );
};
