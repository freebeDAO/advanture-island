'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const JumpableComponent: React.FC = () => {
  const [isJumping, setIsJumping] = useState<boolean>(false);

  // 处理按下空格键触发跳跃
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isJumping) {
        triggerJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping]);

  // 触发跳跃
  const triggerJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false); // 跳跃结束后恢复
      }, 500); // 控制跳跃时长，500ms
    }
  };

  return (
    <div
      className={twMerge(
        clsx(
          'w-32 h-12 md:w-48 md:h-16 bg-green-500 text-white flex items-center justify-center font-bold py-2 px-4 rounded-full shadow-lg text-center',
          'hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out',
          'active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50',
          isJumping && 'transform -translate-y-24'
        )
      )}
      onClick={triggerJump}
    >
      点我或空格跳一下
    </div>
  );
};

export default JumpableComponent;
