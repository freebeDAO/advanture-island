'use client';
import React, { useState } from 'react';

interface ScaledComponent {
  content?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultFontSize?: number;
}

const ScaledComponent: React.FC<ScaledComponent> = ({ content = 'Zoomable Component', defaultWidth=100,defaultHeight=100,defaultFontSize=18}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [ratio, setValue] = useState(50); // 默认值设为50

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      setValue(value);
      const sizeRatio = (value / 50);
      changeSize(sizeRatio);
      setFontSize(sizeRatio*defaultFontSize);
  };
  
  const changeSize = (sizeRatio: number)=>{
    setWidth(sizeRatio*defaultHeight);
    setHeight(sizeRatio*defaultHeight);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <input
        data-testid='scaled-slider'
        type="range"
        min={0}
        max={100}
        value={ratio}
        onChange={handleChange}
      />
      <div
        data-testid='scaled-div'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          fontSize: `${fontSize}px`,
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default ScaledComponent;