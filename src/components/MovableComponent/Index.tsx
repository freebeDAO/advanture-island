"use client";

import React, { useState, useEffect, useRef } from "react";

const Player = () => {
    const [playerState, setPlayerState] = useState({
        position: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
        isBtnMoving: false,
        isMouseMoving: false,
        direction: { dx: 0, dy: 0 },
        speed: 2
    });
    const isCanPutRef = useRef(true);
    const playerStateRef = useRef(playerState);


    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        playerStateRef.current = playerState
        //保存位置数据到数据库,防止数据量过大，每秒执行一次
        const putData = async () => {
            if (!isCanPutRef.current) {
                return;
            }
            isCanPutRef.current = false;
            const node = {
                x: playerState.position.x,
                y: playerState.position.y,
            };
            try {
                const response = await fetch(`/api/node`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(node),
                });

                await response.json();
            } catch (error) {
                console.error('Error:', error);
            }
            finally {
                setTimeout(() => { isCanPutRef.current = true }, 1000)
            }
        };
        putData()
    }, [playerState])
    // 键盘控制移动
    useEffect(() => {
        if (typeof window !== "undefined") {
            setPlayerState({ ...playerStateRef.current, position: { x: window.innerWidth / 2, y: window.innerHeight / 2 } });
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            const pos = playerStateRef.current.position;
            const speed = playerStateRef.current.speed;
            switch (event.key) {
                case "w":
                    setPlayerState({ ...playerState, position: { ...pos, y: pos.y - speed } });

                    break;
                case "a":
                    setPlayerState({ ...playerState, position: { ...pos, x: pos.x - speed } });


                    break;
                case "s":
                    setPlayerState({ ...playerState, position: { ...pos, y: pos.y + speed } });

                    break;
                case "d":
                    setPlayerState({ ...playerState, position: { ...pos, x: pos.x + speed } });
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // 鼠标点击移动


    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);
    // 鼠标点击移动
    const handleMouseUp = (e: MouseEvent) => {


        if (divRef.current) {
            // const rect = divRef.current.getBoundingClientRect();
            playerStateRef.current = {
                ...playerStateRef.current,
                isBtnMoving: false,
                isMouseMoving: true,
                target: { x: e.clientX, y: e.clientY }
            }
            move()

        }


    };
    //move
    const move = () => {

        const dx = playerStateRef.current.target.x - playerStateRef.current.position.x;
        const dy = playerStateRef.current.target.y - playerStateRef.current.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1 && playerStateRef.current.isMouseMoving) {
            const moveX = dx / distance * playerStateRef.current.speed;
            const moveY = dy / distance * playerStateRef.current.speed;
            const prev = playerStateRef.current.position
            playerStateRef.current = {
                ...playerStateRef.current,
                position: {
                    x: prev.x + moveX,
                    y: prev.y + moveY
                }
            }
            requestAnimationFrame(move);
        }
        else {
            playerStateRef.current = {
                ...playerStateRef.current,
                isMouseMoving: false

            }

        }
        setPlayerState(playerStateRef.current)
    }




    // 自动移动
    useEffect(() => {
        let animationFrameId: number;

        const moveAutomatically = () => {
            const prev = playerState.position
            const direction = playerState.direction
            const speed = playerState.speed
            setPlayerState({
                ...playerState, position: {
                    x: prev.x + direction.dx * speed,
                    y: prev.y + direction.dy * speed
                }
            })
            animationFrameId = requestAnimationFrame(moveAutomatically);
        };

        if (playerState.isBtnMoving) {
            animationFrameId = requestAnimationFrame(moveAutomatically);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [playerState]);

    // 启动自动移动
    const startAutoMove = (dx: number, dy: number) => {
        setPlayerState({ ...playerState, isBtnMoving: true, isMouseMoving: false, direction: { dx, dy } })

    };

    // 停止自动移动
    const stopAutoMove = (e) => {
        e.stopPropagation();
        setPlayerState({ ...playerState, isBtnMoving: false, isMouseMoving: false })
    };


    //修改移动速度
    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseFloat(e.target.value);
        if (!isNaN(newSpeed)) {
            setPlayerState({ ...playerState, speed: newSpeed })
        }
    };
    //重置位置
    const back = (e) => {
        e.stopPropagation();
        setPlayerState({ ...playerState, isBtnMoving: false, isMouseMoving: false, position: { x: window.innerWidth / 2, y: window.innerHeight / 2 } })
    };

    return (
        <div style={{ width: '250px' }} onMouseUp={(e) => { e.stopPropagation(); console.log(e) }}>
            <h2>说明</h2>
            <p>1、按WASD可以上下左右移动</p>
            <p>2、点击屏幕位置移到到鼠标位置</p>
            <p>3、以下按钮自动移动</p>
            <div
                ref={divRef}
                style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "blue",
                    position: "absolute",
                    top: playerState.position.y,
                    left: playerState.position.x,
                    cursor: "pointer",
                }}
            ></div>


            <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                <button style={{
                    backgroundColor: 'blue',
                    color: 'White',
                    borderRadius: '10%',
                    cursor: 'Pointer'
                }} onClick={(e) => { e.stopPropagation(); startAutoMove(1, 0) }}>自动右移</button>
                <button style={{
                    backgroundColor: 'blue',
                    color: 'White',
                    borderRadius: '10%',
                    cursor: 'Pointer',
                    marginLeft: "20px"
                }} onClick={(e) => { e.stopPropagation(); startAutoMove(-1, 0) }}>自动左移</button>
                <br />
                <button style={{
                    marginTop: "20px",
                    backgroundColor: 'blue',
                    color: 'White',
                    borderRadius: '10%',
                    cursor: 'Pointer'
                }} onClick={(e) => { e.stopPropagation(); startAutoMove(0, 1) }}>自动下移</button>
                <button style={{
                    backgroundColor: 'blue',
                    color: 'White',
                    borderRadius: '10%',
                    cursor: 'Pointer',
                    marginLeft: "20px"
                }} onClick={(e) => { e.stopPropagation(); startAutoMove(0, -1) }}>自动上移</button>
                <br />
                <button style={{
                    marginTop: "20px",
                    backgroundColor: 'blue',
                    color: 'White',
                    borderRadius: '10%',
                    cursor: 'Pointer',
                    marginRight: "20px"
                }} onClick={stopAutoMove} >
                    停止自动移动
                </button>
                <button style={{
                    marginTop: "20px",
                    backgroundColor: 'blue',
                    color: 'White',
                    borderRadius: '10%',
                    cursor: 'Pointer'
                }} onClick={back} >
                    重置位置
                </button>
            </div>

            <label htmlFor="speedInput">移动速度: </label>
            <input
                id="speedInput"
                type="number"
                value={playerState.speed}
                onChange={handleSpeedChange}
                style={{ marginRight: "10px", border: '1px solid' }}
            />
            <div style={{ marginTop: "10px" }}>
                <p>当前位置：X: {Math.round(playerState.position.x)}, Y: {Math.round(playerState.position.y)}</p>
            </div>
            <p>其他说明:node相关的增删改查接口在文件 src\app\api\node\route.ts</p>
        </div>
    );
};

export default Player;
