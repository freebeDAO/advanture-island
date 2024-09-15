'use client';

import StyleControlComponent from 'src/components/StyleControlComponent';

export default function CricleDemo() {
	return (
		<div className='position w-screen h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500'>
			<div className='w-96 mx-auto'>
				<StyleControlComponent>
					<div className='w-80 h-60 mx-auto' />
				</StyleControlComponent>
			</div>
		</div>
	);
}
