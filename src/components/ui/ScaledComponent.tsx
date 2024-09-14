"use client"
import { useState } from 'react';

const ScaledComponent = () => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2)); 
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightcoral',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px auto',
          transform: `scale(${scale})`,
          transition: 'transform 0.3s',
        }}
      >
        <p style={{ color: 'white' }}>盒子</p>
      </div>
      <button onClick={handleZoomIn} style={{ marginRight: '10px' }}>
        放大
      </button>
      <button onClick={handleZoomOut}>
        缩小
      </button>
    </div>
  );
};

export default ScaledComponent;