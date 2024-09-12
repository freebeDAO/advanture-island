"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface CircleComponentProps {
  initialScale?: number;
  minScale?: number;
  maxScale?: number;
  scaleStep?: number;
}

const CircleComponent: React.FC<CircleComponentProps> = ({
  initialScale = 1,
  minScale = 0.5,
  maxScale = 2,
  scaleStep = 0.1,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [scale, setScale] = useState(initialScale);
  const ref = useRef<HTMLDivElement>(null);

  const jump = useCallback(() => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  }, [isJumping]);

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
          jump();
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        setIsDragging(true);
      }
    },
    [position, jump]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [jump]);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + scaleStep, maxScale));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - scaleStep, minScale));
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <button
          onClick={handleZoomOut}
          className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600"
        >
          -
        </button>
        <button
          onClick={handleZoomIn}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <div
        ref={ref}
        className={`absolute cursor-move w-20 h-20 bg-blue-500 rounded-full ${
          isDragging ? "opacity-80" : ""
        }`}
        style={{
          transform: `translate(${position.x}px, ${
            position.y
          }px) scale(${scale}) ${
            isJumping ? "translateY(-20px)" : "translateY(0)"
          }`,
          transition: isDragging
            ? "none"
            : "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
        onMouseDown={onMouseDown}
        onClick={jump}
      />
    </div>
  );
};

export default CircleComponent;
