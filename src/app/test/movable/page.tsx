"use client";

import { useState, useEffect } from 'react';
import { MovableComponent } from 'src/components/features/MovableComponent';

export default function MovableTest() {
  const [autoMove, setAutoMove] = useState(false);
  const [direction, setDirection] = useState('right');
  const [speed, setSpeed] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 获取初始位置
    fetch('/api/component-position')
      .then(res => res.json())
      .then(data => {
        if (data.x !== undefined && data.y !== undefined) {
          setPosition({ x: data.x, y: data.y });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="fixed top-4 left-4 z-10 bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold mb-4">移动组件测试</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              <input
                type="checkbox"
                checked={autoMove}
                onChange={(e) => setAutoMove(e.target.checked)}
                className="mr-2"
              />
              自动移动
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">移动方向</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full p-2 border rounded"
              disabled={!autoMove}
            >
              <option value="right">向右</option>
              <option value="left">向左</option>
              <option value="up">向上</option>
              <option value="down">向下</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">移动速度</label>
            <input
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
              disabled={!autoMove}
            />
            <span className="text-sm">{speed}</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>当前位置: X: {Math.round(position.x)}, Y: {Math.round(position.y)}</p>
          <p className="mt-2">提示：</p>
          <ul className="list-disc list-inside">
            <li>使用方向键控制移动</li>
            <li>点击屏幕任意位置移动</li>
            <li>开启自动移动模式测试</li>
          </ul>
        </div>
      </div>

      <MovableComponent
        initialPosition={position}
        autoMove={autoMove}
        direction={direction}
        speed={speed}
        onPositionChange={setPosition}
      />
    </div>
  );
}
