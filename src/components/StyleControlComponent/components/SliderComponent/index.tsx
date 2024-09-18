import { ChangeEvent, FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number
  min?: number
  max?: number
  disabled?: boolean
  onChange: (value: number) => void
}

const SliderComponent: FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  disabled,
  onChange,
  className,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div
      className={clsx(styles['slider-container'], className)}
      style={disabled ? { cursor: 'not-allowed' } : {}}
      {...rest}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={styles.slider}
        disabled={disabled}
        style={disabled ? { cursor: 'not-allowed' } : {}}
      />
      <span className={styles['slider-value']}>{value}</span>
    </div>
  );
};

export default SliderComponent;