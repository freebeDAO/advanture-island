import clsx from 'clsx';
import styles from '../styles.module.css';
import { FontStyle, Shape } from '..';
import { getTextStyle } from '../utils';

export type TextProps = {
  shape: Shape;
  borderWidth: number;
  borderRadius: number;
  children?: React.ReactNode
} & FontStyle;

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
        ...getTextStyle({
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
