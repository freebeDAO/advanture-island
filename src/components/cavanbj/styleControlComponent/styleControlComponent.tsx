'use client';

import React from 'react';

interface ShapeProps {
  shapeType: 'circle' | 'ellipse' | 'rectangle' | 'triangle' | 'roundedRectangle';
  width: string;
  height?: string;
  backgroundColor: string;
}

class ShapeComponent extends React.Component<ShapeProps> {
  render() {
    const { shapeType, width, height, backgroundColor } = this.props;

    let shape;
    switch (shapeType) {
      case 'circle':
        shape = (
          <div
            style={{
              width: width+'px',
              height: width+'px',
              borderRadius: '50%',
              backgroundColor: backgroundColor,
            }}
          />
        );
        break;
      case 'ellipse':
        shape = (
          <div
            style={{
              width: width+'px',
              height: height+'px',
              borderRadius: '50%',
              backgroundColor: backgroundColor,
            }}
          />
        );
        break;
      case 'rectangle':
        shape = (
          <div
            style={{
              width: width+'px',
              height: height+'px',
              backgroundColor: backgroundColor,
            }}
          />
        );
        break;
      case 'triangle':
        shape = (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${Number(width)/2}px solid transparent`,
              borderRight: `${Number(width)/2}px solid transparent`,
              borderBottom: `${Math.sqrt(3)*Number(width)/2}px solid skyblue`,
            }}
          />
        );
        break;
      case 'roundedRectangle':
        shape = (
          <div
            style={{
              width: width+'px',
              height: height+'px',
              backgroundColor: backgroundColor,
              borderRadius: '10px', // 可以根据需要调整圆角大小
            }}
          />
        );
        break;
      default:
        shape = null;
    }

    return shape;
  }
}

export default ShapeComponent;