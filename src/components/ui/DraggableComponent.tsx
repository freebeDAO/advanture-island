"use client";
import React, { useState, useEffect } from "react";

const DraggableComponent: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 30 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Start dragging and calculate offset relative to the mouse position
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      // Move element with the mouse, adjusting for the initial offset
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    // Stop dragging when mouse is released
    setDragging(false);
  };

  useEffect(() => {
    // Attach event listeners to document when dragging starts
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      // Clean up event listeners when dragging stops
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "100px",
        height: "100px",
        backgroundColor: "#3498db",
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      Drag me!
    </div>
  );
};

export default DraggableComponent;
