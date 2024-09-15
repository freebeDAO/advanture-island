import { FC, ReactElement } from 'react';
import * as Form from '@radix-ui/react-form';

interface IProps {
	name: string;
	label: string;
	children: ReactElement;
}

const FormItem: FC<IProps> = ({ name, label, children }) => {
	return (
		<Form.Field className='grid mb-[10px]' name={name}>
			<div className='flex items-baseline justify-between'>
				<Form.Label className='text-[15px] font-medium leading-[35px] text-white'>{label}</Form.Label>
			</div>
			<Form.Control asChild>{children}</Form.Control>
		</Form.Field>
	);
};

export default FormItem;
