"use client";

import React, { useEffect, useRef, useState } from 'react';


function JumpableComponent(props: any) {
  const [styleVal, setStyleVal] = useState<any>({
    animation: "bounce 1s linear",
    animationPlayState: "paused",
  });

  const styleEl = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    setStyleVal({
      animation: "bounce 1s linear",
      animationPlayState: "running",
    });
  }

  const handleKeyDown = (event: any) => {
    if (event.key === ' ') {
      setStyleVal({
        animation: "bounce 1s linear",
        animationPlayState: "running",
      });
    }
  }

  const onAnimationEnd = () => setStyleVal(null);

  useEffect(() => {
    // 设置CSS变量
    styleEl.current?.style.setProperty('--trans-value', '-160px');
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  })

  return (
    <div ref={styleEl} style={styleVal} onAnimationEnd={onAnimationEnd} onClick={clickHandler} className='w-[100px] h-[100px] bg-red-500 cursor-pointer'>
      {/* transition-all duration-500 transition-linear animation-bounce */}
    </div>
  );
}

export default JumpableComponent;