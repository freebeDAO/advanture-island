"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Node } from '../../models/Node';

const MovableComponent: React.FC<Node> = ({ x: initialX, y: initialY, id }) => {
    const [node, setNode] = useState<{ x: number; y: number }>({ x: initialX, y: initialY });
    const [dragging, setDragging] = useState(true);
    const [tagId, setId] = useState(id);
    const [direction, setDirection] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
    const [speed, setSpeed] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const step = 10;
            let otherKey = 0;
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const newNode = { ...node };

                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        newNode.y = Math.max(0, node.y - step);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        newNode.y = Math.min(rect.height - 50, node.y + step);
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        newNode.x = Math.max(0, node.x - step);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        newNode.x = Math.min(rect.width - 50, node.x + step);
                        break;
                    default:
                        otherKey = 1;
                        break;
                }

                if (otherKey === 0) {
                    setNode(newNode);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [node]);

    const handleMouseDown = () => {
        setDragging(true);
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragging && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newX = e.clientX - rect.left - 25;
            const newY = e.clientY - rect.top - 25;

            const clampedX = Math.max(0, Math.min(rect.width - 50, newX));
            const clampedY = Math.max(0, Math.min(rect.height - 50, newY));

            setNode({ x: clampedX, y: clampedY });
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const newX = e.clientX - rect.left - 25;
            const newY = e.clientY - rect.top - 25;

            const clampedX = Math.max(0, Math.min(rect.width - 50, newX));
            const clampedY = Math.max(0, Math.min(rect.height - 50, newY));

            setNode({ x: clampedX, y: clampedY });
        }
    };

    const updateNodeInDB = async () => {
        const response = await fetch(`/api/node/saveorupdate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: tagId, x: node.x, y: node.y }),
        });

        if (response.ok) {
            const data = await response.json();
            setId(data.node.id);
        }
    };

    useEffect(() => {
        if (!dragging) {
            updateNodeInDB();
        }
    }, [node]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue < 0) {
            setSpeed(Math.max(0, newValue));
        } else {
            setSpeed(newValue);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (containerRef.current && speed > 0 && (0 !== direction.dx || 0 != direction.dy)) {
                const rect = containerRef.current.getBoundingClientRect();
                const newNode = {
                    x: node.x + direction.dx * speed,
                    y: node.y + direction.dy * speed,
                };

                const clampedX = Math.max(0, Math.min(rect.width - 50, newNode.x));
                const clampedY = Math.max(0, Math.min(rect.height - 50, newNode.y));

                if ((direction.dx != 0 && (clampedX === 0 || clampedX === rect.width - 50))
                    || (direction.dy != 0 && (clampedY === 0 || clampedY === rect.height - 50))) {
                    setNode({ x: clampedX, y: clampedY });
                    setDirection({ dx: 0, dy: 0 });
                    setSpeed(0);
                } else {
                    setNode({ x: clampedX, y: clampedY });
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [node, direction, speed]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '90%',
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={handleClick}
            >
                <div
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                    style={{
                        position: 'absolute',
                        left: node.x,
                        top: node.y,
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'blue',
                        cursor: dragging ? 'grabbing' : 'grab',
                    }}
                />
            </div>
            <div style={{ width: '100%', marginTop: '10px', border: '1px solid #ccc' }}>
                <button onClick={() => setDirection({ dx: 1, dy: 0 })} style={{ margin: '0 20px 0 0' }}>右移</button>
                <button onClick={() => setDirection({ dx: -1, dy: 0 })} style={{ margin: '0 20px 0 0' }}>左移</button>
                <button onClick={() => setDirection({ dx: 0, dy: 1 })} style={{ margin: '0 20px 0 0' }}>下移</button>
                <button onClick={() => setDirection({ dx: 0, dy: -1 })} style={{ margin: '0 20px 0 0' }}>上移</button>
                <input
                    type="number"
                    value={speed}
                    onChange={handleInputChange}
                    placeholder="速度"
                    style={{
                        width: '50px'
                    }}
                />
            </div>
        </div >
    );
};

export default MovableComponent;