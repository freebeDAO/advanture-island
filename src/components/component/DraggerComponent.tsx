"use client";

import React, { useState, useRef, useCallback } from "react";

interface DraggerComponentProps {
  children: React.ReactNode;
  className?: string;
}

const DraggerComponent: React.FC<DraggerComponentProps> = ({
  children,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (ref.current) {
        const startX = e.pageX - position.x;
        const startY = e.pageY - position.y;

        const onMouseMove = (e: MouseEvent) => {
          setPosition({
            x: e.pageX - startX,
            y: e.pageY - startY,
          });
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          setIsDragging(false);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        setIsDragging(true);
      }
    },
    [position]
  );

  return (
    <div
      ref={ref}
      className={`absolute cursor-move ${
        isDragging ? "opacity-80" : ""
      } ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
      }}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default DraggerComponent;
