'use client';

import { cloneElement, FC, ReactElement, useEffect, useRef, useState } from 'react';
import * as Form from '@radix-ui/react-form';

import { IControlData, Shape, TextPosition } from './interface';
import FormItem from './FormItem';
import RadioItem from './RadioItem';
import ColorInput from './ColorInput';
import SliderItem from './SliderItem';
import TextArea from './TextArea';

interface IProps {
	children: ReactElement;
}

interface IShapeInfo {
	x: number;
	y: number;
	width: number;
	height: number;
}

const translateShapetoStyles = (shape: Shape, targetShape: IShapeInfo, borderWidth?: number) => {
	const { width, height } = targetShape;

	const shortLength = width > height ? height : width;
	const longLength = width > height ? width : height;

	switch (shape) {
		case 'circle':
			return { width: shortLength, height: shortLength, borderRadius: shortLength / 2 };
		case 'ellipse':
			return { borderRadius: '50%' };
		case 'rectangle':
			return {};
		case 'rounded-rectangle':
			return { borderRadius: shortLength / 2 };
		case 'triangle':
			return {
				width: longLength,
				height: longLength,
				'clip-path': `polygon(50% ${100 - 50 * Math.sqrt(2)}%, 0% 100%, 100% 100%)`,
			};
		case 'triangle-inner': {
			return {
				width: longLength - (borderWidth || 0),
				height: longLength - (borderWidth || 0),
				marginTop: (borderWidth || 0) / Math.sqrt(2),
				marginLeft: (borderWidth || 0) / 2,
				'clip-path': `polygon(50% ${100 - 50 * Math.sqrt(2)}%, 0% 100%, 100% 100%)`,
			};
		}
		default:
			return {};
	}
};

const translatePositionToCls = (position: TextPosition) => {
	const positions: Record<TextPosition, string> = {
		tl: 'justify-start items-start',
		tc: 'justify-center items-start',
		tr: 'justify-end items-start',
		ml: 'justify-start items-center',
		mc: 'justify-center items-center',
		mr: 'justify-end items-center',
		bl: 'justify-start items-end',
		bc: 'justify-center items-end',
		br: 'justify-end items-end',
	};
	return `flex ${positions[position]}`;
};

const StyleControlComponent: FC<IProps> = ({ children }) => {
	const targetRef = useRef<Element | null>(null);
	const [data, setData] = useState<IControlData>({
		shape: 'rectangle',
		backgroundColor: '#ffffff',
		borderWidth: 0,
		borderColor: '#000000',
		content: '',
		fontSize: 12,
		color: '#000000',
		textPosition: 'tl',
	});
	const [targetShape, setTargetShape] = useState<IShapeInfo>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	useEffect(() => {
		if (targetRef.current) {
			const { x, y, width, height } = targetRef.current.getBoundingClientRect();
			setTargetShape({
				x,
				y,
				width,
				height,
			});
		}
	}, []);

	const handleChange = (type: string) => (value: string | number) => setData((pre) => ({ ...pre, [type]: value }));

	return (
		<div className='w-[900px] flex items-center justify-between'>
			<Form.Root className='w-96'>
				<FormItem name='shape' label='形状'>
					<RadioItem
						dataSource={[
							{ label: '矩形', value: 'rectangle' },
							{ label: '圆形', value: 'circle' },
							{ label: '椭圆形', value: 'ellipse' },
							{ label: '圆角矩形', value: 'rounded-rectangle' },
							{ label: '正三角形', value: 'triangle' },
						]}
						value={data.shape}
						onChange={handleChange('shape')}
					/>
				</FormItem>
				<FormItem name='backgroundColor' label='背景颜色'>
					<ColorInput value={data.backgroundColor} onChange={handleChange('backgroundColor')} />
				</FormItem>
				<FormItem name='borderWidth' label='边框大小'>
					<SliderItem min={0} max={50} step={1} defaultValue={0} onChange={handleChange('borderWidth')} />
				</FormItem>
				<FormItem name='borderColor' label='边框颜色'>
					<ColorInput value={data.borderColor} onChange={handleChange('borderColor')} />
				</FormItem>
				<FormItem name='content' label='文本内容'>
					<TextArea value={data.content} onChange={handleChange('content')} />
				</FormItem>
				<FormItem name='fontSize' label='文字大小'>
					<SliderItem min={12} max={32} step={1} defaultValue={0} onChange={handleChange('fontSize')} />
				</FormItem>
				<FormItem name='color' label='文字颜色'>
					<ColorInput value={data.color} onChange={handleChange('color')} />
				</FormItem>
				<FormItem name='textPosition' label='文字位置'>
					<RadioItem
						dataSource={[
							{ label: '左上角', value: 'tl' },
							{ label: '中上', value: 'tc' },
							{ label: '右上角', value: 'tr' },
							{ label: '中左', value: 'ml' },
							{ label: '中中', value: 'mc' },
							{ label: '中右', value: 'mr' },
							{ label: '左下角', value: 'bl' },
							{ label: '中下', value: 'bc' },
							{ label: '右下角', value: 'br' },
						]}
						value={data.textPosition}
						onChange={handleChange('textPosition')}
					/>
				</FormItem>
			</Form.Root>
			{cloneElement(children, {
				ref: targetRef,
				className: `${children.props.className || ''} ${data.shape !== 'triangle' ? translatePositionToCls(data.textPosition) : ''}`,
				style: {
					...(children.props.style || {}),
					position: 'relative',
					backgroundColor: data.shape === 'triangle' ? data.borderColor : data.backgroundColor,
					...(data.shape !== 'triangle'
						? {
								borderColor: data.borderColor,
								borderWidth: `${data.borderWidth}px`,
						  }
						: {}),
					fontSize: `${data.fontSize}px`,
					color: data.color,
					...translateShapetoStyles(data.shape, targetShape),
				},
				children:
					data.shape === 'triangle' ? (
						<div
							className={translatePositionToCls(data.textPosition)}
							style={{ background: data.backgroundColor, ...translateShapetoStyles('triangle-inner', targetShape, data.borderWidth) }}
						>
							<span
								style={{
									marginTop: (targetShape.width > targetShape.height ? targetShape.width : targetShape.height) * (Math.sqrt(2) - 1),
								}}
							>
								{data.content}
							</span>
						</div>
					) : (
						data.content
					),
			})}
		</div>
	);
};

export default StyleControlComponent;
