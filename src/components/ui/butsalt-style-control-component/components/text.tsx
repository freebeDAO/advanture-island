import clsx from 'clsx';
import styles from '../styles.module.css';
import { Shape } from '..';
import { getTextSize } from '../utils';

export type FontH = 'left' | 'center' | 'right';
export type FontV = 'top' | 'center' | 'bottom';

export type TextProps = {
  shape: Shape;
  borderWidth: number;
  borderRadius: number;
  fontH: FontH;
  fontV: FontV;
  fontSize: number;
  fontColor: string;
  children?: React.ReactNode
};

export const Text: React.FC<TextProps> = ({
  shape,
  borderWidth, borderRadius,
  fontH, fontV,
  fontSize,
  fontColor: color,
  children
}) => {
  return (
    <div
      className={
        clsx(
          `flex ${styles.text}`,
          {
            left: 'justify-start',
            center: 'justify-center',
            right: 'justify-end'
          }[fontH],
          {
            top: 'items-start',
            center: 'items-center',
            bottom: 'items-end'
          }[fontV],
        )
      }
      style={{
        ...getTextSize({
          shape,
          borderWidth,
          borderRadius
        }),
        fontSize,
        color,
      }}
    >
      {children}
    </div>
  );
};
