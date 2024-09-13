"use client";
import React, { ReactNode, useState } from 'react';
const Scaled = (children: ReactNode) => {
    const [scale, setScale] = useState(1);

    const handleZoomIn = () => {
        setScale((prevScale) => Math.min(prevScale + 0.1, 2)); // 最大放大到2倍
    };

    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // 最小缩小到0.5倍
    };

    return (
        <div>
            <div
                style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.3s ease",
                    display: "inline-block",
                }}
            >
                {children}
                <div style={{
                    position: 'relative',
                    bottom: '10%',
                    left: '10%'
                }}>
                    <button style={{
                        backgroundColor: 'cadetblue',
                        color: 'white',
                        fontSize: '16px',
                        lineHeight: '18px',
                        borderRadius: '2px',
                        padding: '2px'
                    }} onClick={handleZoomIn}>放大</button>
                    <button style={{
                        backgroundColor: 'cadetblue',
                        color: 'white',
                        fontSize: '16px',
                        lineHeight: '18px',
                        borderRadius: '2px',
                        padding: '2px',
                        marginLeft: "10px"
                    }} onClick={handleZoomOut}>
                        缩小
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Scaled;
