"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface MovableComponentProps {
  initialX?: number;
  initialY?: number;
  autoMove?: boolean;
  autoMoveDirection?: Direction;
  moveSpeed?: number;
}

const MovableComponent: React.FC<MovableComponentProps> = ({
  initialX = 250,
  initialY = 250,
  autoMove = false,
  autoMoveDirection = "right",
  moveSpeed = 5,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const autoMoveRef = useRef<Direction>(autoMoveDirection);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialPosition = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/node/latest");
        if (response.ok) {
          const data = await response.json();
          setPosition(data);
        } else {
          setPosition({ x: 250, y: 250 });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setPosition({ x: 250, y: 250 });
      }
    };

    fetchInitialPosition();
  }, []);

  const updatePosition = useCallback(async (newX: number, newY: number) => {
    setPosition({ x: newX, y: newY });
    try {
      const response = await fetch("/api/node", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x: newX, y: newY }),
      });
      if (!response.ok) throw new Error("Failed to update position");
    } catch (error) {
      console.error("Error updating position:", error);
    }
  }, []);

  const moveTowards = useCallback((targetX: number, targetY: number) => {
    setTarget({ x: targetX, y: targetY });
  }, []);

  const animate = useCallback(() => {
    if (target) {
      const dx = target.x - position.x;
      const dy = target.y - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 1) {
        setPosition(target);
        setTarget(null);
        updatePosition(target.x, target.y);
      } else {
        const speed = Math.min(moveSpeed, distance);
        const ratio = speed / distance;
        const newX = position.x + dx * ratio;
        const newY = position.y + dy * ratio;
        setPosition({ x: newX, y: newY });
      }
    } else if (autoMove) {
      const step = moveSpeed;
      let newX = position.x;
      let newY = position.y;
      switch (autoMoveRef.current) {
        case "up":
          newY -= step;
          break;
        case "down":
          newY += step;
          break;
        case "left":
          newX -= step;
          break;
        case "right":
          newX += step;
          break;
      }

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (newX < 0 || newX > rect.width || newY < 0 || newY > rect.height) {
          const directions: Direction[] = ["up", "down", "left", "right"];
          autoMoveRef.current =
            directions[Math.floor(Math.random() * directions.length)];
          newX = Math.max(0, Math.min(newX, rect.width));
          newY = Math.max(0, Math.min(newY, rect.height));
        }
      }

      setPosition({ x: newX, y: newY });
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [position, target, moveSpeed, updatePosition, autoMove]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      const { key } = event;
      const { x, y } = position;
      const step = 50;
      if (key === "ArrowUp") moveTowards(x, y - step);
      else if (key === "ArrowDown") moveTowards(x, y + step);
      else if (key === "ArrowLeft") moveTowards(x - step, y);
      else if (key === "ArrowRight") moveTowards(x + step, y);
    },
    [position, moveTowards]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newX = event.clientX - rect.left;
        const newY = event.clientY - rect.top;
        moveTowards(newX, newY);
      }
    },
    [moveTowards]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    autoMoveRef.current = autoMoveDirection;
  }, [autoMoveDirection]);

  return (
    !loading && (
      <div
        ref={containerRef}
        className="relative w-full h-full"
        onClick={handleClick}
      >
        <div
          ref={componentRef}
          className="absolute w-10 h-10 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      </div>
    )
  );
};

export default MovableComponent;
