'use client';

import DragRoundWithLine from 'src/components/DragRoundWithLine';

export default function CricleDemo() {
	return (
		<div className='position w-screen h-screen bg-white'>
			<DragRoundWithLine
				position={[
					{ x: 100, y: 100, radius: 50 },
					{ x: 400, y: 500, radius: 40 },
				]}
			/>
		</div>
	);
}
