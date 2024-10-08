'use client'
import { useState } from "react";
import { Select, Input } from 'src/components/ui/MyFormComponent';

const StyleControlComponent = () => {
  const [shape, setShape] = useState('rectangle');
  const [backgroundColor, setBackgroundColor] = useState('grey');
  const [borderSize, setBorderSize] = useState(1);
  const [borderColor, setBorderColor] = useState('#000000');
  const [text, setText] = useState('默认文本');
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#000000');
  const [textPosition, setTextPosition] = useState('center center');

  const shapeStyles = {
    rectangle: {},
    'rounded-rectangle': { borderRadius: '15px' },
    circle: { borderRadius: '50%' },
    ellipse: { borderRadius: '50%', width: '300px', height: '150px' },
    triangle: {
      width: '300px',
      height: '300px',
      clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)'
    },
  };

  const getTextAlign = (position: string) => {
    const [vertical, horizontal] = position.split(' ');
    return {
      justifyContent: vertical === 'top' ? 'flex-start' : vertical === 'bottom' ? 'flex-end' : 'center',
      alignItems: horizontal === 'left' ? 'flex-start' : horizontal === 'right' ? 'flex-end' : 'center',
    };
  };

  const targetStyle = {
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor,
    border: `${borderSize}px solid ${borderColor}`,
    ...shapeStyles[shape as keyof typeof shapeStyles],
    ...getTextAlign(textPosition),
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 space-y-4">
      <div className="space-y-2 col-span-1">
        <Select
          value={shape}
          onValueChange={setShape}
          options={[
            { value: 'rectangle', label: '矩形' },
            { value: 'rounded-rectangle', label: '圆角矩形' },
            { value: 'circle', label: '圆形' },
            { value: 'ellipse', label: '椭圆形' },
            { value: 'triangle', label: '正三角形' },
          ]}
        />
        <Input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          label="背景颜色"
        />
        <Input
          type="range"
          min="1"
          max="20"
          step="1"
          value={borderSize}
          onChange={(e) => setBorderSize(Number(e.target.value))}
          label="边框大小(1-20)"
        />
        <Input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          label="边框颜色"
        />
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="文本内容"
        />
        <Input
          type="range"
          min="10"
          max="30"
          step="1"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          label="字体大小(10-30)"
        />
        <Input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          label="字体颜色"
        />
        <Select
          value={textPosition}
          onValueChange={setTextPosition}
          options={[
            { value: 'top left', label: '左上' },
            { value: 'top center', label: '上中' },
            { value: 'top right', label: '右上' },
            { value: 'center left', label: '左中' },
            { value: 'center center', label: '中心' },
            { value: 'center right', label: '右中' },
            { value: 'bottom left', label: '左下' },
            { value: 'bottom center', label: '下中' },
            { value: 'bottom right', label: '右下' },
          ]}
          label="文本位置"
        />
      </div>
      <div className="col-span-2 p-4 mx-40 space-y-4">
        <div style={targetStyle}>
          <span style={{ fontSize: `${fontSize}px`, color: fontColor }}>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default StyleControlComponent;