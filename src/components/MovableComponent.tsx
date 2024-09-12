'use client'
import React, {useState, useEffect, ReactNode, useRef, useCallback} from 'react';

type MovableComponentProps = {
    children: ReactNode;
    position: { x: number; y: number };
    direction?: string;
    speed?: number;
}

type Position = {
    x: number;
    y: number;
}

const MovableComponent: React.FC<MovableComponentProps> = ({ children, position: initPosition, direction, speed }) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
    const animationFrameId = useRef<number | null>(null);

    const move = (dx: number, dy: number) => {
        setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        setKeysPressed((prevKeys) => new Set(prevKeys).add(event.key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        setKeysPressed((prevKeys) => {
            const updatedKeys = new Set(prevKeys);
            updatedKeys.delete(event.key);
            return updatedKeys;
        });
    };

    const handleMovement = useCallback(() => {
        keysPressed.forEach((key) => {
            switch (key) {
                case 'ArrowUp':
                    move(0, -1);
                    break;
                case 'ArrowDown':
                    move(0, 1);
                    break;
                case 'ArrowLeft':
                    move(-1, 0);
                    break;
                case 'ArrowRight':
                    move(1, 0);
                    break;
                default:
                    break;
            }
        });

        if (keysPressed.size > 0) {
            animationFrameId.current = requestAnimationFrame(handleMovement);
        }

        if (direction && speed) {
            switch (direction) {
                case 'up':
                    move(0, -speed);
                    break;
                case 'down':
                    move(0, speed);
                    break;
                case 'left':
                    move(-speed, 0);
                    break;
                case 'right':
                    move(speed, 0);
                    break;
                default:
                    break;
            }
        }
    }, [direction, keysPressed, speed]);

    useEffect(() => {
        const startMoving = () => {
            if (animationFrameId.current === null) {
                animationFrameId.current = requestAnimationFrame(handleMovement);
            }
        };

        const stopMoving = () => {
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        if (keysPressed.size > 0) {
            startMoving();
        } else {
            stopMoving();
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            stopMoving();
        };
    }, [handleMovement, keysPressed]);

    useEffect(() => {
        setPosition(position);

        animationFrameId.current = requestAnimationFrame(handleMovement);

        return () => {
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [position, direction, speed, handleMovement]);

    useEffect(() => {
        setPosition(initPosition);
    }, [initPosition]);

    return (
        <div
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
            }}
        >
            {children}
        </div>
    );
};

export default MovableComponent;
