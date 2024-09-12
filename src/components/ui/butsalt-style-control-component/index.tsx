'use client';
import { Rect } from './components/rect';
import { Ellipse } from './components/ellipse';
import styles from './styles.module.css';
import { Triangle } from './components/triangle';
import { Text, TextProps } from './components/text'

export type Shape = 'circle' | 'ellipse' | 'rect' | 'triangle';

export type ShapeStyle = {
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  backgroundColor: string;
};

export type StyleControlComponentProps = {
  shape: Shape;
} & Partial<ShapeStyle> & Pick<TextProps, 'fontH' | 'fontV' | 'fontSize' | 'fontColor' | 'children'>;

// 功能：点击组件或按空格时，会向上跳起再落下
const StyleControlComponent: React.FC<StyleControlComponentProps> = ({ shape, ...extraProps }) => {
  const shapeStyle: Required<ShapeStyle> = {
    borderRadius: extraProps.borderRadius ?? 0,
    borderColor: extraProps.borderColor ?? 'transparent',
    borderWidth: extraProps.borderWidth ?? 0,
    backgroundColor: extraProps.backgroundColor ?? 'transparent'
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
        fontH={extraProps.fontH}
        fontV={extraProps.fontV}
        fontSize={extraProps.fontSize}
        fontColor={extraProps.fontColor}
      >
        {extraProps.children}
      </Text>
    </div>
  );
}

export { StyleControlComponent };
