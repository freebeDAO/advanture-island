/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

type MovableComponentProps = {
  id: number;
  initialX: number;
  initialY: number;
};

const MovableComponent: React.FC<MovableComponentProps> = ({ id, initialX, initialY }) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [autoMove, setAutoMove] = useState(false);
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [speed, setSpeed] = useState(1);

  // 更新位置到数据库
  const updatePositionInDB = useCallback(async (newX: number, newY: number) => {
    try {
       const response = await axios.post('/api/node', { id, x: newX, y: newY });
       console.log('MovableComponentProps created/updated:', response.data);
    } catch (error) {
      console.error('Failed to update position:', error);
    }
  }, [id]);

  // 处理键盘输入
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    let deltaX = 0;
    let deltaY = 0;

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        deltaY = -10;
        break;
      case 'ArrowDown':
      case 's':
        deltaY = 10;
        break;
      case 'ArrowLeft':
      case 'a':
        deltaX = -10;
        break;
      case 'ArrowRight':
      case 'd':
        deltaX = 10;
        break;
      default:
        return;
    }

    setX(prevX => prevX + deltaX);
    setY(prevY => prevY + deltaY);
    updatePositionInDB(x + deltaX, y + deltaY);
  }, [x, y, updatePositionInDB]);

  // 处理鼠标点击
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const newX = event.clientX;
    const newY = event.clientY;
    setX(newX);
    setY(newY);
    updatePositionInDB(newX, newY);
  };

  // 自动移动逻辑
  useEffect(() => {
    if (autoMove) {
      const interval = setInterval(() => {
        setX(prevX => prevX + direction.x * speed);
        setY(prevY => prevY + direction.y * speed);
        updatePositionInDB(x + direction.x * speed, y + direction.y * speed);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [autoMove, direction, speed, updatePositionInDB, x, y]);

  // 键盘监听
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div onClick={handleClick} className="relative w-screen h-screen bg-gray-100">
    <motion.img
      src="/characters/orc1_walk_full copy.png"  // 角色图片路径
      alt="Character"
      
      className="w-16 h-16 absolute inset-0"  // 设图片大小为 64px
      animate={{ x, y }}
      // transition={{ type: 'spring', stiffness: 300 }} //感觉弹簧效果不好看 不要了
    />
    <button
      className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded"
      onClick={() => setAutoMove(prev => !prev)}
    >
      {autoMove ? '停止自动移动' : '开始自动移动'}
    </button>
    <div className="absolute bottom-4 left-4 space-x-4">
      <button
        className="bg-yellow-500 text-white p-2 rounded"
        onClick={() => setDirection({ x: 1, y: 0 })}
      >
        向右走
      </button>
      <button
        className="bg-yellow-500 text-white p-2 rounded"
        onClick={() => setDirection({ x: -1, y: 0 })}
      >
        向左走
      </button>
      <button
        className="bg-yellow-500 text-white p-2 rounded"
        onClick={() => setDirection({ x: 0, y: 1 })}
      >
       向下走
      </button>
      <button
        className="bg-yellow-500 text-white p-2 rounded"
        onClick={() => setDirection({ x: 0, y: -1 })}
      >
        向上走
      </button>
    </div>
  </div>
  );
};

export default MovableComponent;
