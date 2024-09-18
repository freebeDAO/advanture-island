// src/pages/index.tsx

import MovableComponent from "src/components/MovableComponent/Movable";
/*
 * weixin: wchen446352746，任务：测试任务 移动模块
 */
const DemoPage = () => {
  return (
    <div className="relative w-full h-screen">
      <MovableComponent nodeId={1}/>
    </div>
  );
};

export default DemoPage;
