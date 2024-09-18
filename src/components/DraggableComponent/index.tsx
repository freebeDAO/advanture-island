import { DragEvent, FC, ReactNode, useRef, useState } from "react";


interface Props {
  children: ReactNode,
}

const DraggableComponent: FC<Props> = ({ children }) => {
  const parentElRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOutOfBounds, setIsOutOfBounds] = useState(false);

  // 拖拽开始
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    // 隐藏拖拽图像
    const img = new Image();
    img.src = '';
    e.dataTransfer.setDragImage(img, 0, 0);
  }

  // 拖拽中
  const handleDraging = (e: DragEvent<HTMLDivElement>) => {
    if (!parentElRef.current || isOutOfBounds) return;

    const parentRect = parentElRef.current.getBoundingClientRect();
    const { width: parentWidth, height: parentHeight } = parentRect;

    // 最大拖拽距离
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const maxX = parentWidth - offsetWidth;
    const maxY = parentHeight - offsetHeight;

    // 计算新的位置
    const newX = e.clientX - parentRect.left - offsetRef.current.x;
    const newY = e.clientY - parentRect.top - offsetRef.current.y;

    // 设置新的位置
    const x = newX < 0 ? 0 : newX > maxX ? maxX : newX;
    const y = newY < 0 ? 0 : newY > maxY ? maxY : newY;
    setPosition({ x, y });
  }

  return (
    <div className="relative w-full h-full overflow-hidden" ref={parentElRef}>
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: 'move',
        }}
        draggable
        onDragStart={handleDragStart}
        onDrag={handleDraging}
        onDragLeave={() => setIsOutOfBounds(true)}
        onDragEnter={() => setIsOutOfBounds(false)}
        onDragOver={e => e.preventDefault()}
      >
        {children}
      </div>
    </div>
  );
}

export default DraggableComponent