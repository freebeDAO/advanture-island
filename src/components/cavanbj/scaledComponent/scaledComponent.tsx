'use client';

import React, { useState } from 'react';



/**
 * CircleComponent 组件用于显示一个缩放的圆形。
 * @param minRadius - 圆形的最小半径，默认为 5。
 * @param maxRadius - 圆形的最大半径。
 */
const CircleComponent: React.FC<CircleComponentProps> = ({minRadius, maxRadius}) => {
  const [radius, setRadius] = useState<number>(50);

  if (minRadius < 5) {
    minRadius = 5
  }
  if (maxRadius < minRadius) {
    maxRadius = minRadius
  }

  const increaseRadius = () => {
    setRadius(Math.min(maxRadius, radius + 10));
  };

  const decreaseRadius = () => {
    if (radius > minRadius) {
      setRadius(Math.max(minRadius, radius - 10));
    }
  };

  return (
    <div>
      <svg width={radius * 2} height={radius * 2}>
        <circle cx={radius} cy={radius} r={radius} fill="blue" />
      </svg>
      <button style={{ marginRight: '20px' }} onClick={increaseRadius}>+</button>
      <button onClick={decreaseRadius}>-</button>
    </div>
  );
};

type CircleComponentProps = {
  minRadius: number; // 最小半径
  maxRadius: number; // 最大半径
};

export  default CircleComponent