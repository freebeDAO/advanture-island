"use client";
import React, { useEffect, useRef } from 'react';

function ScaledComponent(props: any) {
  const dragVal = useRef(false)

  const onMouseDown = () => {

    dragVal.current = true
  }

  const onMouseMove = () => {
    if (dragVal.current) {
      console.log('xxxx');
    }
  }

  const onMouseUp = () => {
    dragVal.current = false
  }

  useEffect(() => {
    fetch('/api/graph').then(r => {
      console.log('r', r);
    })
  })

  return (
    <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <div className='w-[200px] h-[200px] bg-gray-800 rounded-[50%] cursor-pointer'>
      </div>
    </div>
  );
}

export default ScaledComponent;