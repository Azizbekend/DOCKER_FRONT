import { useSchemeZoom } from "./useSchemeZoom";
import { useSchemeDrag } from "./useSchemeDrag";
import { useScrollLock } from "./useScrollLock";
import { useHardwarePhoto } from "./useHardwarePhoto";

export function useScheme(initialScale: number = 1.6) {
    const { lockScroll, unlockScroll } = useScrollLock();
    const { getPhoto, addStatusClass } = useHardwarePhoto();

    const { containerRef, imgRef, scale, bounds, offset, setScale, setOffset, onWheel } = useSchemeZoom(initialScale);
    const { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd, } = useSchemeDrag({ offset, setOffset, bounds });

    return {
        containerRef,
        imgRef,
        onWheel,

        // zoom
        scale,
        setScale,

        // drag
        offset,
        onMouseDown,
        onMouseMove,
        onMouseUp,

        // utils
        lockScroll,
        unlockScroll,
        getPhoto,
        addStatusClass,
        onTouchStart, onTouchMove, onTouchEnd
    };
}
