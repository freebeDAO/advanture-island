'use client'
import { useCallback, useEffect, useState } from "react";
import DraggableComponent from "src/components/ui/draggable/DraggableComponent";
import { throttle } from "lodash";

interface MovableComponentProps {
    id: string;
    initialX: number;
    initialY: number;
    containerWidth: number;
    containerHeight: number;
    onPositionChange?: (id: string, x: number, y: number) => void;
}

const MovableComponent:React.FC<MovableComponentProps> = ({ id, initialX, initialY, containerWidth, containerHeight, 
    onPositionChange }) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isAutoMoving, setIsAutoMoving] = useState(false);
    const [autoMoveDirection, setAutoMoveDirection] = useState({ dx: 1, dy: 0 });
    const [autoMoveSpeed, setAutoMoveSpeed] = useState(1);

    const handleAutoMove = () => {
        setIsAutoMoving(!isAutoMoving);
    };
    const changeDirection = (dx: number, dy: number) => {
        setAutoMoveDirection({ dx, dy });
    };
    const changeSpeed = (speed: number) => {
        setAutoMoveSpeed(speed);
    };

    const handlePositionChange = useCallback(throttle(async (id: string, x: number, y: number) => {
        try {
            const res = await fetch(`/api/nodes/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x, y }),
            });
            if (!res.ok) {
                throw new Error('更新位置失败');
            }

        } catch (error) {
            console.error('moveableDemo更新位置发生错误:', error);
        }
    }, 500), []);

    const moveCompent = useCallback((newX:number, newY:number) => {
        const clampedX = Math.max(0, Math.min(newX, containerWidth - 50));
        const clampedY = Math.max(0, Math.min(newY, containerHeight - 50));
        setPosition({ x: clampedX, y: clampedY });
        handlePositionChange(id, clampedX, clampedY);
        if (typeof onPositionChange === 'function') {
            onPositionChange(id, clampedX, clampedY);

        }
    }, [id, onPositionChange])

    //键盘控制
    useEffect(() => {
        const handleKeyDown = (e:KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    moveCompent(position.x, position.y - 10);
                    break;
                case 'ArrowDown':
                    moveCompent(position.x, position.y + 10);
                    break;
                case 'ArrowLeft':
                    moveCompent(position.x - 10, position.y);
                    break;
                case 'ArrowRight':
                    moveCompent(position.x + 10, position.y);
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () =>  window.removeEventListener('keydown', handleKeyDown);
    }, [position, moveCompent])

    
    //鼠标点击控制
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;
        moveCompent(newX, newY);
    };


    //自动移动
    useEffect(() => {
        let animateid: number;

        const autoMove = () => {
            if (isAutoMoving) {
                moveCompent(position.x + autoMoveDirection.dx * autoMoveSpeed, position.y + autoMoveDirection.dy * autoMoveSpeed);
                animateid = requestAnimationFrame(autoMove);
            }
        }
        if (isAutoMoving) {
            animateid = requestAnimationFrame(autoMove);
        }
        return () => cancelAnimationFrame(animateid);
    }, [isAutoMoving, autoMoveDirection, autoMoveSpeed, position, onPositionChange])

    return (
        <div
            style={{
                position: 'relative',
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                border: '1px solid black',
                overflow: 'hidden'
            }}
            onClick={handleClick}
            >
            <div
                style={{
                    position: 'absolute',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    cursor: 'pointer'
                }}
            >
                移动组件
            </div>

            <div className="absolute top-50 left-50" onClick={(e) => e.stopPropagation()}>
                <DraggableComponent initialPosition={{ x: 0, y: 0 }}>
                    速度：<input
                        type="range"
                        min="1"
                        max="10"
                        value={autoMoveSpeed}
                        onChange={(e) => changeSpeed(Number(e.target.value))}
                    />
                    <div className="relative w-64 h-64 bg-gray-200 rounded-full">
                        <button 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold w-24 h-24 rounded-full"
                            onClick={handleAutoMove}
                        >{isAutoMoving ? '停止' : '开始'} 自动移动</button>
                        <button className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(0, -1)}>↑</button>
                        <button className="absolute top-[15%] right-[15%] bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(1, -1)}>↗</button>
                        <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(1, 0)}>→</button>
                        <button className="absolute bottom-[15%] right-[15%] bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(1, 1)}>↘</button>
                        <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(0, 1)}>↓</button>
                        <button className="absolute bottom-[15%] left-[15%] bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(-1, 1)}>↙</button>
                        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(-1, 0)}>←</button>
                        <button className="absolute top-[15%] left-[15%] bg-blue-500 hover:bg-blue-700 text-white font-bold w-12 h-12 rounded-full" onClick={() => changeDirection(-1, -1)}>↖</button>
                    </div>
                </DraggableComponent> 
                
            </div>
        </div>
    );
}

export default MovableComponent;