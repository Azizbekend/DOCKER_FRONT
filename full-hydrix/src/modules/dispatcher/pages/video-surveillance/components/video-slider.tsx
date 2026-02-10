import { useState } from "react";
import { Button } from "@/packages/shared-ui/button/button";
import { Icon } from "@/packages/shared-ui/icon";
import { observer } from "mobx-react-lite";
import { CameraItemButton } from "@/modules/dispatcher/widgets/video-surveillance/item-btn";

export const VideoSlider = observer(({ cameraSources, CameraSwitch }: { cameraSources: number[], CameraSwitch: (value: number) => void }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState(0);
    const itemsToShow = 2;

    const nextSlide = () => {
        setCurrentIndex(() => {
            console.log(currentIndex);
            return currentIndex != (cameraSources.length - 3) ? currentIndex + 1 : currentIndex
        });
    };

    const prevSlide = () => {
        setCurrentIndex(() => {
            console.log(currentIndex);
            return currentIndex != 0 ? currentIndex - 1 : 0
        });
    };

    return (
        <div className="flex flex-row gap-4 items-center justify-between mb-6">
            {/* <Button onClick={prevSlide} class="block xl:hidden h-12 w-12 flex items-center justify-center shrink-0" >
                <Icon systemName="arrow-left-blue" />
            </Button> */}

            <div className="flex-1 overflow-hidden">
                <div className="flex flex-row xl:flex-col gap-[16px] transition-transform duration-500 ease-out cursor-pointer overflow-x-auto xl:pb-0 pb-2"
                // style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow) - 16}%)` }}
                >
                    {cameraSources.map((src, index) => (
                        <CameraItemButton onClick={() => { setActive(index); CameraSwitch(src) }} active={active == index} count={index} key={index} />
                    ))}
                </div>
            </div>

            {/* <Button onClick={nextSlide} class="block xl:hidden h-12 w-12 flex items-center justify-center shrink-0 rotate-180  -rotate-90">
                <Icon systemName="arrow-left-blue" />
            </Button> */}
        </div>
    );
})
