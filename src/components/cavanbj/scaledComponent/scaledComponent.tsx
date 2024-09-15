'use client';

import React, { useState, useEffect } from 'react';

interface ScaledComponentProps {
  children: React.ReactNode;
  step: number;
  minScale: number;
  maxScale: number;
  overflowShowScrollBar: boolean;
}

/**
 * CircleComponent 组件用于显示一个缩放的圆形。
 * @param children - 被缩放的对象，这里作为子元素
 * @param step - 缩放变化的比率
 * @param minScale - 最大放大倍数
 * @param maxScale - 最小缩小倍数
 * @param overflowShowScrollBar - 超出父容器大小时是否显示滚动条
 */
const ScaledComponent: React.FC<ScaledComponentProps> = ({ children, step = 0.1, minScale = 0.1, maxScale = 10, overflowShowScrollBar = false }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setScale(scale + step > maxScale? maxScale: scale + step);
      } else {
        setScale(scale - step > minScale? scale - step : minScale);
      }
    };
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [scale, step, minScale, maxScale, overflowShowScrollBar]);

  let overflow = 'visible';
  if (overflowShowScrollBar) {
    overflow = 'auto'
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block', overflow: `${overflow}` }}>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          display: 'inline-block',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScaledComponent;