
"use client";
import React, { useState, useEffect, CSSProperties, ReactNode } from 'react';
import './JumpableComponent.css'; // 引入 CSS 样式文件
interface DraggableProps {
  children: ReactNode;
  style: CSSProperties;
}
const Jumpable = ({ children, style }: DraggableProps) => {
  const [isBouncing, setIsBouncing] = useState(false);

  // 处理点击事件
  const handleClick = () => {
    triggerBounce();
  };

  // 处理空格键事件
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault(); // 防止空格键滚动页面
      triggerBounce();
    }
  };

  // 触发跳动效果
  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 1000); // 动画持续 1 秒
  };

  // 添加键盘事件监听器
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // 清理事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      style={style}
      className={`box ${isBouncing ? 'bounce' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Jumpable;
