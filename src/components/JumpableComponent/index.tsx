'use client';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const LuffyQVersion: React.FC = () => {
  const [isJumping, setIsJumping] = useState<boolean>(false);

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

  const triggerJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }
  };

  return (
    <div
      className={twMerge(
        clsx(
          'flex justify-center items-center cursor-pointer transition-transform duration-500',
          isJumping && 'transform -translate-y-24'
        )
      )}
      onClick={triggerJump}
    >
      {/* 采用 SVG 构建Q版路飞 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 200"
        className="w-32 h-64"
      >
        {/* 草帽 */}
        <ellipse cx="50" cy="25" rx="30" ry="10" fill="#FFD700" stroke="#000" strokeWidth="2" />
        <rect x="20" y="25" width="60" height="5" fill="#FF4500" />
        
        {/* 头部 */}
        <circle cx="50" cy="50" r="20" fill="#FFE4C4" stroke="#000" strokeWidth="2" />

        {/* 头发 */}
        <path d="M30 40 Q50 30, 70 40" fill="#000" />

        {/* 眼睛 */}
        <circle cx="40" cy="45" r="3" fill="#000" />
        <circle cx="60" cy="45" r="3" fill="#000" />

        {/* 嘴巴 */}
        <path d="M40 55 Q50 65, 60 55" stroke="#000" strokeWidth="2" fill="none" />

        {/* 身体 - 红色背心 */}
        <rect x="40" y="70" width="20" height="30" fill="#FF6347" stroke="#000" strokeWidth="2" />

        {/* 左手 */}
        <rect x="20" y="75" width="10" height="5" fill="#FFE4C4" stroke="#000" strokeWidth="2" />
        
        {/* 右手 */}
        <rect x="70" y="75" width="10" height="5" fill="#FFE4C4" stroke="#000" strokeWidth="2" />

        {/* 左腿 */}
        <rect x="42" y="100" width="7" height="30" fill="#000" stroke="#000" strokeWidth="2" />
        
        {/* 右腿 */}
        <rect x="51" y="100" width="7" height="30" fill="#000" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default LuffyQVersion;
