import { FC } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface IProps {
	min: number;
	max: number;
	step: number;
	defaultValue: number;
	onChange: (value: number) => void;
}

const SliderItem: FC<IProps> = ({ min, max, step, defaultValue, onChange }) => {
	const handleChange = (changeValue: number[]) => {
		console.log(changeValue[0]);
		onChange(changeValue[0]);
	};

	return (
		<Slider.Root
			className='relative flex items-center select-none touch-none w-[200px] h-5'
			onValueChange={handleChange}
			defaultValue={[defaultValue]}
			min={min}
			max={max}
			step={step}
		>
			<Slider.Track className='bg-blackA7 relative grow rounded-full h-[3px]'>
				<Slider.Range className='absolute bg-white rounded-full h-full' />
			</Slider.Track>
			<Slider.Thumb
				className='block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5'
				aria-label='Volume'
			/>
		</Slider.Root>
	);
};

export default SliderItem;
