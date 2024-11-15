// components/nodeByIdService.ts

export interface Node {
  id: number;
  x: number;
  y: number;
}

export const fetchNodeById = async (nodeId: string): Promise<Node> => {
  const response = await fetch(`/api/nodes/${nodeId}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Node not found');
  }
  return response.json();
};

export default fetchNodeById;
