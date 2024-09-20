/*
 * @Author: liliang
 * @Date: 2024-09-21 00:53:24
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-21 00:56:57
 * @FilePath: /advanture-island/src/components/component/DraggableComponent.tsx
 * @Description: 
 */
// DraggableComponent.js
import React, { useState } from 'react';

const DraggableComponent = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    // 开始拖动，记录当前鼠标位置与元素的偏移量
    setDragging(true);
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    // 当拖动时，更新组件位置
    if (dragging) {
      setPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    // 停止拖动
    setDragging(false);
  };

  return (
    <div
      className="draggable"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;
