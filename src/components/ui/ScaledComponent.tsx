'use client'

import React, { useState } from 'react';

interface ScaledComponentProps {
    children: React.ReactNode;
    initialScale?: number;
}

const ScaledComponent: React.FC<ScaledComponentProps> = ({ children, initialScale = 1 }) => {
  const [scale, setScale] = useState(initialScale);

  const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(event.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        {children}
      </div>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={scale}
        onChange={handleScaleChange}
        className="mt-4 w-48"
      />
      <span className="mt-2">Scale: {scale.toFixed(1)}</span>
    </div>
  );
};

export default ScaledComponent;