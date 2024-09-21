import React from 'react';
import MovableComponent from "src/components/MovableComponent/Movable";
/*
 * weixin: wchen446352746，任务：测试任务 移动模块
 */
const DemoPage = () => {
  return (
    <div className="w-full h-screen bg-black">
      <p className='h-1'>模块移动demo,可键盘操作人物移动</p>
      <MovableComponent
        id={1}
        initialX={20}              // 初始 X 坐标
        initialY={240}              // 初始 Y 坐标
        characterSprite="/characters/orc1_walk_full.png" // 精灵图路径
        frameWidth={160}             // 每帧的宽度
        frameHeight={170}            // 每帧的高度
        backgroundImg="/characters/game_background_2.png" // 背景图片路径
      />
    </div>
  );
};

export default DemoPage;
