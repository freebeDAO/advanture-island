'use client'

import {useDrag, useDrop, DndProvider} from "react-dnd";
import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import {HTML5Backend} from "react-dnd-html5-backend";

// props类型
interface DraggerProps extends PropsWithChildren {
    containerStyle: string
}

interface Position {
    x: number
    y: number
}

const DragContainer = ({children, containerStyle}: DraggerProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)

    const [position, setPosition] = useState<Position>({
        x: 0,
        y: 0
    })

    const [{dragging}, drag] = useDrag({
        type: 'box',
        item: {},
        collect(monitor) {
            return {
                dragging: monitor.isDragging()
            }
        }
    })

    const [, drop] = useDrop({
        accept: 'box',
        drop(_, monitor) {
            const childRect = childRef.current?.getBoundingClientRect()
            const containerRect = containerRef.current?.getBoundingClientRect()
            const offset = monitor.getClientOffset()

            if (childRect && containerRect && offset) {
                // 计算实际拖动的位置
                let x = (offset.x - childRect?.width) + childRect.width / 2 - containerRect.x
                let y = (offset.y - childRect?.height) + childRect.height / 2 - containerRect.y

                // 检测拖动是否超出边界  超出则自动贴边
                if (x < 0) {
                    x = 0
                } else if (x + childRect.width > containerRect.width) {
                    x = containerRect.width - childRect.width
                }

                if (y < 0) {
                    y = 0
                } else if (y + childRect.height > containerRect.height) {
                    y = containerRect.height - childRect.height
                }

                const position: Position = {
                    x,
                    y,
                }
                // 更新位置
                setPosition(position)
            }
        }
    })

    useEffect(() => {
        drop(containerRef)
        drag(childRef)

    },[])

    return <div className={`relative ${containerStyle}`} ref={containerRef}>
        <div ref={childRef} className={`cursor-move inline-block relative ${dragging ? 'opacity-0' : 'opacity-1'}`}
             style={{
                 left: position.x,
                 top: position.y,
             }}>
            {children}
        </div>
    </div>
}

export default function DraggerComponent({children, ...props}: DraggerProps) {
    return <>
        <DndProvider backend={HTML5Backend}>
            <DragContainer {...props}>
                {children}
            </DragContainer>
        </DndProvider>
    </>
}
