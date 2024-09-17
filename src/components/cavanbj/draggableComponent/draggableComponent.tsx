'use client';

import React, { useRef } from 'react';

interface DraggableComponentProps {
    children: React.ReactNode;
}

  /**
 * DraggableComponent 可以拖动任意对象的组件。
 * @param children - 被缩放的子元素
 */
const DraggableComponent: React.FC<DraggableComponentProps> = ({children}) => {
    const draggableRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: globalThis.MouseEvent) => {
        if (!draggableRef.current) {
            return
        }
        // 记住组件当前相对父元素的x,和y
        const startX = draggableRef.current.offsetLeft;
        const startY = draggableRef.current.offsetTop;
        // 记住鼠标初始位置
        const startEventX = e.clientX;
        const startEventY = e.clientY;
        // 点击后组件变为绝对定位，以便可以任意漂移
        draggableRef.current.style.position = 'absolute';

        // 鼠标移动时不断更新当前组件的x和y值实现移动效果
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!draggableRef.current) {
                return
            }
            // 组件最新位置=鼠标按下时组件的位置+当前鼠标已经移动的偏移量
            draggableRef.current.style.left = startX + (e.clientX - startEventX) + 'px';
            draggableRef.current.style.top = startY + (e.clientY - startEventY) + 'px';
            console.log(`x=${draggableRef.current.style.left} y=${draggableRef.current.style.top}`)
        };
        document.addEventListener('mousemove', handleMouseMove);

        // 鼠标抬起后，删除鼠标up事件的回调函数
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    };

    return (
        <div style={{position: 'relative'}}>
            <div
                ref={draggableRef}
                style={{
                    cursor: 'pointer'
                }}
                onMouseDown={handleMouseDown}
            >
                {children}
            </div>
        </div>
    );
};

export default DraggableComponent;