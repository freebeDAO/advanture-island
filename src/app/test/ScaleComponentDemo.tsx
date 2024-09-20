/*
 * @Author: liliang
 * @Date: 2024-09-20 18:42:12
 * @LastEditors: liliang
 * @LastEditTime: 2024-09-21 01:09:17
 * @FilePath: /advanture-island/src/app/test/ScaleComponentDemo.tsx
 * @Description: 
 */
import React from 'react';
import ScaledComponent from '../../components/component/ScaledComponent';

const ScaleComponentDemo = () => {
  return (
    <div  className='text-center'>
      <h1 className='text-center'>组件 Demo</h1>
      <ScaledComponent>
        <div style={{ width: '200px', height: '200px', backgroundColor: 'lightblue', margin:'30px auto' }}>
          我是一个可以放大缩小的盒子
        </div>
      </ScaledComponent>
    </div>
  );
};

export default ScaleComponentDemo;
