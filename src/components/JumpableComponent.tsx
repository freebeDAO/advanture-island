'use client';
import React, { useState, useEffect } from 'react';
import 'animate.css';

interface JumpableComponent {
  content?: string;
}
const JumpableComponent = ({ content = 'JumpableComponent' }) => {
const [isBouncing, setIsBouncing] = useState(false);
const style = {
    position: 'relative',
    width: '200px',
    height: '100px',
    backgroundColor: 'red',
  };
  
const handleBounce = ()=>{
  setIsBouncing(true);
  setTimeout(() => {
    setIsBouncing(false);
  }, 1000);
}
const onKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    handleBounce();
  }
};
useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
    document.removeEventListener('keydown', onKeyDown);
    };
}, []);
  return (
    <>
    <div 
      data-testid='jumpable-div'
      style={style} 
      className={`${isBouncing ? 'animate__animated animate__bounce' : ''}`}
      onClick={handleBounce}      
    >{content}</div>
    
    </>
  );
};

export default JumpableComponent;