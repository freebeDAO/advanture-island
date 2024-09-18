// src/pages/index.tsx

import MovableComponent from "src/components/MovableComponent/Movable";
/*
 * weixin: wchen446352746，任务：测试任务 可移动组件 
 */
const DemoPage = () => {
  return (
    <div className="relative w-full h-screen">
      <MovableComponent
        initialX={100}
        initialY={100}
        width={100}
        height={100}
        moveDirection="right"
        moveSpeed={200}
      >
        {/* 渲染这里的任何子组件或元素 */}
        <div className="bg-red-500 w-full h-full flex items-center justify-center text-white">Movable</div>
      </MovableComponent>
    </div>
  );
};

export default DemoPage;
