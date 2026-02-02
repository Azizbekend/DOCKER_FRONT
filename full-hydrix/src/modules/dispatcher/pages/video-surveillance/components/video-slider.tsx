import { useState } from "react";
import { Button } from "@/packages/shared-ui/button/button";
import { Icon } from "@/packages/shared-ui/icon";
import { CameraItem } from "./video-item";
import { observer } from "mobx-react-lite";

export const VideoSlider = observer(({ cameraSources, CameraSwitch }: { cameraSources: number[], CameraSwitch: (value: number) => void }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState(0);
    const itemsToShow = 4;

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev >= cameraSources.length - itemsToShow ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? cameraSources.length - itemsToShow : prev - 1
        );
    };

    return (
        <div className="w-full mx-auto">
            <div className="flex gap-4 items-center justify-between mb-6">

                <Button
                    onClick={prevSlide}
                    class="h-12 w-12 flex items-center justify-center shrink-0"
                >
                    <Icon systemName="arrow-left-blue" />
                </Button>

                <div className="flex-1 overflow-hidden">
                    <div
                        className="flex gap-[16px] transition-transform duration-500 ease-out cursor-pointer"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                        }}
                    >
                        {cameraSources.map((src, index) => (
                            <CameraItem onClick={() => { setActive(index); CameraSwitch(src) }} active={active == index} count={index} key={index} />
                        ))}
                    </div>
                </div>

                <Button
                    onClick={nextSlide}
                    class="h-12 w-12 flex items-center justify-center shrink-0 rotate-180"
                >
                    <Icon systemName="arrow-left-blue" />
                </Button>

            </div>
        </div>
    );
})
