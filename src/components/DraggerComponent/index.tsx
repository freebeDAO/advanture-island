"use client";
import React, { useRef, useState } from 'react';

function DraggerComponent(props: any) {
  const isDragging = useRef(false);
  // 使用 useState 来跟踪元素的位置
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 鼠标按下事件处理函数
  const handleMouseDown = (event: any) => {
    isDragging.current = true;
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  // 鼠标移动事件处理函数
  const handleMouseMove = (event: any) => {
    if (isDragging.current) {
      setPosition({
        x: event.clientX - offset.x,
        y: event.clientY - offset.y,
      });
    }
  };

  // 鼠标释放事件处理函数
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className='w-[100px] h-[100px] absolute bg-red-500 cursor-pointer animate-bounce'
    />
  );
}

export default DraggerComponent;