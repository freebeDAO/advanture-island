'use client'
import React, { useState, useEffect, ReactNode } from 'react';


const JumpableComponent:React.FC<{children: ReactNode}> = ({ children }) => {
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const jump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  return (
    <div 
      className={`cursor-pointer transition-transform duration-500 ${isJumping ? '-translate-y-64' : ''}`}
      onClick={jump}
    >
      {children}
    </div>
  );
};

export default JumpableComponent;