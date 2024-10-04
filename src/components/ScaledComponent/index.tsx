/**
 * 缩放组件
 */
import React, { CSSProperties, memo, ReactNode, useState } from 'react';
import clsx from 'clsx';

export type ScaledComponentProps = {
  className?: string,
  style?: CSSProperties,
  initialScale?: number,
  min?: number,
  max?: number,
  step?: number,
  children: ReactNode,
};

const ScaledComponent: React.FC<ScaledComponentProps> = ({ className, style, initialScale = 1, min = 0.1, max = 10, step = 0.1, children }) => {
  const [scale, setScale] = useState(initialScale);

  return <div className={clsx('h-full flex', className)} style={style}>
    <div className="w-[40px] h-full flex flex-col justify-center items-center">
      {/* 缩放控制滑杆 */}
      <span>{scale}X</span>
      <input
        style={{
          writingMode: 'vertical-lr',
          direction: 'rtl',
        }}
        type="range"
        min={min}
        max={max}
        step={step}
        value={scale}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setScale(Number(e.target.value));
        }}
      />
    </div>
    <div className="flex-auto flex justify-center items-center">
      {/* 缩放元素 */}
      <div style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  </div>
};

export default memo(ScaledComponent);
