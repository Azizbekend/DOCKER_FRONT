import { useRef, useState, useEffect, useCallback } from "react";
import { BoundsType, OffsetType } from "../../../types/type";

export function useSchemeZoom(initialScale: number) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const [scale, setScale] = useState(initialScale);
    const [bounds, setBounds] = useState<BoundsType>({ minX: 0, minY: 0, maxX: 0, maxY: 0 });
    const [offset, setOffset] = useState<OffsetType>({ x: 0, y: 0 });

    const updateBounds = useCallback(() => {
        if (!containerRef.current || !imgRef.current) return;

        const container = containerRef.current;
        const img = imgRef.current;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const imageWidth = img.naturalWidth * scale;
        const imageHeight = img.naturalHeight * scale;

        setBounds({
            minX: containerWidth - imageWidth,
            minY: containerHeight - imageHeight,
            maxX: 0,
            maxY: 0,
        });

        setOffset(prev => ({
            x: Math.min(Math.max(prev.x, containerWidth - imageWidth), 0),
            y: Math.min(Math.max(prev.y, containerHeight - imageHeight), 0)
        }));
    }, [scale]);

    useEffect(() => {
        updateBounds();
        window.addEventListener("resize", updateBounds);
        return () => window.removeEventListener("resize", updateBounds);
    }, [updateBounds]);


    const onWheel = useCallback((e: WheelEvent) => {
        if (!containerRef.current) return;

        e.preventDefault();

        const container = containerRef.current;

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setScale(prevScale => {
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newScale = Math.min(Math.max(prevScale * zoomFactor, 1), 5);

            const schemeX_before = (mouseX - offset.x) / prevScale;
            const schemeY_before = (mouseY - offset.y) / prevScale;

            setOffset(prev => ({
                x: mouseX - schemeX_before * newScale,
                y: mouseY - schemeY_before * newScale
            }));

            return newScale;
        });

    }, [offset]);


    return { containerRef, imgRef, scale, setScale, bounds, offset, setOffset, onWheel };
}
