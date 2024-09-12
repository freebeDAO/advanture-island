'use client'
import styles from './styles.module.css';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

// 功能：点击组件或按空格时，会向上跳起再落下
const JumpableComponent: React.FC = () => {
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

  return (
    <div
      className={clsx(
        styles.main,
        'bg-cyan-500',
        animating && styles.animating
      )}
      onClick={animate}
      onAnimationIteration={() => {
        setAnimating(false);
      }}
    ></div>
  );
}

export { JumpableComponent };
