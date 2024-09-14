"use client"
import { useState, useEffect, useRef } from 'react';

const DraggerComponent = () => {
  const [node, setNode] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const draggerRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef(node);

  useEffect(() => {
    nodeRef.current = node;
  }, [node]);

  const initialNode = { x: 0, y: 0 };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && draggerRef.current) {
      const draggerRect = draggerRef.current.getBoundingClientRect();
      const parentRect = draggerRef.current.parentElement?.getBoundingClientRect();

      let newX = nodeRef.current.x + event.movementX;
      let newY = nodeRef.current.y + event.movementY;

      const isOutSide = event.clientX >= draggerRect.left && event.clientX <= draggerRect.right && event.clientY >= draggerRect.top && event.clientY <= draggerRect.bottom;

      if (isOutSide) {
        if (parentRect) {
          const exceedsLeft = newX < 0;
          const exceedsTop = newY < 0;
          const exceedsRight = newX + draggerRect.width > parentRect.width;
          const exceedsBottom = newY + draggerRect.height > parentRect.height;

          if (exceedsLeft || exceedsTop || exceedsRight || exceedsBottom) {
            //setPosition(initialPosition);
          } else {
            setNode({ x: newX, y: newY });
          }
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={draggerRef}
      onMouseDown={handleMouseDown}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'lightblue',
        position: 'absolute',
        left: node.x,
        top: node.y,
        cursor: 'grab',
        userSelect: 'none',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={() => (isDragging ? null : (document.body.style.cursor = 'grab'))}
      onMouseLeave={() => (document.body.style.cursor = 'auto')}
    >
      <p style={{ textAlign: 'center', margin: 0 }}>拉我</p>
    </div>
  );
};

export default DraggerComponent;