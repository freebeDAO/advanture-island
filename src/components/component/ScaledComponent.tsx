/*
 * @Author: liliang
 * @Date: 2024-09-20 18:29:00
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-20 18:59:51
 * @FilePath: /advanture-island/src/components/component/ScaledComponent.tsx
 * @Description: 
 */
import React, { useState } from 'react';

interface ScaledComponentProps {
  children: React.ReactNode;
}

const ScaledComponent: React.FC<ScaledComponentProps> = ({ children }) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prevScale => Math.min(prevScale + 0.1, 2));
  const handleZoomOut = () => setScale(prevScale => Math.max(prevScale - 0.1, 0.5));

  return (
    <div style={{ transform: `scale(${scale})`, transition: 'transform 0.3s' }}>
      <div>{children}</div>
      <div >
        <button onClick={handleZoomIn} class="w-12 bg-indigo-500 rounded-md text-white mx-3">放大</button>
        <button onClick={handleZoomOut} class="w-12 bg-indigo-500 rounded-md text-white mx-3">缩小</button>
      </div>
    </div>
  );
};

export default ScaledComponent;