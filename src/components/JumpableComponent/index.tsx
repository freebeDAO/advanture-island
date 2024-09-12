"use client";

import React, { useEffect, useRef, useState } from 'react';

type StyleType = Record<string, string>;

function JumpableComponent() {
  const [styleVal, setStyleVal] = useState<StyleType>({
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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      setStyleVal({
        animation: "bounce 1s linear",
        animationPlayState: "running",
      });
    }
  }

  const onAnimationEnd = () => setStyleVal({});

  useEffect(() => {
    // 设置CSS变量
    styleEl.current?.style.setProperty('--trans-value', '-160px');
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [])

  return (
    <div ref={styleEl} style={styleVal} onAnimationEnd={onAnimationEnd} onClick={clickHandler} className='w-[100px] h-[100px] bg-red-500 cursor-pointer'>
      {/* transition-all duration-500 transition-linear animation-bounce */}
    </div>
  );
}

export default JumpableComponent;