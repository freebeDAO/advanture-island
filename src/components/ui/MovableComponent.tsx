"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Node } from '../../entity/Node';

interface Movable {
    className?: string;
    stepQuantity?: number;
    initNode?: Node;
    intDirection?: { dx: number; dy: number };
    intSpeed?: number;
    sideLength?: number;
    maxSpeed?: number;
}

const MovableComponent: React.FC<Movable> = ({
    className = '',
    stepQuantity = 10,
    initNode = { x: 0, y: 0, id: -1 },
    intDirection = { dx: 0, dy: 0 },
    intSpeed = 0,
    sideLength = 50,
    maxSpeed = 20
}) => {
    const [node, setNode] = useState<{ x: number; y: number, id: number }>(initNode);
    const [direction, setDirection] = useState<{ dx: number; dy: number }>(intDirection);
    intSpeed = intSpeed > maxSpeed ? maxSpeed : intSpeed
    const [speed, setSpeed] = useState(intSpeed);
    const containerRef = useRef<HTMLDivElement>(null);
    const sideLengthHalf = Math.round(sideLength / 2);
    const [rePlayNodes, setRePlayNodes] = useState<Node[]>([]);
    const [runRePlay, setRunRePlay] = useState(true);
    const animationRef = useRef<number>(0);
    const targetPosition = useRef<{ x: number; y: number } | null>(null);
    const nodeRef = useRef(node);

    const updateNodeInDB = async () => {
        try {
            if (!targetPosition.current) {
                return;
            }
            const response = await fetch(`http://localhost:3001/api/node/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: node.id, x: targetPosition.current.x, y: targetPosition.current.y }),
            });

            if (!response.ok) {
                throw new Error("Failed to update position");
            }
        } catch (error) {
            console.error('Error updating position:', error);
        }
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault();
        let otherKey = 0;
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newNode = { ...node };

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    newNode.y = Math.max(0, node.y - stepQuantity);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    newNode.y = Math.min(rect.height - sideLength, node.y + stepQuantity);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    newNode.x = Math.max(0, node.x - stepQuantity);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    newNode.x = Math.min(rect.width - sideLength, node.x + stepQuantity);
                    break;
                default:
                    otherKey = 1;
                    break;
            }

            if (otherKey === 0) {
                targetPosition.current = newNode;
                updateNodeInDB();
                stopAll();
                animationRef.current = requestAnimationFrame(updateNodePosition);
            }
        }
    }, [node]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [node]);

    const handleMouseUp = useCallback((e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newX = e.clientX - rect.left - sideLengthHalf;
            const newY = e.clientY - rect.top - sideLengthHalf;
            const clampedX = Math.max(0, Math.min(rect.width - sideLength, newX));
            const clampedY = Math.max(0, Math.min(rect.height - sideLength, newY));

            const newNode = {
                x: clampedX, y: clampedY
            };

            targetPosition.current = newNode;
            updateNodeInDB();
            stopAll();
            animationRef.current = requestAnimationFrame(updateNodePosition);
        }
    }, [node]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!targetPosition.current) {
                targetPosition.current = node;
            }
            if (containerRef.current && speed > 0 && (0 !== direction.dx || 0 != direction.dy)) {
                const rect = containerRef.current.getBoundingClientRect();
                const newNode = {
                    x: targetPosition.current.x + direction.dx * speed,
                    y: targetPosition.current.y + direction.dy * speed,
                };

                const clampedX = Math.max(0, Math.min(rect.width - sideLength, newNode.x));
                const clampedY = Math.max(0, Math.min(rect.height - sideLength, newNode.y));

                if ((direction.dx != 0 && (clampedX === 0 || clampedX === rect.width - sideLength))
                    || (direction.dy != 0 && (clampedY === 0 || clampedY === rect.height - sideLength))) {
                    setDirection({ dx: 0, dy: 0 });
                    setSpeed(0);
                    targetPosition.current = null;
                } else {
                    targetPosition.current = { x: clampedX, y: clampedY };
                    updateNodeInDB();
                    cancelAnimationFrame(animationRef.current)
                    animationRef.current = requestAnimationFrame(updateNodePosition);
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [direction, speed]);


    const updateNodePosition = useCallback(() => {
        if (targetPosition.current) {
            const dx = targetPosition.current.x - nodeRef.current.x;
            const dy = targetPosition.current.y - nodeRef.current.y;


            const moveSpeed = 0.1;

            const newNode = {
                x: nodeRef.current.x + dx * moveSpeed,
                y: nodeRef.current.y + dy * moveSpeed,
                id: node.id,
            };

            nodeRef.current = newNode;
            setNode(nodeRef.current);

            if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
                animationRef.current = requestAnimationFrame(updateNodePosition);
            } else {
                targetPosition.current = null;
            }
        }
    }, [node, speed]);

    const stopAll = () => {
        setDirection({ dx: 0, dy: 0 });
        setSpeed(0);
        setRePlayNodes([]);
        setRunRePlay(false);
        cancelAnimationFrame(animationRef.current);
    }

    const replay = async () => {
        if (rePlayNodes) {
            try {
                const response = await fetch(`http://localhost:3001/api/node/findall`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to update position");
                } else {
                    const data = await response.json();
                    if (data.result.length > 0) {
                        cancelAnimationFrame(animationRef.current);
                        setRePlayNodes(data.result);
                        setRunRePlay(true);
                    }
                }
            } catch (error) {
                console.error('Error updating position:', error);
            }
        }
    };

    useEffect(() => {
        if (rePlayNodes.length > 0) {
            const newConstantArray = JSON.parse(JSON.stringify(rePlayNodes));
            const rePlayPath = setInterval(() => {
                if (runRePlay === false || newConstantArray.length === 0) {
                    clearInterval(rePlayPath);
                    setRePlayNodes([]);
                }

                const firstNode = newConstantArray[0];
                if (firstNode) {
                    targetPosition.current = { x: firstNode.x, y: firstNode.y };
                    animationRef.current = requestAnimationFrame(updateNodePosition);
                }
                newConstantArray.splice(0, 1);
            }, 1000);
            return () => clearInterval(rePlayPath);
        }
    }, [rePlayNodes]);

    return (
        <div
            className={`${className} items-center justify-center`}
        >
            <div
                ref={containerRef}
                className="relative w-full h-[90%]"
                onMouseUp={handleMouseUp}
            >
                <div
                    className='bg-blue-500 shadow-md rounded-lg p-4 absolute'
                    style={{
                        left: node.x,
                        top: node.y,
                        width: `${sideLength}px`,
                        height: `${sideLength}px`
                    }}
                />
            </div>
            <div className='w-full mt-2 border border-gray-300'>
                <button onClick={stopAll} className="m-0 mr-5 mt-0 mb-0 ml-0">停止</button>
                <button onClick={() => setDirection({ dx: -1, dy: 0 })} className="m-0 mr-5 mt-0 mb-0 ml-0">左移</button>
                <button onClick={() => setDirection({ dx: 1, dy: 0 })} className="m-0 mr-5 mt-0 mb-0 ml-0">右移</button>
                <button onClick={() => setDirection({ dx: 0, dy: 1 })} className="m-0 mr-5 mt-0 mb-0 ml-0">下移</button>
                <button onClick={() => setDirection({ dx: 0, dy: -1 })} className="m-0 mr-5 mt-0 mb-0 ml-0">上移</button>
                <button onClick={replay} className="m-0 mr-5 mt-0 mb-0 ml-0">回放</button>
                速度(0~{maxSpeed})：
                <input
                    type="range"
                    min="0"
                    max={maxSpeed}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="ml-2"
                />
                {speed}
            </div>
        </div >
    );
};

export default MovableComponent;