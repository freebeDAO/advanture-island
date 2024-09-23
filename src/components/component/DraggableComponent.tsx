/*
 * @Author: liliang
 * @Date: 2024-09-24 02:09:41
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-24 02:21:22
 * @FilePath: /advanture-island/src/components/component/DraggableComponent.tsx
 * @Description: 
 */
// components/DraggableComponent.tsx
import React, { useState } from 'react';

const DraggableComponent: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 开始拖动
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging(true);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 拖动过程中
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragging && e.clientX !== 0 && e.clientY !== 0) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  // 结束拖动
  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '100px',
        height: '100px',
        backgroundColor: 'lightcoral',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'grab',
        border: '2px solid #000',
      }}
    >
      拖动
    </div>
  );
};

export default DraggableComponent;
