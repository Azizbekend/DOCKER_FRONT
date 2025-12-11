import { useState } from "react";

export function useSchemeDrag({ offset, setOffset, bounds }) {
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        const newX = e.clientX - start.x;
        const newY = e.clientY - start.y;

        setOffset({
            x: Math.min(Math.max(newX, bounds.minX), bounds.maxX),
            y: Math.min(Math.max(newY, bounds.minY), bounds.maxY),
        });
    };

    const onMouseUp = () => setDragging(false);

    return { onMouseDown, onMouseMove, onMouseUp };
}
