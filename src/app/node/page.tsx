'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NodePage() {
    const [nodes, setNodesState] = useState([]);

    const router = useRouter();     
    function handlerEditingNode(id: number): void {
        router.push(`/node/${id}/edit`);
    }
    function handlerCreateNode(): void {
        router.push(`/node/create`);
    }

    function handleDeleteNode(id: number): void {
        const confirmed = window.confirm('确定要删除吗？');
        if (confirmed) {
            fetch(`/api/node/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then( res=> {
                if (res.ok) {
                    setNodesState(nodes.filter(node => node.id !== id));
                }
            })
            console.log(`delete: ${id}`);
          }
    }
    useEffect(()=>{   
    const fetchData = () => {
        fetch('/api/node', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then( res=> {
            if (res.ok) {
                res.json().then(result=>{
                    setNodesState(result.data);
                });
            }
        })
    };
    fetchData();
    },[])

    return(
        <main style={{padding: "2rem"}}>
        <h1>Nodes</h1>

        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">ID</th>
                <th scope="col" className="py-3 px-6">X</th>
                <th scope="col" className="py-3 px-6">Y</th>
                <th scope="col" className="py-3 px-6">创建时间</th>
                <th scope="col" className="py-3 px-6">修改时间</th>
                <th scope="col" className="py-3 px-6">操作</th>
            </tr>
            </thead>
            <tbody>
            {nodes.map(node => (
                <tr key={node.id}>
                <td>{node.id}</td>
                <td>{node.x}</td>
                <td>{node.y}</td>
                <td>{node.createdAt}</td>
                <td>{node.updatedAt}</td>
                <td>
                    <button className="mr-2" onClick={() => handlerCreateNode()}>新增</button>
                    <button className="mr-2" onClick={() => handlerEditingNode(node.id)}>编辑</button>
                    <button className="mr-2" onClick={() => handleDeleteNode(node.id)}>删除</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </main>
    );
}