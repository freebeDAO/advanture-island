'use client';

import { forwardRef, ReactNode, useImperativeHandle, useState, WheelEventHandler } from "react";

interface Props {
  children: ReactNode
  maxScale?: number
  minScale?: number
  step?: number
  onScaled?: (scale: number) => void
}

export interface RefHandle {
  onZoomIn: (scale?: number) => void
  onZoomOut: (scale?: number) => void
}

const ScaledComponent = forwardRef<RefHandle, Props>(({
  maxScale = 2,
  minScale = 0.5,
  step = 0.1,
  onScaled,
  children,
}, ref) => {

  const [scale, setScale] = useState(1);

  const buildScaleValue = (scale: number) => Math.min(Math.max(minScale, scale), maxScale);

  const handleScale = (newScale: number) => {
    const scaledValue = buildScaleValue(newScale);
    setScale(scaledValue);
    onScaled?.(scaledValue);
  };

  const handleMouseWheel: WheelEventHandler = (event) => {
    const newScale = buildScaleValue(scale + (event.deltaY * -0.01 >= 1 ? step : -step));
    handleScale(newScale);
  };

  useImperativeHandle(ref, () => ({
    onZoomIn: (s) => handleScale(s || scale + step),
    onZoomOut: (s) => handleScale(s || scale - step),
  }));

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 0.2s ease',
      }}
      onWheel={handleMouseWheel}
    >
      {children}
    </div>
  );
});

export default ScaledComponent;