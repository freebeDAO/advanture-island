import React, { CSSProperties, FC, useState } from 'react';
import SliderComponent from './components/SliderComponent';
import { toHexColor } from './helper';
import styles from './index.module.css';

enum ShapeEnum {
  Rectangle = 'rectangle',
  Circle = 'circle',
  Oval = 'oval',
  RoundedRectangle = 'roundedRectangle',
  Triangle = 'triangle',
}
type ShapeUnion = `${ShapeEnum}`;

const Shapes = [
  { value: ShapeEnum.Circle, name: '圆形' },
  { value: ShapeEnum.Oval, name: '椭圆形' },
  { value: ShapeEnum.Rectangle, name: '矩形' },
  { value: ShapeEnum.RoundedRectangle, name: '圆角矩形' },
  { value: ShapeEnum.Triangle, name: '正三角形' },
];

const Positions = [
  { value: 'center', name: '居中' },
  { value: 'left', name: '左侧' },
  { value: 'right', name: '右侧' },
  { value: 'tl', name: '左上' },
  { value: 'tc', name: '中上' },
  { value: 'tr', name: '右上' },
  { value: 'bl', name: '左下' },
  { value: 'bc', name: '中下' },
  { value: 'br', name: '右下' },
]

type Position = typeof Positions[number]['value']

export interface Form {
  shape: ShapeUnion
  bgColor: string
  borderColor: string
  borderWidth: number
  text: string
  fontSize: number
  fontColor: string
  position: Position
}

interface Props {
  borderWidthRange?: number[]
  fontSizeRange?: number[]
  borderRadius?: number
  form?: Partial<Form>
  defaultForm?: Partial<Form>
}

const DefaultForm: Form = {
  shape: 'circle',
  bgColor: '#eeeeee',
  borderColor: '#000000',
  borderWidth: 1,
  text: 'Hello',
  fontSize: 16,
  fontColor: '#000000',
  position: 'center',
}
const DefaultBorderWidthRange = [0, 10];
const DefaultFontSizeRange = [16, 28];

const formatArryProp = (arr: any, defaultData: number[]) => {
  return Array.isArray(arr) && arr.length === 2
    ? arr
    : defaultData
}

