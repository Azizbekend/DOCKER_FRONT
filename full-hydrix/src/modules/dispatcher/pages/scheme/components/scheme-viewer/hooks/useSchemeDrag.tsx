import { useState } from "react";

type Point = { x: number; y: number };

export function useSchemeDrag({ offset, setOffset, bounds }) {
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState<Point>({ x: 0, y: 0 });

    const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

    const startDrag = (clientX: number, clientY: number) => {
        setDragging(true);
        setStart({
            x: clientX - offset.x,
            y: clientY - offset.y,
        });
    };

    const moveDrag = (clientX: number, clientY: number) => {
        if (!dragging) return;

        const newX = clientX - start.x;
        const newY = clientY - start.y;

        setOffset({
            x: clamp(newX, bounds.minX, bounds.maxX),
            y: clamp(newY, bounds.minY, bounds.maxY),
        });
    };

    const endDrag = () => {
        setDragging(false);
    };

    /* ===== Mouse ===== */

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        moveDrag(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
        endDrag();
    };

    /* ===== Touch ===== */

    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        moveDrag(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
        endDrag();
    };

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp,

        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
}
