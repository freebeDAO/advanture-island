'use client';
import { Rect } from './components/rect';
import { Ellipse } from './components/ellipse';
import styles from './styles.module.css';
import { Triangle } from './components/triangle';
import { Text } from './components/text'

export type Shape = 'circle' | 'ellipse' | 'rect' | 'triangle';

export type ShapeStyle = {
  borderColor: string; // 边框颜色
  borderWidth: number; // 边框宽度
  borderRadius: number; // 边框圆角
  backgroundColor: string; // 背景颜色
};

export type FontH = 'left' | 'center' | 'right';
export type FontV = 'top' | 'center' | 'bottom';
export type FontStyle = {
  fontH: FontH; // 水平位置
  fontV: FontV; // 垂直位置
  fontSize: number; // 字号
  fontColor: string; // 字体颜色
};

export type StyleControlComponentProps = {
  shape: Shape;
  children: React.ReactNode
} & Partial<ShapeStyle> & Partial<FontStyle>;

// 功能：渲染不同形状
const StyleControlComponent: React.FC<StyleControlComponentProps> = ({ shape, ...props }) => {
  const shapeStyle: ShapeStyle = {
    borderRadius: props.borderRadius ?? 0,
    borderColor: props.borderColor ?? 'transparent',
    borderWidth: props.borderWidth ?? 0,
    backgroundColor: props.backgroundColor ?? 'transparent'
  };

  const fontStyle: FontStyle = {
    fontH: props.fontH ?? 'center',
    fontV: props.fontV ?? 'center',
    fontSize: props.fontSize ?? 14,
    fontColor: props.fontColor ?? '#000'
  };

  let svgContent: React.ReactNode | null = null;

  switch (shape) {
    case 'circle':
    case 'ellipse':
      svgContent = (
        <Ellipse
          shape={shape}
          {...shapeStyle}
        />
      );
      break;
    case 'rect':
      svgContent = (
        <Rect
          {...shapeStyle}
        />
      );
      break;
    case 'triangle':
      svgContent = (
        <Triangle
          {...shapeStyle}
        />
      );
  }

  return (
    <div className={`relative ${styles.main}`}>
      <svg
        className="w-full	h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox='0, 0, 200, 200'
      >
        {svgContent}
      </svg>
      <Text
        shape={shape}
        borderRadius={shapeStyle.borderRadius}
        borderWidth={shapeStyle.borderWidth}
        {...fontStyle}
      >
        {props.children}
      </Text>
    </div>
  );
}

export { StyleControlComponent };
