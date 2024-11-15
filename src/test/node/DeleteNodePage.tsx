// test/DeleteNodePage.tsx

import React, { useState } from 'react';
import { deleteNodeById } from '../../components/node/deletenodeService';

const DeleteNodePage = () => {
  const [nodeId, setNodeId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleDeleteNode = async () => {
    try {
      await deleteNodeById(nodeId);
      setMessage(`Node with ID ${nodeId} has been deleted successfully.`);
    } catch (err: unknown) {
      let errorMessage = 'An error occurred while deleting the node.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error('Error:', err);
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <h1>Delete Node</h1>
      <input
        type="text"
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
        placeholder="Enter node ID"
      />
      <button onClick={handleDeleteNode}>Delete Node</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteNodePage;
