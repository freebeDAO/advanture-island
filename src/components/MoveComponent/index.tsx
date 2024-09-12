"use client";
import React, { useEffect, useRef, useState } from 'react';

type PostPropType = {
  x: number,
  y: number,
}

type AliasFn = React.Dispatch<React.SetStateAction<PostPropType>>

type CheckRunFn = () => boolean

type MoveCmptProp = {
  step: number;
  elMoveChaneg?: (changeVal: AliasFn, checkRun: CheckRunFn) => void
}

const dicts = new Map([
  ["ArrowLeft", (position: PostPropType, val: number) => ({ ...position, x: position.x - val })],
  ["ArrowRight", (position: PostPropType, val: number) => ({ ...position, x: position.x + val })],
  ["ArrowUp", (position: PostPropType, val: number) => ({ ...position, y: position.y - val })],
  ["ArrowDown", (position: PostPropType, val: number) => ({ ...position, y: position.y + val })],
])

function MoveComponent(props: MoveCmptProp) {
  const postEl = useRef<HTMLDivElement>(null);
  const locationVal = useRef<PostPropType>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const isMovedVal = useRef<boolean>(false);
  const isUserAction = useRef<boolean>(false);
  const offsetVal = useRef<PostPropType>({ x: 0, y: 0 });
  // 使用 useState 来跟踪元素的位置
  const [position, setPosition] = useState<PostPropType>({ x: 0, y: 0 });

  // 鼠标按下事件处理函数
  const handleMouseDown = (event: any) => {
    isDragging.current = true;
    isUserAction.current = true;
    offsetVal.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    }
  };

  // 鼠标移动事件处理函数
  const handleMouseMove = (event: any) => {
    if (isDragging.current) {
      const current = offsetVal.current;
      setPosition({
        x: event.clientX - current.x,
        y: event.clientY - current.y,
      });
      isMovedVal.current = true;
    }
  };

  // 鼠标释放事件处理函数
  const handleMouseUp = () => {
    isDragging.current = false;
    isUserAction.current = false;
  };

  // 检查当前是否在进行用户操作
  const checkRun = () => isUserAction.current;

  const autoElMoveChaneg = () => {
    props.elMoveChaneg?.(setPosition, checkRun);
  }

  const handelKeyDown = (event: any) => {
    isUserAction.current = true;
    const callback = dicts.get(event.key);
    if (callback) {
      setPosition((cached) => {
        return callback(cached, props.step ?? 5);
      })
    }
  }

  const handelKeyUp = () => {
    isUserAction.current = false;
  }

  const setLocationVal = () => {
    if (postEl.current) {
      const area = postEl.current.getBoundingClientRect();
      locationVal.current = {
        x: area.left,
        y: area.top,
      }
    }
  }

  const handleClickDown = (event: any) => {
    if (isMovedVal.current) {
      isMovedVal.current = false;
    } else {
      const current = locationVal.current;
      setPosition({
        x: event.clientX - current.x,
        y: event.clientY - current.y,
      });
    }
  }

  const addTrackToSql = () => {
    fetch('/api/graph', {
      method: "POST",
      body: JSON.stringify(position),
    }).then(r => {
      console.log('r', r);
    });
  }

  useEffect(() => {
    autoElMoveChaneg();
    setLocationVal();
    document.addEventListener('click', handleClickDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handelKeyUp);
    document.addEventListener("keydown", handelKeyDown);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClickDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keyup", handelKeyUp);
      document.removeEventListener("keydown", handelKeyDown);
      document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [])

  useEffect(() => {
    addTrackToSql();
  }, [position])

  return (
    <div

      ref={postEl}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      className='w-[100px] h-[100px] absolute bg-red-500 rounded-lg cursor-pointer'
    />
  );
}

export default MoveComponent;