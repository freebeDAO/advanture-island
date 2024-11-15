// test/NodeDetailPage.tsx

import React, { useState } from 'react';
import fetchNodeById, { Node } from '../../components/node/nodeByIdService';

const NodeDetailPage = () => {
  const [nodeId, setNodeId] = useState<string>('');
  const [node, setNode] = useState<Node | null>(null);
  const [error, setError] = useState<string>('');

  const loadNode = async () => {
    try {
      const data = await fetchNodeById(nodeId);
      setNode(data);
      setError('');
    } catch (err: unknown) {
      let errorMessage = 'An error occurred while fetching the node.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error('Error:', err);
      setError(errorMessage);
      setNode(null);
    }
  };

  return (
    <div>
      <h1>Node Detail</h1>
      <input
        type="text"
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
        placeholder="Enter node ID"
      />
      <button onClick={loadNode}>Fetch Node</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {node && (
        <div>
          <h2>Node Information</h2>
          <p>ID: {node.id}</p>
          <p>X: {node.x}</p>
          <p>Y: {node.y}</p>
        </div>
      )}
    </div>
  );
};

export default NodeDetailPage;
