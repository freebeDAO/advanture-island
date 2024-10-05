'use client';
import React, { useState, useRef, useEffect  } from 'react';

interface DraggableProps {
  children?: React.ReactNode;
  parentRef?: React.RefObject<HTMLDivElement>;
  width?:number;
  height?:number;
}
const defaultProps: Partial<DraggableProps> = {
  width: 50,
  height: 50
};

const DraggableComponent: React.FC<DraggableProps> = (props: DraggableProps) => {
  const { children, parentRef, width, height } = { ...defaultProps, ...props };
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  // const parentRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // console.log('handleMouseDown');
      offset.current.x = dragRef.current?.offsetLeft - e.clientX;
      offset.current.y = dragRef.current?.offsetTop - e.clientY;
      setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX + offset.current.x;
        const newY = e.clientY + offset.current.y;
        if(parentRef){
          if (
            newX >= 0 &&
            newY >= 0 &&
            newX + dragRef.current.clientWidth <= parentRef.current.clientWidth &&
            newY + dragRef.current.clientHeight <= parentRef.current.clientHeight
          ) {
            dragRef.current.style.left = `${newX}px`;
            dragRef.current.style.top = `${newY}px`;
          }
        }else if (newX >= 0 && newY >= 0 ) {
          dragRef.current.style.left = `${newX}px`;
          dragRef.current.style.top = `${newY}px`;
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    dragRef.current.addEventListener('mousemove', handleMouseMove);
    dragRef.current.addEventListener('mouseup', handleMouseUp);
    dragRef.current.addEventListener('mousedown', handleMouseDown);

    return () => {
      // dragRef.current.removeEventListener('mousemove', handleMouseMove);
      // dragRef.current.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div id='draggable-div' data-testid='draggable-div' ref={dragRef}
      style={{position: 'relative', width: `${width}px`,height: `${height}px`}}>
      {children}
    </div>
  );
}


export default DraggableComponent;