const StyleControlComponent: FC<Props> = ({
  borderWidthRange,
  fontSizeRange,
  borderRadius = 10,
  form,
  defaultForm,
}) => {
  // 格式化props
  borderWidthRange = formatArryProp(borderWidthRange, DefaultBorderWidthRange);
  fontSizeRange = formatArryProp(fontSizeRange, DefaultFontSizeRange);
  defaultForm = Object.assign({}, DefaultForm, defaultForm);

  const [shape, setShape] = useState<ShapeEnum>(form?.shape as ShapeEnum || defaultForm.shape);
  const [bgColor, setBgColor] = useState(toHexColor(form?.bgColor || defaultForm.bgColor!));
  const [borderColor, setBorderColor] = useState(toHexColor(form?.borderColor || defaultForm.borderColor!));
  const [borderWidth, setBorderWidth] = useState(form?.borderWidth || defaultForm.borderWidth);
  const [text, setText] = useState(form?.text || defaultForm.text);
  const [fontSize, setFontSize] = useState(form?.fontSize || defaultForm.fontSize);
  const [fontColor, setFontColor] = useState(toHexColor(form?.fontColor || defaultForm.fontColor!));
  const [position, setPosition] = useState<Position>(form?.position || defaultForm.position || 'center');

  const getPositionStyle = (position: Position): CSSProperties => {
    switch (position) {
      case 'tl':
        return {
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }
      case 'tc':
        return {
          justifyContent: 'center',
          alignItems: 'flex-start',
        }
      case 'tr':
        return {
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }
      case 'bl':
        return {
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }
      case 'bc':
        return {
          justifyContent: 'center',
          alignItems: 'flex-end',
        }
      case 'br':
        return {
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }
      case 'left':
        return {
          justifyContent: 'flex-start',
          alignItems: 'center',
        }
      case 'right':
        return {
          justifyContent: 'flex-end',
          alignItems: 'center',
        }
      case 'center':
      default:
        return {
          justifyContent: 'center',
          alignItems: 'center',
        }
    }
  }

  const computeDisabled = (key: keyof Form) => {
    return Object.keys(form || {}).some(k => k === key);
  }

  const shapeStyles: CSSProperties = {
    clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
    display: 'flex',
    width: '100%',
    height: shape === ShapeEnum.Oval ? '50%' : '100%',
    borderRadius: [ShapeEnum.Circle, ShapeEnum.Oval].includes(shape) ? '50%' : shape === ShapeEnum.RoundedRectangle ? borderRadius + 'px' : 0,
    border: shape !== ShapeEnum.Triangle ? `${borderWidth}px solid ${borderColor}` : 0,
    backgroundColor: shape !== ShapeEnum.Triangle ? bgColor : borderColor,
  }

  const triangleStyles: CSSProperties = {
    clipPath: borderWidth ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
    width: `calc(100% - ${(borderWidth || 0) * 2}px)`,
    height: `calc(100% - ${(borderWidth || 0) * 2}px)`,
    marginTop: borderWidth ? `${borderWidth / Math.sqrt(2)}px` : 0,
    backgroundColor: bgColor,
  };

  const contextStyle: CSSProperties = {
    fontSize: `${fontSize}px`,
    color: fontColor,
  };

  const disabledStyle: CSSProperties = {
    cursor: 'not-allowed',
  };

  const getFieldValue = (field: keyof Form, style: CSSProperties = {}) => {
    return Object.assign({}, style, computeDisabled(field) ? disabledStyle : {})
  }

  const fieldValueClassName = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
  const CtrlForm = (
    <div className={styles.ctrl}>
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700">形状: </label>
        <select
          className={fieldValueClassName}
          style={getFieldValue('shape', { width: 100 })}
          value={shape}
          onChange={(e) => setShape(e.target.value as ShapeEnum)}
          disabled={computeDisabled('shape')}
        >
          {
            Shapes.map(shape => <option key={shape.value} value={shape.value}>{shape.name}</option>)
          }
        </select>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700">背景颜色: </label>
        <input
          type="color"
          style={getFieldValue('bgColor', { width: 100 })}
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700">边框大小: </label>
        <SliderComponent
          style={{ width: 100 }}
          disabled={computeDisabled('borderWidth')}
          value={borderWidth!}
          min={borderWidthRange[0]}
          max={borderWidthRange[1]}
          onChange={setBorderWidth}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700">边框颜色: </label>
        <input
          type="color"
          style={getFieldValue('borderColor', { width: 100 })}
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700">文本内容: </label>
        <input
          type="text"
          className={fieldValueClassName}
          style={getFieldValue('text', { width: 100 })}
          disabled={computeDisabled('text')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700">字体大小: </label>
        <SliderComponent
          style={{ width: 100 }}
          value={fontSize!}
          min={fontSizeRange[0]}
          max={fontSizeRange[1]}
          onChange={setFontSize}
          disabled={computeDisabled('fontSize')}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label className="block text-gray-700">字体颜色: </label>
        <input
          type="color"
          style={getFieldValue('fontColor', { width: 100 })}
          disabled={computeDisabled('fontColor')}
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label>文本位置: </label>
        <select
          className={fieldValueClassName}
          style={getFieldValue('position', { width: 100 })}
          value={position}
          disabled={computeDisabled('position')}
          onChange={(e) => setPosition(e.target.value as Position)}
        >
          {
            Positions.map(position => <option key={position.value} value={position.value}>{position.name}</option>)
          }
        </select>
      </div>
    </div>
  );

  const TextContent = (
    <div
      style={
        Object.assign(
          {
            position: 'absolute',
            top: borderWidth || 0,
            left: borderWidth || 0,
            width: `calc(100% - ${(borderWidth || 0) * 2}px)`,
            height: `calc(${shape === ShapeEnum.Oval ? '50%' : '100%'} - ${(borderWidth || 0) * 2}px)`,
            display: 'flex'
          },
          getPositionStyle(position)
        )
      }
    >
      <span className={styles.ellipsis} style={contextStyle}>{text}</span>
    </div>
  );

  const ShapeContent = (
    <div
      style={
        Object.assign(
          shapeStyles,
          shape === ShapeEnum.Triangle && { display: 'flex', justifyContent: 'center', alignItems: 'center' }
        )
      }
    >
      {
        shape === ShapeEnum.Triangle
          ? <div style={triangleStyles} />
          : null
      }
    </div>
  );

  return (
    <div className={styles.container} >
      {CtrlForm}
      <div className={styles.box}>
        <div className={styles['box-content']}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              top: shape === ShapeEnum.Oval ? '50%' : 0,
              transform: shape === ShapeEnum.Oval ? 'translateY(-25%)' : 'none',
            }}
          >
            {ShapeContent}
            {TextContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleControlComponent;