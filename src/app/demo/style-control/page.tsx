'use client';

import StyleControlComponent from 'src/components/StyleControlComponent';

export default function CricleDemo() {
	return (
		<div className='position w-screen h-screen flex justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500'>
			<StyleControlComponent>
				<div className='w-80 h-60' />
			</StyleControlComponent>
		</div>
	);
}
