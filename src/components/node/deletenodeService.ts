// components/deletenodeService.ts

export const deleteNodeById = async (nodeId: string): Promise<void> => {
  const response = await fetch(`/api/nodes/${nodeId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete node.');
  }
};
