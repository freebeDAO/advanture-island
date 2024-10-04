/**
 * 可移动组件
 */
import React, { CSSProperties, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import CustomAnimation from './animation';
import ControlPanel, { MOVE_DIRECTION, MoveConfig } from './ControlPanel';

// props
export type MovableComponentProps = {
  className?: string,
  style?: CSSProperties,
  nodeId: number,
  initialConfig?: MoveConfig,
  children: ReactNode,
};

// 移动对象，存储位置信息和动画
type MoveType = {
  nodeId: number;
  x: number;
  y: number;
  animation?: CustomAnimation;
}

// 基础速率 0.5px/ms
const SPEED = 0.5;
// 键盘移动或自动移动时长10ms
const DURATION = 10;

// 返回config change handle函数
const useConfigChange = ({ config, setConfig, moveRef }: {
  config: Required<MoveConfig>;
  setConfig: React.Dispatch<React.SetStateAction<Required<MoveConfig>>>;
  moveRef: React.MutableRefObject<MoveType>;
}) => {
  return useCallback((value: MoveConfig) => {
    setConfig(Object.assign({}, config, value));

    // 终止动画
    const moveObj = moveRef.current;
    const animation = moveObj.animation;
    animation?.end();

  }, [config, setConfig]);
};

// 运行动画
const runAnimation = ({ eleRef, moveRef, distanceX, distanceY, duration, repeat }: {
  eleRef: React.MutableRefObject<HTMLDivElement>;
  moveRef: React.MutableRefObject<MoveType>;
  distanceX: number;
  distanceY: number;
  duration: number;
  repeat: boolean;
}) => {
  let xOffset = 0;
  let yOffset = 0;
  moveRef.current.animation = new CustomAnimation({
    duration,
    keyFrame: (progress: number) => {
      const xOffsetTemp = distanceX * progress;
      const yOffsetTemp = distanceY * progress;
      moveRef.current.x += xOffsetTemp - xOffset;
      moveRef.current.y += yOffsetTemp - yOffset;
      xOffset = xOffsetTemp;
      yOffset = yOffsetTemp;
      eleRef.current.style.transform = `translate(${moveRef.current.x}px, ${moveRef.current.y}px)`;

      if (repeat && progress >= 1) {
        // 如果未抬起按键，继续动画
        runAnimation({ eleRef, moveRef, distanceX, distanceY, duration, repeat });
      }
    },
    onEnd: () => {
      // 每次动画结束，更新位置信息
      fetch(`/api/node/createOrUpdate`, {
        method: 'POST',
        body: JSON.stringify({ id: moveRef.current.nodeId, x: moveRef.current.x, y: moveRef.current.y})
      });
    }
  });
}

// 点击移动
const useClickMove = ({ eleRef, moveRef, config }: {
  eleRef: React.MutableRefObject<null | HTMLDivElement>;
  moveRef: React.MutableRefObject<MoveType>;
  config: Required<MoveConfig>;
}) => {
  const { autoMove, speed } = config;
  return useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = eleRef.current;
    if (!element || autoMove) {
      return;
    }
    const animation = moveRef.current.animation;
    // 结束旧动画
    animation?.end();

    // 创建新动画
    // 获取元素位置和click位置
    let { x: x0, y: y0, width, height } = element.getBoundingClientRect();
    // 定位到中心点
    x0 += width / 2;
    y0 += height / 2;
    const x1 = e.clientX;
    const y1 = e.clientY;
    // 计算距离和duration
    const distance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    const duration = Math.round(distance / speed / SPEED);

    // 运行动画
    runAnimation({
      eleRef: eleRef as React.MutableRefObject<HTMLDivElement>,
      moveRef,
      distanceX: x1 - x0,
      distanceY: y1 - y0,
      duration,
      repeat: false,
    });
  }, [autoMove, speed]);
};

// 判断是否是箭头按键
function isArrowKey(keyName: string): boolean {
  const arr: string[] = [MOVE_DIRECTION.up, MOVE_DIRECTION.down, MOVE_DIRECTION.left, MOVE_DIRECTION.right];
  return arr.includes(keyName);
};

