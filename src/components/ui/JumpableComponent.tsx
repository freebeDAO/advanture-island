"use client";
import { useState, useEffect } from 'react';

interface Jumpable {
  children: React.ReactNode;
  className?: string;
  jumpDistance?: number;
  jumpDuration?: number;
  boxSize?: number;
}

const JumpableComponent: React.FC<Jumpable> = ({ children, className = '', jumpDistance = -50, jumpDuration = 600, boxSize = 50 }) => {
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = () => {
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, jumpDuration);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      handleJump();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`${className}`}
      style={{
        width: `${boxSize}px`,
        height: `${boxSize}px`,
        transform: isJumping ? 'translateY(' + jumpDistance + 'px)' : 'translateY(0)',
      }}
      onClick={handleJump}
    >
      {children}
    </div>
  );
};

export default JumpableComponent;