'use client';
import { useState } from "react";
import { StyleControlComponent, StyleControlComponentProps } from "src/components/ui/butsalt-style-control-component";
import { FontH, FontV } from "src/components/ui/butsalt-style-control-component";

export type DemoComponentProps = {
  initialModel: Required<StyleControlComponentProps>;
};

export const DemoComponent: React.FC<DemoComponentProps> = ({ initialModel }) => {
  const { shape } = initialModel;

  const [backgroundColor, setBackgroundColor] = useState(initialModel.backgroundColor);
  const [borderWidth, setBorderWidth] = useState(initialModel.borderWidth);
  const [borderRadius, setBorderRadius] = useState(initialModel.borderWidth);
  const [borderColor, setBorderColor] = useState(initialModel.borderColor);
  const [fontSize, setFontSize] = useState(initialModel.fontSize);
  const [fontColor, setFontColor] = useState(initialModel.fontColor);
  const [fontH, setFontH] = useState(initialModel.fontH);
  const [fontV, setFontV] = useState(initialModel.fontV);
  const [text, setText] = useState(initialModel.children);

  return (
    <div>
      <StyleControlComponent
        shape={shape}
        backgroundColor={backgroundColor}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        borderColor={borderColor}
        fontSize={fontSize}
        fontColor={fontColor}
        fontH={fontH}
        fontV={fontV}
      >
        {text}
      </StyleControlComponent>
      <div>
        <div>
          <label>背景色：</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={e => {
              setBackgroundColor(e.target.value);
            }}
          />
        </div>
        <div>
          <label>边框宽度：</label>
          <input
            type="range"
            value={borderWidth}
            min={0}
            max={20}
            onChange={e => {
              setBorderWidth(Number(e.target.value));
            }}
          />
        </div>
        {shape === 'rect' && (
          <div>
            <label>边框圆角：</label>
            <input
              type="range"
              value={borderRadius}
              min={0}
              max={20}
              onChange={e => {
                setBorderRadius(Number(e.target.value));
              }}
            />
          </div>
        )}
        <div>
          <label>字体大小：</label>
          <input
            type="range"
            value={fontSize}
            min={12}
            max={30}
            onChange={e => {
              setFontSize(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <label>边框颜色：</label>
          <input
            type="color"
            value={borderColor}
            onChange={e => {
              setBorderColor(e.target.value);
            }}
          />
        </div>
        <div>
          <label>字体颜色：</label>
          <input
            type="color"
            value={fontColor}
            onChange={e => {
              setFontColor(e.target.value);
            }}
          />
        </div>
        <div>
          <label>文本水平方向位置</label>
          <select
            value={fontH}
            onChange={e => {
              setFontH(e.target.value as FontH);
            }}
          > 
            <option value="left">左</option>
            <option value="center">中</option>
            <option value="right">右</option>
          </select>
        </div>
        <div>
          <label>文本垂直方向位置</label>
          <select
            value={fontH}
            onChange={e => {
              setFontV(e.target.value as FontV);
            }}
          > 
            <option value="top">上</option>
            <option value="center">中</option>
            <option value="bottom">下</option>
          </select>
        </div>
        <div>
          <label>文字内容：</label>
          <input
            type="text"
            value={text as string}
            onChange={e => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
