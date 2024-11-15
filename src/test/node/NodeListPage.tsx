// test/NodeListPage.tsx

import React, { useState, useEffect } from 'react';
import fetchNodes, {  Node } from '../../components/node/nodeService';

const NodeListPage = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [error, setError] = useState<string>('');

  const loadNodes = async () => {
    try {
      const data = await fetchNodes();
      setNodes(data);
      setError('');  // 清除之前的错误信息
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching nodes.');
    }
  };

  useEffect(() => {
    loadNodes();  // 初始加载时获取数据
  }, []);

  return (
    <div>
      <h1>Node List</h1>
      {error && <p>{error}</p>}
      <button onClick={loadNodes}>Refresh Nodes</button>
      <ul>
        {nodes.map((node) => (
          <li key={node.id}>
            ID: {node.id}, X: {node.x}, Y: {node.y}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NodeListPage;
