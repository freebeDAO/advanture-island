interface Node {
    id: number;
    x: number;
    y: number;
  }
  
 const updateNodeById = async (nodeId: string, x: number, y: number): Promise<string> => {
    try {
      const response = await fetch(`/api/nodes/${nodeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y }),
      });
  
      if (response.ok) {
        const updatedNode: Node = await response.json();
        return `Node with ID ${updatedNode.id} has been updated to x: ${updatedNode.x}, y: ${updatedNode.y}.`;
      } else {
        const errorData = await response.json();
        return errorData.error || 'Failed to update node.';
      }
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred while updating the node.';
    }
  };
  
  export default updateNodeById;