'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MovableComponentProps {
  nodeId: number; // 每个 MovableComponent 关联一个 Node 实体
}

const MovableComponent: React.FC<MovableComponentProps> = ({ nodeId }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [autoMove, setAutoMove] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [speed, setSpeed] = useState(1);

  // 更新位置到数据库
  const updatePositionInDB = async (x: number, y: number) => {
    try {
      await axios.put(`/api/node/${nodeId}`, { x, y });
    } catch (error) {
      console.error('Failed to update position:', error);
    }
  };

  // 移动组件
  const move = (dx: number, dy: number) => {
    setPosition(prevPosition => {
      const newPosition = { x: prevPosition.x + dx, y: prevPosition.y + dy };
      updatePositionInDB(newPosition.x, newPosition.y); // 更新数据库中的位置
      return newPosition;
    });
  };

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          move(0, -10); // 向上移动
          break;
        case 'ArrowDown':
          move(0, 10); // 向下移动
          break;
        case 'ArrowLeft':
          move(-10, 0); // 向左移动
          break;
        case 'ArrowRight':
          move(10, 0); // 向右移动
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 鼠标点击移动到指定位置
  const handleMouseClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPosition({ x, y });
    updatePositionInDB(x, y);
  };

  // 自动移动逻辑
  useEffect(() => {
    if (autoMove) {
      const interval = setInterval(() => {
        move(direction.x * speed, direction.y * speed);
      }, 100); // 每100毫秒移动一次

      return () => clearInterval(interval);
    }
  }, [autoMove, direction, speed]);

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: 'blue',
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={handleMouseClick}
    >
      MovableComponent
      <div>
        <button onClick={() => setAutoMove(!autoMove)}>
          {autoMove ? 'Stop Auto Move' : 'Start Auto Move'}
        </button>
      </div>
    </div>
  );
};

export default MovableComponent;
