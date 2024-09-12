"use client";

import React from "react";
import JumpableComponent from "src/components/component/JumpableComponent";

/**
 * weixin: azhaorz，任务：创建一个可跳动的组件
 */

const JumpableComponentDemo: React.FC = () => {
  return (
    <div className="w-80">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">3. 创建一个可跳动的组件 </h1>
        <p className="mb-4">请按空格键或点击圆让它跳动起来~</p>
        <JumpableComponent />
      </div>
    </div>
  );
};

export default JumpableComponentDemo;
