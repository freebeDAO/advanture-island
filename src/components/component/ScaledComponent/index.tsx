'use client'

// components/ScaledComponent.tsx
import React, { useState, useRef } from 'react';
import './index.css';

const ScaledComponent = () => {
    const [scaleFactor, setScaleFactor] = useState(1);
    const elementRef = useRef<HTMLDivElement>(null);

    const handleScale = (factor: number) => {
        if (elementRef.current) {
            setScaleFactor(prevScale => prevScale * factor);
        }
    };

    return (
        <div ref={elementRef} className={'component'}>
            <div className={'innerComponent'} style={{ transform: `scale(${scaleFactor})` }}>
                Scaled Component
            </div>
            <div>
                <button onClick={() => handleScale(1.2)} className={'button'}>+</button>
                <button onClick={() => handleScale(0.8)} className={'button'}>-</button>
            </div>

        </div>
    );
};

export default ScaledComponent;