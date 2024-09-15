'use client'

import clsx from 'clsx';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function JumpableComponent() {
    const [keysPressed, setKeysPressed] = useState<boolean>(false);
    const handleSpacePress = (e:any) => {
        if (e.key === ' ') {
            jumpAnimation()
        }
      };

    const jumpAnimation = () => {
        setKeysPressed(true)

        const timer = setTimeout(() => {
            setKeysPressed(false)
            clearTimeout(timer)
          }, 500);
    }

    const onClick = () => {
        jumpAnimation()
    }
  
 
  
    useEffect(() => {
      document.addEventListener("keydown", handleSpacePress, false);
      return () => {
        document.removeEventListener("keydown", handleSpacePress, false);
      };
    }, []);

  return (
        // <div className={`h-[100px] w-[100px] bg-[#000]   ${keysPressed ? "animate-bounce" : ''}`} >
        // </div>  
        <div className={clsx('h-[100px] w-[100px] bg-[#000] ', keysPressed && 'animate-bounce')}
            onClick={() => onClick()}
        ></div>
  )
}

export default JumpableComponent