// 键盘移动
const useKeyboardMove = ({ eleRef, moveRef, config }: {
  eleRef: React.MutableRefObject<null | HTMLDivElement>;
  moveRef: React.MutableRefObject<MoveType>;
  config: Required<MoveConfig>;
}) => {
  const { autoMove, speed } = config;

  // 监听键盘事件
  useEffect(() => {
    const element = eleRef.current;
    const handleKeydown = (e: KeyboardEvent) => {
      const keyName = e.key;
      if (!element || !isArrowKey(keyName) || autoMove) {
        return () => { };
      }

      e.preventDefault();

      // 结束动画
      moveRef.current.animation?.end();

      const isY = [MOVE_DIRECTION.up, MOVE_DIRECTION.down].includes(keyName as MOVE_DIRECTION);
      const isForward = [MOVE_DIRECTION.down, MOVE_DIRECTION.right].includes(keyName as MOVE_DIRECTION);
      let distance = speed * SPEED * DURATION * (isForward ? 1 : -1);

      const handleKeyup = () => {
        const keyName = e.key;
        if (!isArrowKey(keyName)) {
          return ''
        }
        // 动画结束
        moveRef.current.animation?.end();
        // 移除keyup事件
        document.removeEventListener('keyup', handleKeyup);
      };

      document.addEventListener('keyup', handleKeyup);

      // 运行动画
      runAnimation({
        eleRef: eleRef as React.MutableRefObject<HTMLDivElement>,
        moveRef,
        distanceX: isY ? 0 : distance,
        distanceY: isY ? distance : 0,
        duration: DURATION,
        repeat: true,
      });

    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [autoMove, speed]);
};

// 自动移动
const useAutoMove = ({ eleRef, moveRef, config }: {
  eleRef: React.MutableRefObject<null | HTMLDivElement>;
  moveRef: React.MutableRefObject<MoveType>;
  config: Required<MoveConfig>;
}) => {
  const { autoMove, speed, autoMoveDirection } = config;

  // 监听键盘事件
  useEffect(() => {
    // 结束动画
    moveRef.current.animation?.end();

    const element = eleRef.current;
    if (!autoMove || !element) {
      return () => { };
    }

    const isY = [MOVE_DIRECTION.up, MOVE_DIRECTION.down].includes(autoMoveDirection);
    const isForward = [MOVE_DIRECTION.down, MOVE_DIRECTION.right].includes(autoMoveDirection);
    let distance = speed * SPEED * DURATION * (isForward ? 1 : -1);

    // 运行动画
    runAnimation({
      eleRef: eleRef as React.MutableRefObject<HTMLDivElement>,
      moveRef,
      distanceX: isY ? 0 : distance,
      distanceY: isY ? distance : 0,
      duration: DURATION,
      repeat: true,
    });

  }, [autoMove, speed, autoMoveDirection]);
};

// move 组件
const MovableComponent: React.FC<MovableComponentProps> = ({ className, style, nodeId, initialConfig = {}, children }) => {
  const [config, setConfig] = useState(() => {
    return Object.assign({
      speed: 1,
      speedMin: 0.1,
      speedMax: 10,
      speedStep: 0.1,
      autoMove: false,
      autoMoveDirection: MOVE_DIRECTION.right,
    } as Required<MoveConfig>, initialConfig);
  });

  const eleRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);
  const moveRef: React.MutableRefObject<MoveType> = useRef({ nodeId, x: 0, y: 0 });

  useEffect(() => {
    fetch(`/api/node/${nodeId}`).then(res => {
      return res.json();
    }).then(({data}) => {
      if (data) {
        // 从服务端获取初始化位置信息
        moveRef.current.x = data.x;
        moveRef.current.y = data.y;
        (eleRef as React.MutableRefObject<HTMLDivElement>).current.style.transform = `translate(${moveRef.current.x}px, ${moveRef.current.y}px)`;
      } else {
        fetch(`/api/node/createOrUpdate`, {
          method: 'POST',
          body: JSON.stringify({ id: nodeId, x: 0, y: 0})
        });
      }
    });
  }, [nodeId]);

  const handleConfigChange = useConfigChange({ config, setConfig, moveRef });

  // 点击移动
  const handleClickMove = useClickMove({ eleRef, moveRef, config });

  // 键盘移动
  useKeyboardMove({ eleRef, moveRef, config });

  // 自动移动
  useAutoMove({ eleRef, moveRef, config });

  return <div className={clsx('h-full flex flex-col items-center', className)} style={style}>
    {/* 控制面板 */}
    <ControlPanel initialConfig={config} onChange={handleConfigChange} />
    {/* 移动容器 */}
    <div className="h-full w-full flex items-center justify-center" onClick={handleClickMove}>
      {/* 移动对象 */}
      <div ref={eleRef} className="inline-block">
        {children}
      </div>
    </div>
  </div>
};

export default memo(MovableComponent);
