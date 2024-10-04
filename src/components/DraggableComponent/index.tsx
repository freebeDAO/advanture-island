/**
 * 拖拽组件
 */
import React, { CSSProperties, memo, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export type DraggableComponentProps = {
  className?: string,
  style?: CSSProperties,
  children: ReactNode,
};

// 拖拽hook
export const useDrag = (ref: React.MutableRefObject<null | HTMLDivElement>) => {
  useEffect(() => {
    let x = 0;
    let y = 0;
    let xOffset = 0;
    let yOffset = 0;

    const element = ref.current;

    if (!element) {
      return () => { };
    }
    // 鼠标down事件
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      xOffset = e.clientX;
      yOffset = e.clientY;
      // 鼠标move事件，计算位置
      const handleMouseMove = (e: MouseEvent) => {
        x += e.clientX - xOffset;
        y += e.clientY - yOffset;
        xOffset = e.clientX;
        yOffset = e.clientY;
        element.style.transform = `translate(${x}px, ${y}px)`;
      };
      // 鼠标up事件，取消move，up事件监听
      const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    element?.addEventListener('mousedown', handleMouseDown);

    return () => {
      element?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [ref.current]);
};

const DraggableComponent: React.FC<DraggableComponentProps> = ({ className, style, children }) => {

  const ref = useRef(null);

  useDrag(ref);

  return <div ref={ref} className={clsx('inline-block cursor-grab', className)} style={style}>
    {children}
  </div>
};

export default memo(DraggableComponent);
