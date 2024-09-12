"use client";
import React, { useEffect, useState } from 'react';
const Draggable = ({ children, style }) => {
    const [position, setPosition] = useState({ x: style.left, y: style.top });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // 开始拖动，记录鼠标点击时的位置
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setOffset({
            x: event.clientX - position.x,
            y: event.clientY - position.y,
        });
    };

    // 处理鼠标移动，更新组件的位置
    const handleMouseMove = (event) => {
        if (isDragging) {
            setPosition({
                x: event.clientX - offset.x,
                y: event.clientY - offset.y,
            });
        }
    };

    // 停止拖动
    const handleMouseUp = () => {
        setIsDragging(false);
    };

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
    }, [isDragging, offset]);

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                ...style,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
