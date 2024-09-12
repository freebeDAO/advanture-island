"use client";

import React, { useState } from "react";
import CircleComponent from "src/components/component/CircleComponent";
import MovableComponent from "src/components/component/MovableComponent";

/**
 * weixin: azhaorz，任务：功能合并：1. 放大缩小 2. 可拖拽 3. 可跳动
 */

const CircleComponentDemo: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        功能合并：1. 放大缩小 2. 可拖拽 3. 可跳动
      </h1>
      <div className="relative w-full h-[500px] border border-gray-300">
        <CircleComponent />
      </div>
    </div>
  );
};

export default CircleComponentDemo;
