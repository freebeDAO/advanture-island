"use client";
import { useState } from 'react';

interface Scale {
  children: React.ReactNode;
  className?: string;
  stepQuantity?: number;
  maxSize?: number;
  minSize?: number;
  initBoxSize?: number;
}

const ScaledComponent: React.FC<Scale> = ({
  children,
  className = "",
  initBoxSize = 20,
  stepQuantity = 0.1,
  maxSize = 10,
  minSize = 0.5,
}) => {
  const [scale, setScale] = useState(1);

  const handleZoomOut = () => {
    setScale((prevScale) => Math.min(prevScale + stepQuantity, maxSize));
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.max(prevScale - stepQuantity, minSize));
  };

  return (
    <div className={`flex flex-col m-5 ${className} items-center justify-center`}>
      <div className="bg-green-100 shadow-md rounded-lg p-4 transition-transform duration-500 cursor-pointer flex space-x-4"
        style={{ marginBottom: `${Math.max(20, (scale - 1) * initBoxSize)}px` }}>
        <button onClick={handleZoomOut}>
          放大
        </button>
        <button onClick={handleZoomIn}>
          缩小
        </button>
      </div>
      <div
        id="123"
        className='bg-blue-100 shadow-md rounded-lg p-4 transition-transform duration-500 cursor-pointer my-auto flex items-center justify-center'
        style={{
          width: `${initBoxSize}px`,
          height: `${initBoxSize}px`,
          transform: `scale(${scale})`,
          transition: 'transform 0.3s',
          fontSize: `${initBoxSize / 20}vw`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaledComponent;