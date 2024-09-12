'use client'
import { ShapeStyle } from '..'

type ReactProps = ShapeStyle;

const Triangle: React.FC<ReactProps> = (props) => {
  const width = 200 - props.borderWidth * 2;
  const halfWidth = Math.floor(width / 2);
  const height = Math.floor(
    Math.sqrt(
      width ** 2 - width / 2 ** 2
    )
  );

  const deltaX = (200 - width) / 2;
  const deltaY = (200 - height) / 2;

  const points = [
    [halfWidth + deltaX, deltaY],
    [width + deltaX, height + deltaY],
    [0 + deltaX, height + deltaY]
  ];

  const pointsStr = points
    .map(point => point.join(','))
    .join(' ')

  return (
    <polygon
      points={pointsStr}
      fill={props.backgroundColor}
      strokeWidth={props.borderWidth}
      stroke={props.borderColor}
    />
  );
}

export { Triangle };
