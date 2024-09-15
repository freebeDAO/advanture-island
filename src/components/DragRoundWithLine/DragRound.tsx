'use client';

import { FC, useCallback } from 'react';
import Draggable, { DraggableData, DraggableEventHandler } from 'react-draggable';
import { IPositon } from './interface';

interface IDragRoundProps {
	radius: number;
	defaultPosition: IPositon;
	onPositonChange: (position: IPositon) => void;
}

const DragRound: FC<IDragRoundProps> = ({ radius, defaultPosition, onPositonChange }) => {
	const onDrag: DraggableEventHandler = useCallback(
		(_, data: DraggableData) => {
			const newPosition = { x: data.x, y: data.y };
			onPositonChange(newPosition);
		},
		[onPositonChange]
	);

	return (
		<Draggable defaultPosition={defaultPosition} onDrag={onDrag}>
			<div style={{ width: radius * 2, height: radius * 2 }} className='absolute rounded-full border border-slate-800' />
		</Draggable>
	);
};

export default DragRound;
