// pages/draggable/index.tsx

import React from 'react';
import Link from 'next/link';
import Demo from '../../test/draggable/DraggableDemo'; // 请根据实际路径调整

const DraggablePage: React.FC = () => {
  return (
    <div>
      <h1>Draggable Demo</h1>
      <Demo />
      <Link href="/" style={{ 
        marginTop: '20px', 
        display: 'inline-block', 
        padding: '10px 20px', 
        backgroundColor: '#0070f3', 
        color: '#fff', 
        borderRadius: '5px', 
        textDecoration: 'none',
        textAlign: 'center'
        }}>
        返回主页
      </Link>
    </div>
  );
};

export default DraggablePage;
