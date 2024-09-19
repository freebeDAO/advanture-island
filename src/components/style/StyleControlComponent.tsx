'use client';
import * as React from 'react';
import { Shape, TextPosition } from '../../types/styles'; // Import the types


// Define the props interface for the component
interface StyleDisplayProps {
  shape: Shape;
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
  text: string;
  textSize: string;
  textColor: string;
  textPosition: TextPosition;
}

// The StyleControlComponent component
const StyleDisplayComponent: React.FC<StyleDisplayProps> = ({
  shape,
  backgroundColor,
  borderWidth,
  borderColor,
  text,
  textSize,
  textColor,
  textPosition,
}) => {
 
  // Default triangle height and lateral
  const defaultTriangleHeight = 300;
  const defaultTriangleLateral = Math.round( (defaultTriangleHeight * 2) / Math.sqrt(3) / 2 );
  
  // Calculate the actual triangle height
  const getActualTriangleHeight = () => {
    return defaultTriangleHeight - (borderWidth != 0 ? (borderWidth + 2) : borderWidth)  * 2;
  }

  // Calculate the actual triangle lateral
  const getActualTriangleLateral = () => {
    const actualTriangleHeight = getActualTriangleHeight();
    return Math.round( (actualTriangleHeight * 2) / Math.sqrt(3) / 2 );
  }

  // Calculate the actual triangle top
  const getActualTriangleTop = () => {
    const actualTriangleHeight = getActualTriangleHeight();
    return (defaultTriangleHeight - actualTriangleHeight) * 2 / 3;
  }

  const shapes = {
    circle: {
      borderRadius: '50%',
      padding: '0',
      width: '50%', // Ensure the width is set to match the height
      // height: '100%', // Ensure the height is set to match the width
      aspectRatio: '1 / 1', // Set the aspect ratio to 1:1 to ensure it's a perfect circle
    },
    ellipse: {
      borderRadius: '50%',
      width: '50%',
      aspectRatio: '2 / 1', // Aspect ratio for an ellipse
    },
    rectangle: {
      borderRadius: '0',
      padding: '0',
      width: '50%',
      height: '25%',
    },
    roundedRectangle: {
      borderRadius: '20px',
      padding: '0',
      width: '50%',
      height: '25%',
    },
    equilateralTriangle: {
      width: '0',
      height: '0',
      borderLeft: `${defaultTriangleLateral}px solid transparent`, /* 左边边框宽度决定三角形的宽度 */
      borderRight: `${defaultTriangleLateral}px solid transparent`, /* 右边边框宽度可以为0，使得三角形两边点直线 */
      borderBottom: `${defaultTriangleHeight}px solid ${borderColor}`, /* 底边边框宽度和颜色决定三角形的高度和颜色 */
      position: 'relative',
    },
  };

  // Mapping of text positions to Tailwind classes and styles
  const textPositions = {
    topLeft: { alignItems: 'flex-start', justifyContent: 'flex-start' },
    topCenter: { alignItems: 'flex-start', justifyContent: 'center' },
    topRight: { alignItems: 'flex-start', justifyContent: 'flex-end' },
    centerLeft: { alignItems: 'center', justifyContent: 'flex-start' },
    center: { alignItems: 'center', justifyContent: 'center' },
    centerRight: { alignItems: 'center', justifyContent: 'flex-end' },
    bottomLeft: { alignItems: 'flex-end', justifyContent: 'flex-start' },
    bottomCenter: { alignItems: 'flex-end', justifyContent: 'center' },
    bottomRight: { alignItems: 'flex-end', justifyContent: 'flex-end' },
  };


  return (
    <>
    {shape === 'equilateralTriangle' ? (
      <div style={{
        width: `${defaultTriangleLateral * 2}px`,
        height: `${defaultTriangleHeight}px`,
        backgroundColor: 'transparent',
        position: 'relative',
      }}>
        <div
          data-testid="style-control-component"
          style={{
            ...shapes[shape],
          }}>
            <div
            style={{
              display: 'block',
              borderLeft: `${getActualTriangleLateral()}px solid transparent`, /* 左边边框宽度决定三角形的宽度 */
              borderRight: `${getActualTriangleLateral()}px solid transparent`, /* 右边边框宽度可以为0，使得三角形两边点直线 */
              borderBottom: `${getActualTriangleHeight()}px solid ${backgroundColor}`, /* 底边边框宽度和颜色决定三角形的高度和颜色 */
              position: 'absolute',
              left: `-${getActualTriangleLateral()}px`,
              top: `${getActualTriangleTop()}px`,
            }}
            >
            </div>
            
        </div>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'transparent',
          padding: `${borderWidth}px`,
          top: '0',
          left: '0',
          display: 'flex',
          color: `${textColor}`,
          fontSize: `${textSize}px`,
          ...textPositions[textPosition],
        }}>
          {text}
        </div>
            
            
      </div>
      
    ) : (
      <div
      data-testid="style-control-component"
      style={{
        ...shapes[shape],
        backgroundColor,
        borderWidth: `${borderWidth}px`,
        borderColor,
        color: textColor,
        fontSize: `${textSize}px`,
        display: 'flex',
        ...textPositions[textPosition],
        
      }}
    >
      {text}
    </div>
    )}
    </>
    
  );
}

export default StyleDisplayComponent