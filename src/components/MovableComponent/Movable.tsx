"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, px } from 'framer-motion';
import axios from 'axios';

type MovableComponentProps = {
  id: number;
  initialX: number;
  initialY: number;
  characterSprite: string;  // 角色精灵图路径
  frameWidth: number;       // 每帧的宽度
  frameHeight: number;      // 每帧的高度
  backgroundImg: string;    // 背景图路径
};

type Direction = 'down' | 'up' | 'left' | 'right';

const MovableComponent: React.FC<MovableComponentProps> = ({ id, initialX, initialY, characterSprite, frameWidth, frameHeight, backgroundImg }) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [direction, setDirection] = useState<Direction>('down'); // 默认方向
  const [frameIndex, setFrameIndex] = useState(0); // 动画帧索引
  const [moving, setMoving] = useState(false); // 是否正在移动
  const patrolInterval = 1000;  // 自动巡逻移动的间隔时间
 const [isPatrolling, setIsPatrolling] = useState(false);  // 自动巡逻开关

 const stepDistance = 35;  // 巡逻每次移动的步幅较小，提升平滑性 
 
  const directions: Record<Direction, number> = {
    down: 0,
    up: 1,
    left: 2,
    right: 3,
  };

  const maxFrames = 5; // 每行 5 帧
  const componentSize = frameWidth;

  const mapWidth = 1390;  // 根据背景图的宽度
  const mapHeight = 754;  // 根据背景图的高度

  // 限制移动在草地区域的边界
  const clampPosition = useCallback((newX: number, newY: number) => {
    const minX = 0; // 左边界
    const minY =240; // 草地的上边界（根据草地实际位置调整）
    const maxX = mapWidth - componentSize; // 右边界
    const maxY = mapHeight - componentSize-50; // 下边界
    const clampedX = Math.max(minX, Math.min(newX, maxX));
    const clampedY = Math.max(minY, Math.min(newY, maxY));
    return { clampedX, clampedY };
  }, [componentSize]);

  // 更新数据库中的坐标
  const updatePositionInDB = useCallback(async (newX: number, newY: number) => {
    const { clampedX, clampedY } = clampPosition(newX, newY);
    try {
      await axios.put('/api/node', { id, x: clampedX, y: clampedY });
      setX(clampedX);
      setY(clampedY);
    } catch (error) {
      console.error('Failed to update position:', error);
    }
  }, [id, clampPosition]);

  // 切换动画帧
  const updateFrame = () => {
    setFrameIndex((prevIndex) => (prevIndex + 2.5) % maxFrames);
  };

  // 控制帧速率
  useEffect(() => {
    if (moving) {
      const frameInterval = setInterval(() => {
        updateFrame();
      }, 250);
      return () => clearInterval(frameInterval);
    }
  }, [moving]);

  // 巡逻功能
  useEffect(() => {
    if (isPatrolling) {
      setMoving(true); // 保持动画移动状态
      const patrolMovement = setInterval(() => {
        const randomDirection: Direction = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)] as Direction;
        let deltaX = 0;
        let deltaY = 0;

        switch (randomDirection) {
          case 'up':
            deltaY = -stepDistance;
            break;
          case 'down':
            deltaY = stepDistance;
            break;
          case 'left':
            deltaX = -stepDistance;
            break;
          case 'right':
            deltaX = stepDistance;
            break;
        }

        setDirection(randomDirection);
        updatePositionInDB(x + deltaX, y + deltaY);
      }, patrolInterval);

      return () => {
        setMoving(false); // 停止巡逻时停止动画
        clearInterval(patrolMovement);
      };
    }
  }, [isPatrolling, x, y, updatePositionInDB]);

  // 键盘控制移动
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    let deltaX = 0;
    let deltaY = 0;

    setMoving(true);

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        deltaY = -10;
        setDirection('up');
        break;
      case 'ArrowDown':
      case 's':
        deltaY = 10;
        setDirection('down');
        break;
      case 'ArrowLeft':
      case 'a':
        deltaX = -10;
        setDirection('left');
        break;
      case 'ArrowRight':
      case 'd':
        deltaX = 10;
        setDirection('right');
        break;
      default:
        setMoving(false);
        return;
    }

    updatePositionInDB(x + deltaX, y + deltaY);
  }, [x, y, updatePositionInDB]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // 停止移动
  useEffect(() => {
    const handleKeyUp = () => {
      setMoving(false);
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  // 虚拟键盘按钮
  const handleVirtualKey = (direction: Direction) => {
    let deltaX = 0;
    let deltaY = 0;

    setMoving(true);

    switch (direction) {
      case 'up':
    
        deltaY = -10;
        setDirection('up');
        break;
      case 'down':
        deltaY = 10;
        setDirection('down');
        break;
      case 'left':
        deltaX = -10;
        setDirection('left');
        break;
      case 'right':
        deltaX = 10;
        setDirection('right');
        break;
      default:
        setMoving(false);
        return;
    }

    setDirection(direction);
    updatePositionInDB(x + deltaX, y + deltaY);
  };


  return (
    <div className="relative w-screen h-screen bg-gray-100">
      {/* 背景图 */}
      <img src={backgroundImg} alt="background" className="absolute w-full h-full object-cover user-select-none" />

      {/* 可移动精灵 */}
      <motion.div
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          backgroundImage: `url(${characterSprite})`,
          backgroundPosition: `-${frameIndex * frameWidth+250}px -${directions[direction] * frameHeight}px`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${frameWidth * maxFrames}px ${frameHeight * 4}px`,
        }}
        animate={{ x, y }}
        transition={{ type: 'tween', duration: 0.1  }}
      />

      {/* 虚拟键盘 */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button onMouseDown={() => handleVirtualKey('up')} onMouseUp={() => setMoving(false)} className="bg-gray-300 p-2 rounded">↑</button>
        <button onMouseDown={() => handleVirtualKey('left')} onMouseUp={() => setMoving(false)} className="bg-gray-300 p-2 rounded">←</button>
        <button onMouseDown={() => handleVirtualKey('down')} onMouseUp={() => setMoving(false)} className="bg-gray-300 p-2 rounded">↓</button>
        <button onMouseDown={() => handleVirtualKey('right')} onMouseUp={() => setMoving(false)} className="bg-gray-300 p-2 rounded">→</button>
      </div>
         {/* 自动巡逻开关 */}
         <button onClick={() => setIsPatrolling(!isPatrolling)} className="absolute top-10 left-10 bg-blue-400 p-2 rounded">
         {isPatrolling ? '停止巡逻' : '开始自动巡逻'}
      </button>
    </div>
  );
};

export default MovableComponent;
