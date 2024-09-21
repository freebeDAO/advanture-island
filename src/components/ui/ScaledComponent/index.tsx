"use client";
import React, { useState } from 'react';

const MAX_SCALE = 2;
const MIN_SCALE = 0.5;

const ScaledComponent = ({ children }: { children?: React.ReactNode }) => {
    const [scale, setScale] = useState(1);

    // 放大
    const handleZoomIn = () => {
        setScale((prevScale) => Math.min(prevScale + 0.1, MAX_SCALE));
    };

    // 缩小
    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.1, MIN_SCALE));
    };

    return (
        <div className='flex flex-col items-center justify-center relative'>
            <div
                style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.3s ease",
                    display: "inline-block",
                }}
            >
                {children}
            </div>
            <div className='flex items-center justify-center m-auto gap-4 mt-2'>
              <button
                className='bg-blue-500 text-white text-2xl leading-6 rounded-sm p-1 aspect-square w-10 rounded-1'
                type='button'
                onClick={handleZoomIn}>
                  +
              </button>
              <button 
                className='bg-blue-500 text-white text-2xl leading-6 rounded-sm p-1 aspect-square w-10 rounded-1'
                type='button'
                onClick={handleZoomOut}>
                  -
              </button>
            </div>
        </div>
    );
};

export default ScaledComponent;