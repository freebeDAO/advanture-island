"use client";

import React, { useState } from "react";
import MovableComponent from "src/components/component/MovableComponent";

/**
 * weixin: azhaorz，任务：连接 mysql 数据库，创建 Node 实体，创建一个可移动的组件，位置变化需要更新到数据库
 */

const MovableComponentDemo: React.FC = () => {
  const [autoMove, setAutoMove] = useState(false);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    "right"
  );
  const [speed, setSpeed] = useState(5);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        4. 连接 mysql 数据库，创建 Node实体
        <br />
        5. 创建一个可移动的组件，位置变化需要更新到数据库，
      </h1>
      <div className="mb-4 space-y-2">
        <div>
          <label className="mr-2">
            <input
              type="checkbox"
              checked={autoMove}
              onChange={(e) => setAutoMove(e.target.checked)}
            />
            Auto Move
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as any)}
            className="mr-2"
          >
            <option value="up">Up</option>
            <option value="down">Down</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div>
          <label className="mr-2">
            Speed:
            <input
              type="range"
              min="1"
              max="20"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="ml-2"
            />
            {speed}
          </label>
        </div>
      </div>
      <div className="relative w-full h-[500px] border border-gray-300">
        <MovableComponent
          autoMove={autoMove}
          autoMoveDirection={direction}
          moveSpeed={speed}
        />
      </div>
    </div>
  );
};

export default MovableComponentDemo;
