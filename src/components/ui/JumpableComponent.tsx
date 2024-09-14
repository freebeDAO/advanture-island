"use client";
import { useState, useEffect } from 'react';

const JumpableComponent = () => {
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = () => {
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 500);
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
      className={`jumpable ${isJumping ? 'jump' : ''}`}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'lightblue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px',
        transition: 'transform 0.5s',
        transform: isJumping ? 'translateY(-50px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
      onClick={handleJump}
    >
      跳
    </div>
  );
};

export default JumpableComponent;