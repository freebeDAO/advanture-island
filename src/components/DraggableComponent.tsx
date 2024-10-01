'use client';
import React, { useState, useRef, useEffect  } from 'react';

interface DraggableComponent {
    content?: string;
  }
const DraggableComponent = ({content='DraggableComponent'}) =>{
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const parentRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      offset.current.x = dragRef.current.offsetLeft - e.clientX;
      offset.current.y = dragRef.current.offsetTop - e.clientY;
      setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX + offset.current.x;
        const newY = e.clientY + offset.current.y;
        // console.log(`width: ${dragRef.current.style.width}, height: ${dragRef.current.style.height}`); 
        // console.log(`clientWidth: ${dragRef.current.clientWidth}, clientHeight: ${dragRef.current.clientHeight}`);
        // console.log(`e.clientX: ${e.clientX}, clientY: ${e.clientY}`);
        // console.log(`offset: ${offset.current.x}, ${offset.current.y}`);
        // console.log(`newX: ${newX}, newY: ${newY}`);
        // console.log(`pWidth: ${parentRef.current.style.width}, pHeight: ${parentRef.current.style.width}`);
        // console.log(`pWidth: ${parentRef.current.clientWidth}, pHeight: ${parentRef.current.clientHeight}`);
        if (
          newX >= 0 &&
          newY >= 0 &&
          newX + dragRef.current.clientWidth <= parentRef.current.clientWidth &&
          newY + dragRef.current.clientHeight <= parentRef.current.clientHeight
        ) {
          dragRef.current.style.left = `${newX}px`;
          dragRef.current.style.top = `${newY}px`;
          
          // console.log(`newX: ${newX}, newY: ${newY}`);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    dragRef.current.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      data-testid='draggable-parent'
      ref={parentRef}
      style={{ position: 'relative', width: '500px', height: '200px', border: '1px solid blue', padding: '10px' }}>
      <div
        id='draggable-div'
        data-testid='draggable-div'
        ref={dragRef}
        style={{ position: 'absolute', width: '50px', height: '50px', background: 'red', cursor: 'move' ,left:'0px',top:'0px'}}>
        {content}
      </div>
    </div>
  );
}


export default DraggableComponent;