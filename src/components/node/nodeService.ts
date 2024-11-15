// components/nodeService.ts

export interface Node {
  id: number;
  x: number;
  y: number;
}

const fetchNodes = async (): Promise<Node[]> => {
  const response = await fetch('/api/nodes');
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.error}`);
  }
  return response.json();
};

export default fetchNodes;
