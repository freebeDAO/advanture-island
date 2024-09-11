"use client";
import React, { useState } from 'react';

// 暂无处理异常情况，即输入值异常-无法转换成数字的
function ConnectComponent(props: any) {
  const [id, setId] = useState('0');
  const [xVal, setXVal] = useState('0');
  const [yVal, setYVal] = useState('0');

  const getGraphAPI = () => {
    if (id !== "") {
      fetch(`/api/graph?id=${id}`)
        .then(r => {
          console.log('r', r);
        });
    } else {
      fetch('/api/graph').then(r => {
        console.log('r', r);
      });
    }
  }

  const deleteGraphAPI = () => {
    if (id === "") return
    fetch(`/api/graph?id=${id}`, {
      method: "DELETE"
    }).then(r => {
      console.log('r', r);
    });
  }

  const updateGraphAPI = () => {
    if (id === "" || xVal === "" || yVal === "") return
    fetch('/api/graph', {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        x: xVal,
        y: yVal
      })
    }).then(r => {
      console.log('r', r);
    });
  }

  const createGraphAPI = () => {
    if (xVal === "" || yVal === "") return
    fetch('/api/graph', {
      method: "POST",
      body: JSON.stringify({
        x: xVal,
        y: yVal
      })
    }).then(r => {
      console.log('r', r);
    });
  }

  return (
    <div>
      <div className='pl-[20px]'>
        <div className='flex items-center'>
          <span className='flex w-[24px]'>id</span>
          <input type="text" className='border-2 border-solid border-gray-500 rounded m-4' onChange={(e) => setId(e.target.value)} />
        </div>
        <div className='flex'>
          <span className='flex w-[24px]'>x</span>
          <input type="text" className='border-2 border-solid border-gray-500 rounded m-4' onChange={(e) => setXVal(e.target.value)} />
        </div>
        <div className='flex'>
          <span className='flex w-[24px]'>y</span>
          <input type="text" className='border-2 border-solid border-gray-500 rounded m-4' onChange={(e) => setYVal(e.target.value)} />
        </div>
      </div>
      <div className='flex justify-around'>
        <button className='w-[120px] bg-blue-400 rounded-lg text-white py-[8px]' onClick={createGraphAPI}>新增</button>
        <button className='w-[120px] bg-blue-400 rounded-lg text-white py-[8px]' onClick={updateGraphAPI}>修改</button>
        <button className='w-[120px] bg-blue-400 rounded-lg text-white py-[8px]' onClick={getGraphAPI}>查询</button>
        <button className='w-[120px] bg-blue-400 rounded-lg text-white py-[8px]' onClick={deleteGraphAPI}>删除</button>
      </div>
    </div>
  );
}

export default ConnectComponent;