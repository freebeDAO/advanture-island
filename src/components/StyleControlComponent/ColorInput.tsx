import { FC } from 'react';

interface IProps {
	value: string;
	onChange: (value: string) => void;
}

const ColorInput: FC<IProps> = ({ value, onChange }) => {
	return (
		<input
			className='box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6'
			type='color'
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
};

export default ColorInput;
