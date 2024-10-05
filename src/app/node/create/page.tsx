'use client'
import MovavableDemo from '@/test/demo/MovableDemo';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
export default function NodeEditPage(){
    
    const moveRef = useRef(null);
    const router = useRouter(); 
    function handlerSave(): void {
        const {x,y} = moveRef.current.getXY()
        fetch('/api/node',{
            method:'POST',
            body:JSON.stringify({
                x:x,
                y:y,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                res.json().then(result=>{
                    console.log(result);
                });
                router.push(`/node`);
            }
        })
    }

    return (
        <main style={{padding: "2rem"}}>
            <div>新增Node</div>
            <button className="mr-2" style={{border: '1px solid black',width:'50px',height:'30px'}} onClick={() => handlerSave()}>保存</button>
            <MovavableDemo initX={0} initY={0} initSpeed={10} ref={moveRef}/>
        </main>
    );
}