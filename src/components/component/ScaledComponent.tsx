"use client";

import React, { useState } from "react";

interface ScaledComponentProps {
  children: React.ReactNode;
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  step?: number;
}

const ScaledComponent: React.FC<ScaledComponentProps> = ({
  children,
  initialScale = 1,
  minScale = 0.5,
  maxScale = 2,
  step = 0.1,
}) => {
  const [scale, setScale] = useState(initialScale);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + step, maxScale));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - step, minScale));
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <button
          onClick={handleZoomOut}
          className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600"
        >
          -
        </button>
        <button
          onClick={handleZoomIn}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        {children}
      </div>
    </div>
  );
};

export default ScaledComponent;
