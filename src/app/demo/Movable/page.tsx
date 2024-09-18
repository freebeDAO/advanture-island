import React from 'react';
import MovableComponent from "src/components/MovableComponent/Movable";
/*
 * weixin: wchen446352746，任务：测试任务 移动模块
 */
const TestMovable = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">这是一个可自由移动的 也可以鼠标点击移动或键盘操作的demo 默认初始坐标为100*100</h1>
      <MovableComponent id={1} initialX={100} initialY={100} />
    </div>
  );
};

export default TestMovable;
