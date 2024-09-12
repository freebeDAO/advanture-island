'use client'
import { ShapeStyle } from '..'

export type ReactProps = {
  shape: 'circle' | 'ellipse';
} & ShapeStyle;

export const Ellipse: React.FC<ReactProps> = (props) => {
  const rx = 100 - props.borderWidth;
  let ry = rx;
  if (props.shape === 'ellipse') {
    ry = Math.floor(ry * 0.8);
  }

  return (
    <ellipse
      cx="100"
      cy="100"
      rx={rx}
      ry={ry}
      fill={props.backgroundColor}
      strokeWidth={props.borderWidth}
      stroke={props.borderColor}
    />
  );
}
