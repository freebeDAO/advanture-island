"use client";
import React, { useState } from 'react';

function ScaledComponent(props: any) {
  const [styleVal, setStyleVal] = useState<any>({})

  const onMouseEnter = () => {
    console.log('onMouseEnter');

    setStyleVal({
      transform: ' scale(1.6)',
    });
  }

  const onMouseLeave = () => {
    console.log('onMouseLeave');
    setStyleVal({
      transform: ' scale(1.0)',
    });
  }

  return (
    <div style={styleVal} className='w-[180px] h-[180px] bg-gray-800 cursor-pointer rounded-lg transition-all duration-1000 transition-linear' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className='flex items-center justify-center w-full h-full flex-col'>
        <span className='text-[14px] text-white'>Usage:</span>
        <span className='text-[14px] text-white'> 鼠标进入-离开（放大-缩小）</span>
      </div>
    </div>
  );
}

export default ScaledComponent;