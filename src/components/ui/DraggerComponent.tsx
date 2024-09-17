"use client";
import { useState, useEffect, useRef } from 'react';

interface Dragger {
  children: React.ReactNode;
  className?: string;
}

const INITIAL_NODE = { x: 100, y: 100 };

const DraggerComponent: React.FC<Dragger> = ({ children, className = '' }) => {
  const isDragging = useRef(false);
  const draggerRef = useRef<HTMLDivElement | null>(null);
  const [node, setNode] = useState(INITIAL_NODE);

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.current && draggerRef.current) {
      setNode(prevNode => ({
        x: prevNode.x + event.movementX,
        y: prevNode.y + event.movementY,
      }));
    }
  };

  const handleMouseMoveBound = (event: MouseEvent) => handleMouseMove(event);
  const handleMouseUpBound = () => handleMouseUp();

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMoveBound);
    document.removeEventListener('mouseup', handleMouseUpBound);
    isDragging.current = false;
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMoveBound);
    document.addEventListener('mouseup', handleMouseUpBound);
    isDragging.current = true;
  };

  return (
    <div
      ref={draggerRef}
      onMouseDown={handleMouseDown}
      className={`absolute ${className}`}
      style={{
        left: node.x,
        top: node.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default DraggerComponent;