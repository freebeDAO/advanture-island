'use client'
// components/JumpableComponent.tsx
import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const JumpableComponent = () => {
    const [isJumping, setIsJumping] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const handleJump = () => {
        if (elementRef.current) {
            elementRef.current.classList.add('jump');
            setIsJumping(true);
            setTimeout(() => {
                elementRef?.current?.classList.remove('jump');
                setIsJumping(false);
            }, 500); // 跳跃动画持续时间的一半
        }
    };

    useEffect(() => {
        const handleSpaceKeyPress = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                handleJump();
            }
        };

        window.addEventListener('keydown', handleSpaceKeyPress);
        return () => {
            window.removeEventListener('keydown', handleSpaceKeyPress);
        };
    }, []);

    return (
        <div ref={elementRef} onClick={handleJump} className={`component ${isJumping ? 'jumping' : ''}`}>
            Jumpable Component
        </div>
    );
};

export default JumpableComponent;