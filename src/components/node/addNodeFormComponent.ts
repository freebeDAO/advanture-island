// components/addNodeFormComponent.ts

export interface Node {
  id: number;
  x: number;
  y: number;
}

export const addNode = async (x: number, y: number): Promise<Node> => {
  const response = await fetch('/api/nodes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create node.');
  }

  return response.json();
};
