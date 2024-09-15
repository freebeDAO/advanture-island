'use client';

import { FC, useMemo } from 'react';
import { IPositon } from './interface';

interface IProps {
	startPoint: IPositon;
	endPoint: IPositon;
}

const DEFAULT_SIZE = 6;

const Line: FC<IProps> = ({ startPoint, endPoint }) => {
	const path = useMemo(() => {
		if (startPoint.x === endPoint.x || startPoint.y === endPoint.y) {
			return `M ${startPoint.x},${startPoint.y} L ${endPoint.x},${endPoint.y}`;
		}
		const middleX = (startPoint.x + endPoint.x) / 2;
		return `M ${startPoint.x},${startPoint.y} L ${middleX},${startPoint.y} L ${middleX},${endPoint.y} L  ${endPoint.x},${endPoint.y}`;
	}, [startPoint, endPoint]);

	const angle = useMemo(() => {
		if (endPoint.x === startPoint.x) {
			return endPoint.y - startPoint.y > 0 ? Math.PI / 2 : -Math.PI / 2;
		}
		return endPoint.x > startPoint.x ? 0 : Math.PI;
	}, [startPoint, endPoint]);

	const arrowX = endPoint.x - DEFAULT_SIZE * Math.cos(angle);
	const arrowY = endPoint.y - DEFAULT_SIZE * Math.sin(angle);

	return (
		<svg className='absolute top-0 left-0 w-full h-full'>
			<path className='stroke-1 stroke-black fill-none' d={path} />
			<polygon
				className='fill-black'
				points={`
          ${endPoint.x},${endPoint.y}
          ${arrowX + DEFAULT_SIZE * Math.sin(angle)},${arrowY - DEFAULT_SIZE * Math.cos(angle)}
          ${arrowX - DEFAULT_SIZE * Math.sin(angle)},${arrowY + DEFAULT_SIZE * Math.cos(angle)}
        `}
			/>
		</svg>
	);
};

export default Line;
