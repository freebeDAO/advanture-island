'use client';

import React from 'react';



interface ShapeProps {
  shapeType: 'circle' | 'ellipse' | 'rectangle' | 'triangle' | 'roundedRectangle';
  width: number;
  height?: number;
  backgroundColor?: string;
  text?: string;
  fontSize?: string;
  fontColor?: string;
  textPosition?: { [key: string]: string};
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
}

class ShapeComponent extends React.Component<ShapeProps> {
  render() {
    let {shapeType, width, height, backgroundColor, text, fontSize, fontColor, textPosition, borderColor, borderWidth,borderRadius } = this.props;
      // 定义字体位置的 CSS 类
    let positionClass: {[key:string]: string} = {
      top: 'flex-start',
      middle: 'center',
      bottom: 'flex-end',
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };
    shapeType = shapeType || 'circle';
    // 根据 position props 生成 CSS 类名
    let defaultPosition = {yAlign: 'middle', xAlign: 'center'};
    let xPositionClass = positionClass[(textPosition|| defaultPosition).xAlign || 'center'];
    let yPositionClass = positionClass[(textPosition|| defaultPosition).yAlign || 'center'];

    width = width || 50;
    let {x, y} = [0, 0];
    if (shapeType == 'triangle') {
      positionClass = {
        top: 'text-before-edge',
        middle: 'central',
        bottom: 'text-after-edge',
        left: 'start',
        center: 'middle',
        right: 'end',
      };
       // 根据 position props 生成 CSS 类名
      defaultPosition = {yAlign: 'middle', xAlign: 'center'};
      xPositionClass = positionClass[(textPosition|| defaultPosition).xAlign || 'center'];
      yPositionClass = positionClass[(textPosition|| defaultPosition).yAlign || 'center'];

      // svg需要根据居中位置，设置文本对齐的基准点(x,y)相对父容器的位置，然后positionClass是相对于x,y这个基准点，指明字体positionClass位置要对齐到(x,y)点
      // 水平对齐需要设置x
      if (xPositionClass == positionClass.center) {
        x = width/2;
      } else if (xPositionClass == positionClass.left) {
        x = 0;
      } else {
        x = width;
      }
      // 垂直对齐需要设置y
      if (yPositionClass == positionClass.top) {
        y = 0;
      } else if (yPositionClass == positionClass.middle) {
        y = width/2;
      } else {
        y = width;
      }
    }

    // 定义默认值
    height = height || 50;
    backgroundColor = backgroundColor || 'white';
    text = text || '';
    fontSize = fontSize || '12px';
    fontColor = fontColor || 'rgb(100,200,50)';
    borderColor = borderColor || 'black';
    borderWidth = borderWidth || '1px';
    borderRadius = borderRadius || '3px';

    let shape;
    switch (shapeType) {
      case 'circle':
        shape = (
          <div
            style={{
              width: width+'px',
              height: width+'px',
              borderRadius: '50%',
              backgroundColor: backgroundColor,
              alignItems: yPositionClass,
              justifyContent: xPositionClass,
              fontSize: fontSize,
              color: fontColor,
              borderColor: borderColor,
              borderWidth: borderWidth,
              display: 'flex',
              borderStyle: 'solid',
            }}>{text}</div>
        );
        break;
      case 'ellipse':
        shape = (
          <div
            style={{
              width: width+'px',
              height: height+'px',
              borderRadius: '50%',
              backgroundColor: backgroundColor,
              alignItems: yPositionClass,
              justifyContent: xPositionClass,
              fontSize: fontSize,
              color: fontColor,
              borderColor: borderColor,
              borderWidth: borderWidth,
              display: 'flex',
              borderStyle: 'solid',
            }}>{text}</div>
        );
        break;
      case 'rectangle':
        shape = (
          <div
            style={{
              width: width+'px',
              height: height+'px',
              backgroundColor: backgroundColor,
              alignItems: yPositionClass,
              justifyContent: xPositionClass,
              fontSize: fontSize,
              color: fontColor,
              borderColor: borderColor,
              borderWidth: borderWidth,
              display: 'flex',
              borderStyle: 'solid',
            }}>{text}</div>
        );
        break;
      case 'triangle':
        shape = (
          <div>
            <svg style={{width: width, height: width, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}} xmlns="http://www.w3.org/2000/svg">
  <polygon points={`0, ${width * 0.87}, ${width * 0.5}, 0, ${width}, ${width * 0.87}`} fill={backgroundColor} stroke={borderColor} strokeWidth={borderWidth}/>
  <text x={x} y={y} text-anchor={positionClass[textPosition.xAlign]} dominant-baseline={positionClass[textPosition.yAlign]} fill={fontColor} style={{fontSize: fontSize}}>{text}</text>
</svg>
          </div>
        );
        break;
      case 'roundedRectangle':
        shape = (
          <div
            style={{
              width: width+'px',
              height: height+'px',
              backgroundColor: backgroundColor,
              borderRadius: borderRadius,
              alignItems: yPositionClass,
              justifyContent: xPositionClass,
              fontSize: fontSize,
              color: fontColor,
              borderColor: borderColor,
              borderWidth: borderWidth,
              display: 'flex',
              borderStyle: 'solid',
            }}>{text}</div>
        );
        break;
      default:
        shape = null;
    }

    return shape;
  }
}

export default ShapeComponent;