'use client'
import { cloneElement } from 'react';
import styles from './styles.module.css';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

// 功能：点击组件或按空格时，会向上跳起再落下
type JumpableComponentProps = {
  children: JSX.Element | string
};

const JumpableComponent: React.FC<JumpableComponentProps> = ({ children }) => {
  let wrapper: React.ReactNode;
  if (typeof children === 'string') {
    wrapper = <span className="inline-block">{children}</span>;
  } else {
    wrapper = children;
  }

  const [animating, setAnimating] = useState(false);

  const animate = useCallback(() => {
    if (animating) {
      return;
    }

    setAnimating(true);
  }, [animating]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      // 只有按空格时才触发
      if (e.code.toLowerCase() !== 'space') {
        return;
      }

      animate();
    };
    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [animate]);

  return cloneElement(
    wrapper,
    {
      className: clsx(
        wrapper.props.className,
        styles.main,
        animating && styles.animating
      ),
      onClick: (e: React.MouseEvent) => {
        animate();
        wrapper.props.onClick?.(e);
      },
      onAnimationIteration: (e: React.AnimationEvent) => {
        setAnimating(false);
        wrapper.props.onAnimationIteration?.(e);
      }
    }
  );
}

export { JumpableComponent };
