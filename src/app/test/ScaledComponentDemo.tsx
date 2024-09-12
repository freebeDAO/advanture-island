import React from "react";
import ScaledComponent from "src/components/component/ScaledComponent";

/**
 * weixin: azhaorz，任务：创建一个放大缩小的组件，使目标对象可以放大缩小
 */
const ScaledComponentDemo: React.FC = () => {
  return (
    <div className="w-80">
      <h1 className="text-2xl font-bold mb-4">
        1. 创建一个放大缩小的组件，使目标对象可以放大缩小
      </h1>
      <ScaledComponent>
        <div className="bg-gray-200 p-8 rounded-lg shadow-md">
          <p className="text-gray-700">目标对象</p>
        </div>
      </ScaledComponent>
    </div>
  );
};

export default ScaledComponentDemo;
