import { FC } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

interface IProps {
	dataSource: { label: string; value: string }[];
	value: string;
	onChange: (value: string) => void;
}

const Radio: FC<IProps> = ({ dataSource, value, onChange }) => {
	return (
		<RadioGroup.Root className='flex flex-row flex-wrap gap-2.5' value={value} onValueChange={onChange}>
			{dataSource.map((item) => (
				<div key={item.value} className='flex items-center w-28'>
					<RadioGroup.Item
						className='bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default'
						value={item.value}
						id={item.value}
					>
						<RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
					</RadioGroup.Item>
					<label className='text-white text-[15px] leading-none pl-[15px]' htmlFor='r1'>
						{item.label}
					</label>
				</div>
			))}
		</RadioGroup.Root>
	);
};

export default Radio;
