import React, { useEffect, useState } from 'react';
import { BsFillCursorFill } from "react-icons/bs";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const updateCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorType = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            setIsPointer(
                hoveredElement?.tagName === 'A' || 
                hoveredElement?.tagName === 'BUTTON' ||
                hoveredElement?.closest('a') ||
                hoveredElement?.closest('button') ||
                window.getComputedStyle(hoveredElement || document.body).cursor === 'pointer'
            );
        };

        window.addEventListener('mousemove', updateCursor);
        window.addEventListener('mouseover', updateCursorType);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            window.removeEventListener('mouseover', updateCursorType);
        };
    }, [position.x, position.y]);

    return (
        <div 
            className="fixed pointer-events-none z-50"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%) scaleX(-1)' // Vertical mirror
            }}
        >
            <BsFillCursorFill 
                className={`
                    text-white text-2xl
                    transition-transform duration-200 ease-out
                    ${isPointer ? 'scale-125' : 'scale-100'}
                `}
            />
        </div>
    );
};

export default CustomCursor; 