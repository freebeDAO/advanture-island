'use client'
import MovavableDemo from '@/test/demo/MovableDemo';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
export default function NodeEditPage({ params }: { params: { id: string } }){
    const id = parseInt(params.id);
    const moveRef = useRef(null);
    const router = useRouter(); 
    function handlerSave(): void {
        const {x,y} = moveRef.current.getXY()
        fetch(`/api/node/${id}`,{
            method:'PUT',
            body:JSON.stringify({
                id:id,
                x:x,
                y:y,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                router.push(`/node`);
            }
        })
    }
    useEffect(() => {
        fetch(`/api/node/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then( res=> {
            if (res.ok) {
                res.json().then(result=>{
                    moveRef.current.changeXY(result.data.x,result.data.y);
                });
            }
        })
        return () => {
        };
    }, []);
    return (
        <main style={{padding: "2rem"}}>
            <div>编辑Node</div>
            <button className="mr-2" style={{border: '1px solid black',width:'50px',height:'30px'}} onClick={() => handlerSave()}>保存</button>
            <MovavableDemo initX={0} initY={0} initSpeed={10} ref={moveRef}/>
        </main>
    );
}