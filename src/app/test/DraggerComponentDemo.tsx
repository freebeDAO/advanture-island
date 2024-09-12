"use client";

import React from "react";
import DraggerComponent from "src/components/component/DraggerComponent";

/**
 * weixin: azhaorz，任务：创建一个拖动的组件，使对象可以被拖动
 */
const DraggerComponentDemo: React.FC = () => {
  return (
    <div className="w-80">
      <div className="relative w-full h-screen ">
        <h1 className="text-2xl font-bold mb-4">
          2. 创建一个拖动的组件，使对象可以被拖动
        </h1>
        <DraggerComponent className="bg-blue-200 shadow-md rounded-lg p-4">
          <div className="w-36 h-36 flex items-center justify-center">
            <p className="text-md font-medium">请拖拽我！</p>
          </div>
        </DraggerComponent>
      </div>
    </div>
  );
};

export default DraggerComponentDemo;
