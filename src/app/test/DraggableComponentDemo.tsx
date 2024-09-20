/*
 * @Author: liliang
 * @Date: 2024-09-21 00:53:53
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-21 00:58:21
 * @FilePath: /advanture-island/src/app/test/DraggableComponentDemo.tsx
 * @Description: 
 */
// /test/DraggableComponentDemo.js
import React from 'react';
import DraggableComponent from '../../components/component/DraggableComponent'; // 引入我们创建的组件

const DraggableComponentDemo = () => {
  return (
    <div className="demo-container">
      <DraggableComponent>
        <div className="draggable-box" style={{width: '100px',height:'50px',background: '#ddd'}}>拖动我!</div>
      </DraggableComponent>
    </div>
  );
};

export default DraggableComponentDemo;
