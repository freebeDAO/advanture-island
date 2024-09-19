'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import './dialog.css';
export default function TestNode() {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteNodeId, setDeleteNodeId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNodes();
  }, []);

  // Query node
  const fetchNodes = async () => {
    setIsLoading(true);
    try{
      const response = await fetch('/api/nodes/queryNode',{
        method: "get",
        headers: {
          "content-Type": "application/json",
        },
      });
      if(response.ok){
        const responseData = await response.json();
        console.log("rsult data:" , responseData);
        if(responseData.data){
          setNodes(responseData.data);
        }
  
      }
    }
    finally{
      setIsLoading(false);
    }
    
  };

  const handleDelete = async (id: number) => {
    setDeleteNodeId(id);
    setIsDeleteOpen(true);
  }

  // Delete node
  const confirmDelete = async () => {
    console.log("handleDelete: ", deleteNodeId)
    setIsLoading(true)
    try {
      const deleteNode = await fetch(`/api/nodes/deleteNode`, {
        method: "delete",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({id: deleteNodeId}),
      });
      if(deleteNode.ok){
        const responseData = await deleteNode.json();
        console.log("rsult data:" , responseData);
        if(responseData.code === 200){
          setDeleteNodeId(0);
          setIsDeleteOpen(false);
          fetchNodes();
        }
        else{
          alert(responseData.msg);
        }
  
      }
      
    } catch (error) {
      alert(error);
    }
    finally{
      setIsLoading(false);
    }
    
  };

  const handleUpdate = async (node) => {
    setSelectedNode(node);
    setIsUpdateOpen(true);
  };

  // Update node
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updateNode = {
      id: selectedNode.id,
      x: parseInt(formData.get('x')),
      y: parseInt(formData.get('y')),
    };
    setIsLoading(true);
    try {
      const updatedNode = await fetch('/api/nodes/updateNode', {
        method: "put",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(updateNode),
      });
      if(updatedNode.ok){
        const responseData = await updatedNode.json();
        console.log("rsult data:" , responseData);
        if(responseData.code === 200 && responseData.data){
          setSelectedNode(null); // 关闭弹窗
          setIsUpdateOpen(false);
          fetchNodes();
        }
        else{
          alert(responseData.msg);
        }
  
      }
      
    } catch (error) {
      alert(error);
    }
    finally{
      setIsLoading(false);
    }

    
  };

  // Add node
  const handleAddNode = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("event.target", event.target);
    const formData = new FormData(event.target);
    const newNode = {
      x: parseInt(formData.get('x') ?? '0'),
      y: parseInt(formData.get('y') ?? '0'),
    };
    setIsLoading(true);
    try {
      const createdNode = await fetch('/api/nodes/addNode', {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNode),
      });
      if(createdNode.ok){
        const responseData = await createdNode.json();
        console.log("rsult data:" , responseData);
        if(responseData.code === 200 && responseData.data){
          setIsAddOpen(false);
          fetchNodes();
        }
        else{
          alert(responseData.msg);
        }
  
      }
      
    } catch (error) {
      alert(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nodes</h1>
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-1/4">ID</th>
            <th className="w-1/4">X</th>
            <th className="w-1/4">Y</th>
            <th className="w-1/4">Actions</th>
          </tr>
        </thead>
        {/* Show node list */}
        <tbody>
          {nodes && nodes.map((node) => (
            <tr key={node.id}>
              <td className='text-center'>{node.id}</td>
              <td className='text-center'>{node.x}</td>
              <td className='text-center'>{node.y}</td>
              <td className='text-center'>
                <button className='mr-4 cursor-pointer hover:text-orange-500' onClick={() => handleDelete(node.id)}>Delete</button>
                <button className='cursor-pointer hover:text-orange-500' onClick={() => handleUpdate(node)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for adding node */}
      <Dialog.Root open={isAddOpen}>
        <Dialog.Trigger asChild>
          <button onClick={() => {setIsAddOpen(true);}} className="Button violet cursor-pointer">Add Node</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Add Node</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Make changes to your data here. Click save when you are done.
            </Dialog.Description>
        <form onSubmit={handleAddNode}>
          <label htmlFor="x">X:</label>
          <input type="number" name="x" defaultValue={0} />
          <label htmlFor="y">Y:</label>
          <input type="number" name="y" defaultValue={0} />
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            
              <button type="submit" className="Button green cursor-pointer">Save changes</button>
            
          </div>
          
        </form>
        
        <Dialog.Close asChild>
          <button onClick={() => setIsAddOpen(false)} className="IconButton cursor-pointer" aria-label="Close">
            Close
          </button>
        </Dialog.Close>
        
        </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Dialog for updating node */}
      <Dialog.Root open={isUpdateOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Edit Node</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Make changes to your data here. Click save when you are done.
            </Dialog.Description>
            <form onSubmit={handleUpdateSubmit}>
              <label htmlFor="x">X:</label>
              <input type="number" name="x" defaultValue={selectedNode?.x || 0} />
              <label htmlFor="y">Y:</label>
              <input type="number" name="y" defaultValue={selectedNode?.y || 0} />
              <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                <button type="submit" className="Button green cursor-pointer">Save changes</button>
              </div>

              
            </form>
            <Dialog.Close asChild>
              <button onClick={() => setIsUpdateOpen(false)} className="IconButton cursor-pointer" aria-label="Close">
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
          </Dialog.Portal>
      </Dialog.Root>

      {/* Dialog for deleting node */}
      <Dialog.Root open={isDeleteOpen}>
      <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Delete Node</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Make delete to your data here. Click yes when you are sure.
            </Dialog.Description>

          <p>Are you sure you want to delete this node?</p>
          <div className="flex justify-end mt-4">
            <Dialog.Close asChild>
              <button onClick={confirmDelete} className="Button green cursor-pointer mr-4">Yes</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button onClick={() => setIsDeleteOpen(false)} className="Button violet cursor-pointer">Cancel</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* loading */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
      
    </div>
  );
}