// test/node/UpdateNodePage.tsx
import React, { useState } from 'react';
import  updateNodeById  from '../../components/node/UpdateNodeService';


const UpdateNodePage: React.FC = () => {
  const [nodeId, setNodeId] = useState<string>('');
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleUpdateNode = async () => {
    const resultMessage = await updateNodeById(nodeId, x, y);
    setMessage(resultMessage);
  };

  return (
    <div>
      <h1>Update Node</h1>
      <input
        type="text"
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
        placeholder="Enter node ID"
      />
      <input
        type="number"
        value={x}
        onChange={(e) => setX(Number(e.target.value))}
        placeholder="Enter new x value"
      />
      <input
        type="number"
        value={y}
        onChange={(e) => setY(Number(e.target.value))}
        placeholder="Enter new y value"
      />
      <button onClick={handleUpdateNode}>Update Node</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateNodePage;
