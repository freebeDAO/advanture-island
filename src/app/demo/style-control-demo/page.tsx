'use client';
import * as React from 'react';
import StyleControlComponent from 'src/components/style/StyleControlComponent';
import { Shape, TextPosition } from '../../../types/styles'; // Import the types
import { useState } from 'react';

// Possible shapes for the component
const shapes = [
  'circle',
  'ellipse',
  'rectangle',
  'roundedRectangle',
  'equilateralTriangle'
];

// Possible text positions for the component
const positions = [
  'topLeft',
  'topCenter',
  'topRight',
  'centerLeft',
  'center',
  'centerRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight'
];

// Possible backGroundColors for the component (for simplicity)
const backGroundColors = [
  '#ff0000', 
];

// Possible borderColors for the component (for simplicity)
const borderColors = [
  '#0000ff', 
];

// Possible textColors for the component (for simplicity)
const textColors = [
  '#000000', 
];

// Possible font sizes for the component's font size
const fonts = ['14', '16', '18', '20', '24' ,'28', '32', '36', '40', 
  '44', '48'];

// Possible borderWidths for the component's border width
const borderWidths = [0, 1, 2, 3, 4, 5, 6 ,7, 8, 9, 10, 
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Page () {
  // State variables for controlling the component's properties
  const [shape, setShape] = useState<Shape>(shapes[0] as Shape);
  const [backgroundColor, setBackgroundColor] = useState<string>(backGroundColors[0]);
  const [borderWidth, setBorderWidth] = useState(borderWidths[0]);
  const [borderColor, setBorderColor] = useState(borderColors[0]);
  const [text, setText] = useState('Hello');
  const [textSize, setTextSize] = useState<string>(fonts[0]);
  const [textColor, setTextColor] = useState(textColors[0]);
  const [textPosition, setTextPosition] = useState<TextPosition>(positions[4] as TextPosition);

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/4 pr-4">
        <h1 className="text-2xl font-bold mb-4">Options</h1>

        {/* Shape selection */}
        <label htmlFor="shape" className="block mb-2">Shape:</label>
        <select id="shape" value={shape} onChange={(e) => setShape(e.target.value as Shape)}>
          {shapes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Background color selection */}
        <label htmlFor="backgroundColor" className="block mt-4 mb-2">Background Color:</label>
        <input type="color" id="backgroundColor" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />

        {/* Border width selection */}
        <label htmlFor="borderWidth" className="block mt-4 mb-2">Border Width(0-20):</label>
        <select id="borderWidth" value={borderWidth} onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))}>
          {borderWidths.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Border color selection */}
        <label htmlFor="borderColor" className="block mt-4 mb-2">Border Color:</label>
        <input type="color" id="borderColor" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />

        {/* Text content input */}
        <label htmlFor="text" className="block mt-4 mb-2">Text(Only Show 15 characters):</label>
        <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value.substring(0, 15))} />

        {/* Text size selection */}
        <label htmlFor="textSize" className="block mt-4 mb-2">Text Size:</label>
        <select id="textSize" value={textSize} onChange={(e) => setTextSize(e.target.value)}>
          {fonts.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Text color selection */}
        <label htmlFor="textColor" className="block mt-4 mb-2">Text Color:</label>
        <input type="color" id="textColor" value={textColor} onChange={(e) => setTextColor(e.target.value)} />

        {/* Text position selection */}
        <label htmlFor="textPosition" className="block mt-4 mb-2">Text Position:</label>
        <select id="textPosition" value={textPosition} onChange={(e) => setTextPosition(e.target.value as TextPosition)}>
          {positions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="w-3/4 pl-4">
        <h1 className="text-2xl font-bold mb-4">Preview</h1>

        <div className="w-full h-full flex justify-center items-center">
        {/* Render the styled component with current state values */}
        <StyleControlComponent
          shape={shape}
          backgroundColor={backgroundColor}
          borderWidth={borderWidth}
          borderColor={borderColor}
          text={text}
          textSize={textSize}
          textColor={textColor}
          textPosition={textPosition}
        />
        </div>
      </div>
    </div>
  );
};
