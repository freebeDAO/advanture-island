import React, { memo, useState } from "react";

// 移动方向
export enum MOVE_DIRECTION {
  right = 'ArrowRight',
  down = 'ArrowDown',
  left = 'ArrowLeft',
  up = 'ArrowUp',
}

// 移动配置
export type MoveConfig = {
  speed?: number,
  speedMin?: number,
  speedMax?: number,
  speedStep?: number,
  autoMove?: boolean,
  autoMoveDirection?: MOVE_DIRECTION,
}

// 控制面板 props
type ControlPanelProps = {
  initialConfig: Required<MoveConfig>,
  onChange: (value: MoveConfig) => void,
};

// 控制面板
const ControlPanel: React.FC<ControlPanelProps> = ({ initialConfig, onChange }) => {
  const [config, setConfig] = useState(initialConfig);
  const { speed, speedMin, speedMax, speedStep, autoMove, autoMoveDirection } = config;
  return <div>
    移动速度：<input
      className="px-2 border-2 rounded-sm border-neutral-200"
      type="number"
      min={speedMin}
      max={speedMax}
      step={speedStep}
      value={speed}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        // 用step修正输入值
        const value = { speed: Math.round(Math.round(Number(e.target.value) / speedStep) * speedStep * 1000000) / 1000000 };
        setConfig(Object.assign({}, config, value));
      }}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
        const value = { speed: Math.max(Math.min(speed, speedMax), speedMin) };
        setConfig(Object.assign({}, config, value));
        onChange(value);
      }}
    />&nbsp;&nbsp;
    <input
      className="h-4 w-4"
      type="checkbox"
      id="autoMove"
      checked={autoMove}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = { autoMove: e.target.checked };
        setConfig(Object.assign({}, config, value));
        onChange(value);
      }}
    /><label htmlFor="autoMove">自动移动</label>&nbsp;&nbsp;
    自动移动方向：<select value={autoMoveDirection} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = { autoMoveDirection: e.target.value as unknown as MOVE_DIRECTION };
        setConfig(Object.assign({}, config, value));
        onChange(value);
      }}>
      <option value={MOVE_DIRECTION.right}>Right</option>
      <option value={MOVE_DIRECTION.down}>Down</option>
      <option value={MOVE_DIRECTION.left}>Left</option>
      <option value={MOVE_DIRECTION.up}>Up</option>
    </select>
  </div>
};

export default memo(ControlPanel);
