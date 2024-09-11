"use client";
import React, { useRef, useState } from 'react';

function ScaledComponent(props: any) {
  const isDragVal = useRef(false);
  const cachedArea = useRef({
    width: 0,
    height: 0,
  });
  const [styleVal, setStyleVal] = useState({
    width: 240,
    height: 240,
  });
  const [startPoint, setStartPoint] = useState({
    x: 0,
    y: 0,
  });

  const onMouseDown = (event: any) => {
    isDragVal.current = true;
    setStartPoint({
      x: event.clientX,
      y: event.clientY,
    });
    cachedArea.current = styleVal;
  }

  const onMouseMove = (event: any) => {
    if (isDragVal.current) {
      const xVal = event.clientX - startPoint.x;
      const yVal = event.clientY - startPoint.y;
      setStyleVal({
        width: cachedArea.current.width + xVal,
        height: cachedArea.current.height + yVal,
      });
    }
  }

  const onMouseUp = () => {
    isDragVal.current = false
  }

  return (
    <div style={styleVal} className='w-[240px] h-[240px] bg-gray-800 cursor-pointer' onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseOut={onMouseUp}>
    </div>
  );
}

export default ScaledComponent;