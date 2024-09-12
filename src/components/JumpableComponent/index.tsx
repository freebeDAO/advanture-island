"use client";

import React, { useEffect, useRef, useState } from 'react';

type StyleType = Record<string, string>;

function JumpableComponent() {
  const [styleVal, setStyleVal] = useState<StyleType>({
    // animation: "bounce 1.5s linear running",
  });

  const styleEl = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    const el = styleEl.current as HTMLDivElement;
    if (el.style.animationPlayState) return
    setStyleVal({
      animation: "bounce 1.5s linear running",
    });
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const el = styleEl.current as HTMLDivElement;
    if (event.key === " " && el.style.animationPlayState === "") {
      setStyleVal({
        animation: "bounce 1.5s linear running",
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
    <div ref={styleEl} style={styleVal} onAnimationEnd={onAnimationEnd} onClick={clickHandler} className='w-[100px] h-[100px] bg-red-500 cursor-pointer relative'>
      {/* transition-all duration-500 transition-linear animation-bounce */}
    </div>
  );
}

export default JumpableComponent;