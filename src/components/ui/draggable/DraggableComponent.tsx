'use client'
import React, { ReactNode, useEffect, useCallback, useState, useRef } from "react";

interface DraggableProps {
    id?: string;
    initialPosition: { x: number; y: number };
    onPositionChange?: (id: string, position: { x: number; y: number }) => void;
    children: ReactNode;
}

const DraggableComponent:React.FC<DraggableProps> = ({ id, initialPosition, onPositionChange, children }) => {
    const [position, setPosition] = useState({...initialPosition});
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const componentRef = useRef(null);

    //处理拖动逻辑
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    }, [position]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            requestAnimationFrame(() => {
                const newPosition = {
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y
                }
                setPosition(newPosition);
                if (typeof onPositionChange === 'function' && id) {
                    onPositionChange(id, newPosition);
                }
            });
        }
    }, [isDragging, dragStart, id, onPositionChange]);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={componentRef}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                padding: '5px',
                userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
}

export default DraggableComponent;