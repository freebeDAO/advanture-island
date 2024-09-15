'use client';

import React, { ReactNode, useState, useEffect } from 'react';

interface ScaledComponentProps {
  width: number;
  height: number;
  scale: number;
  children: ReactNode;
}

const ScaledComponent: React.FC<ScaledComponentProps> = ({ width, height, scale: initialScale, children }) => {
    const [scale, setScale] = useState(initialScale);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                setScale(prevScale => Math.min(prevScale + 0.1, 2));
            } else if (event.key === "ArrowDown") {
                setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div
            className="bg-blue-100 rounded-full cursor-pointer transition-transform duration-500"
            style={{ width: `${width}px`, height: `${height}px`, transform: `scale(${scale})` }}
            onClick={() => setScale(1)}
        >
            {children}
        </div>
    );
}

export default ScaledComponent;

