"use client";
import React, { useEffect, useRef, useState } from 'react';

function DraggerComponent() {
  const isDragging = useRef(false);
  const offsetVal = useRef({ x: 0, y: 0 })
  // 使用 useState 来跟踪元素的位置
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 鼠标按下事件处理函数
  const handleMouseDown = (event: React.MouseEvent) => {
    isDragging.current = true;
    offsetVal.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    }
  };

  // 鼠标移动事件处理函数
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.current) {
      const current = offsetVal.current;
      // console.log('###########', event);

      setPosition({
        x: event.clientX - current.x,
        y: event.clientY - current.y,
      });
    }
  };

  // 鼠标释放事件处理函数
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      className='w-[100px] h-[100px] absolute bg-red-500 rounded-lg cursor-pointer'
    />
  );
}

export default DraggerComponent;