'use client'
import DraggableComponent from '@/components/DraggableComponent'
import { useRef } from 'react';

export default function DraggableDemo() {
const parentRef = useRef(null);
  return (
    <div
      data-testid='draggable-parent'
      ref={parentRef}
      style={{ position: 'relative', width: '500px', height: '200px', border: '1px solid blue' }}>
        
        <DraggableComponent parentRef={parentRef} width={50} height={50} >
            <div style={{ position: 'absolute', width: '50px', height: '50px', background: 'red', cursor: 'move' ,left:'0px',top:'0px'}}>
                可拖拽组件
            </div>
        </DraggableComponent>
    </div>
  )
}