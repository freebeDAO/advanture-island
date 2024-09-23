/*
 * @Author: liliang
 * @Date: 2024-09-20 19:13:18
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-24 01:10:03
 * @FilePath: /advanture-island/src/components/component/StyleControlComponent.tsx
 * @Description: 
 */
import React, { CSSProperties } from 'react';

interface StyleControlComponentProps {
  shape: 'circle' | 'ellipse' | 'rectangle' | 'rounded' | 'triangle';
  backgroundColor: string;
  borderSize: number;
  borderColor: string;
  text: string;
  fontSize: number;
  fontColor: string;
  textPosition: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const StyleControlComponent: React.FC<StyleControlComponentProps> = ({
  shape,
  backgroundColor,
  borderSize,
  borderColor,
  text,
  fontSize,
  fontColor,
  textPosition,
}) => {
  // 处理不同形状的样式
  const getShapeStyle = (): CSSProperties => {
    switch (shape) {
      case 'circle':
        return { borderRadius: '50%' };
      case 'ellipse':
        return { borderRadius: '50%', width: '150px', height: '100px' };
      case 'rectangle':
        return {};
      case 'rounded':
        return { borderRadius: '15px' };
      case 'triangle':
        return {
          width: 0,
          height: 0,
          borderLeft: '50px solid transparent',
          borderRight: '50px solid transparent',
          borderBottom: `100px solid ${backgroundColor}`,
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  // 文本位置样式
  const getTextPositionStyle = (): CSSProperties => {
    const positionMap: { [key: string]: CSSProperties } = {
      'topLeft': { justifyContent: 'flex-start', alignItems: 'flex-start' },
      'topCenter': { justifyContent: 'center', alignItems: 'flex-start' },
      'topRight': { justifyContent: 'flex-end', alignItems: 'flex-start' },
      'middleLeft': { justifyContent: 'flex-start', alignItems: 'center' },
      'middleCenter': { justifyContent: 'center', alignItems: 'center' },
      'middleRight': { justifyContent: 'flex-end', alignItems: 'center' },
      'bottomLeft': { justifyContent: 'flex-start', alignItems: 'flex-end' },
      'bottomCenter': { justifyContent: 'center', alignItems: 'flex-end' },
      'bottomRight': { justifyContent: 'flex-end', alignItems: 'flex-end' },
    };
    return positionMap[textPosition];
  };

  return (
    <div
      style={{
        display: 'flex',
        ...getTextPositionStyle(),
        width: '300px',
        height: '300px',
        backgroundColor: shape === 'triangle' ? 'transparent' : backgroundColor,
        border: shape !== 'triangle' ? `${borderSize}px solid ${borderColor}` : 'none',
        ...getShapeStyle(),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontSize: `${fontSize}px`,
          color: fontColor,
          textAlign: 'center',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default StyleControlComponent;