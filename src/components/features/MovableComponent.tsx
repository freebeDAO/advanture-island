"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';

interface Position {
  x: number;
  y: number;
}

interface MovableComponentProps {
  initialPosition?: Position;
  autoMove?: boolean;
  direction?: string;
  speed?: number;
  onPositionChange?: (position: Position) => void;
}

export const MovableComponent = ({
  initialPosition = { x: 0, y: 0 },
  autoMove = false,
  direction = 'right',
  speed = 2,
  onPositionChange,
}: MovableComponentProps) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const componentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSavedPosition = useRef<Position>(initialPosition);

  const debouncedSavePosition = useCallback(
    debounce(async (position: Position, direction: string, speed: number) => {
      try {
        await fetch('/api/component-position', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            x: position.x,
            y: position.y,
            direction,
            speed,
          }),
        });
        lastSavedPosition.current = position;
      } catch (error) {
        console.error('Failed to update position:', error);
      }
    }, 600),
    []
  );

  const updatePosition = useCallback((
    newPosition: Position, 
    options: {
      direction: string,
      speed: number,
      onPositionChange?: (position: Position) => void,
      debouncedSave: (position: Position, direction: string, speed: number) => void
    }
  ) => {
    const { direction, speed, onPositionChange, debouncedSave } = options;
    setPosition(newPosition);
    onPositionChange?.(newPosition);
    debouncedSave(newPosition, direction, speed);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSavePosition.cancel();
    };
  }, [debouncedSavePosition]);

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 10;
      const newPosition = { ...position };

      switch (e.key) {
        case 'ArrowUp':
          newPosition.y -= step;
          break;
        case 'ArrowDown':
          newPosition.y += step;
          break;
        case 'ArrowLeft':
          newPosition.x -= step;
          break;
        case 'ArrowRight':
          newPosition.x += step;
          break;
      }

      updatePosition(newPosition, {
        direction,
        speed,
        onPositionChange,
        debouncedSave: debouncedSavePosition
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, updatePosition]);

  // 鼠标点击移动
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!autoMove) {
        updatePosition({
          x: e.clientX - (componentRef.current?.offsetWidth || 0) / 2,
          y: e.clientY - (componentRef.current?.offsetHeight || 0) / 2,
        }, {
          direction,
          speed,
          onPositionChange,
          debouncedSave: debouncedSavePosition
        });
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [autoMove, updatePosition]);

  // 自动移动
  useEffect(() => {
    if (!autoMove) return;

    const animate = () => {
      setPosition(prev => {
        const newPosition = { ...prev };
        switch (direction) {
          case 'right':
            newPosition.x += speed;
            break;
          case 'left':
            newPosition.x -= speed;
            break;
          case 'up':
            newPosition.y -= speed;
            break;
          case 'down':
            newPosition.y += speed;
            break;
        }

        // 边界检查
        const maxX = window.innerWidth - (componentRef.current?.offsetWidth || 0);
        const maxY = window.innerHeight - (componentRef.current?.offsetHeight || 0);
        newPosition.x = Math.max(0, Math.min(newPosition.x, maxX));
        newPosition.y = Math.max(0, Math.min(newPosition.y, maxY));

        updatePosition(newPosition, {
          direction,
          speed,
          onPositionChange,
          debouncedSave: debouncedSavePosition
        });
        return newPosition;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoMove, direction, speed, updatePosition]);

  return (
    <div
      ref={componentRef}
      className="absolute w-16 h-16 bg-blue-500 rounded-full cursor-pointer"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: !autoMove ? 'transform 0.3s ease-out' : 'none',
      }}
    />
  );
};
