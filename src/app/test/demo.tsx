/*
 * @Author: liliang
 * @Date: 2024-09-24 02:10:04
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-24 02:21:04
 * @FilePath: /advanture-island/src/app/test/demo.tsx
 * @Description: 
 */
// pages/test/demo.tsx
import React from 'react';
import DraggableComponent from '../../components/component/DraggableComponent';

const DemoPage: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <DraggableComponent />
    </div>
  );
};

export default DemoPage;
