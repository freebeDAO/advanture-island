// test/AddNodePage.tsx

import React, { useState } from 'react';
import { addNode } from '../../components/node/addNodeFormComponent';

const AddNodePage = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await addNode(x, y);
      setMessage(`Node created with ID: ${data.id}`);
    } catch (err: unknown) {
      let errorMessage = 'An error occurred while creating the node.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error('Error:', err);
      setMessage(errorMessage);
    }
  };

  return (
    <div>
      <h1>Add Node</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            X:
            <input
              type="number"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Y:
            <input
              type="number"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              required
            />
          </label>
        </div>
        <button type="submit">Add Node</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddNodePage;
