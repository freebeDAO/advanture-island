'use client';

import { FC, useState } from 'react';
import DragRound from './DragRound';
import Line from './Line';
import { IRoundPostion } from './interface';

interface IProps {
	position: IRoundPostion[];
}

const DragRoundWithLine: FC<IProps> = ({ position }) => {
	const [centerPositionList, setCenterPositionList] = useState<IRoundPostion[]>(() => {
		return position.map((item) => ({ x: item.x + item.radius, y: item.y + item.radius, radius: item.radius }));
	});

	return (
		<div className='position w-full h-full bg-white'>
			<Line startPoint={centerPositionList[0]} endPoint={centerPositionList[1]} />
			{position.map((item, index) => (
				<DragRound
					key={`${item.x}-${item.y}`}
					radius={item.radius}
					defaultPosition={item}
					onPositonChange={(currentPositon) => {
						setCenterPositionList((pre) => {
							const newData = pre.slice();
							newData[index] = { x: currentPositon.x + item.radius, y: currentPositon.y + item.radius, radius: item.radius };
							return newData;
						});
					}}
				/>
			))}
		</div>
	);
};

export default DragRoundWithLine;
