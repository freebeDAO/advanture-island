'use client'
import { ShapeStyle } from '..'

export type ReactProps = ShapeStyle;

export const Rect: React.FC<ReactProps> = (props) => {

  return (
    <rect
      rx={props.borderRadius}
      x={props.borderWidth / 2}
      y={30 + props.borderWidth / 2}
      width={200 - props.borderWidth}
      height={140 - props.borderWidth}
      fill={props.backgroundColor}
      strokeWidth={props.borderWidth}
      stroke={props.borderColor}
    />
  );
}
