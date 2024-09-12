'use client'

import React, { useState } from 'react';
import './index.css'
const ShapeOptions = ['圆形', '椭圆形', '矩形', '圆角矩形', '正三角形'];
const defaultShape = '矩形';
const defaultBackgroundColor = '#ff0000';
const defaultBorderColor = '#000000';
const defaultBorderSize = 1;
const defaultText = 'Hello, World!';
const defaultFontSize = '16px';
const defaultTextColor = '#000000';
const defaultTextPosition = 'center center';

const StyleControlComponent = () => {
    const [shape, setShape] = useState(defaultShape);
    const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
    const [borderColor, setBorderColor] = useState(defaultBorderColor);
    const [borderSize, setBorderSize] = useState(defaultBorderSize);
    const [text, setText] = useState(defaultText);
    const [fontSize, setFontSize] = useState(defaultFontSize);
    const [textColor, setTextColor] = useState(defaultTextColor);
    const [textPosition, setTextPosition] = useState(defaultTextPosition);

    const handleShapeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setShape(event.target.value);
    };

    const handleBackgroundColorChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setBackgroundColor(event.target.value);
    };

    const handleBorderColorChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setBorderColor(event.target.value);
    };

    const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    };

    const handleTextColorChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTextColor(event.target.value);
    };

    const handleTextPositionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTextPosition(event.target.value);
    };

    const getShapeStyle = () => {
        let shapeStyle = {};

        switch (shape) {
            case '圆形':
                shapeStyle = {
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    backgroundColor: backgroundColor,
                    border: `${borderSize}px solid ${borderColor}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: textColor,
                    fontSize: fontSize,
                    textAlign: 'center',
                };
                break;
            case '椭圆形':
                shapeStyle = {
                    width: '250px',
                    height: '150px',
                    borderRadius: '50px / 25px',
                    backgroundColor: backgroundColor,
                    border: `${borderSize}px solid ${borderColor}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: textColor,
                    fontSize: fontSize,
                    textAlign: 'center',
                };
                break;
            case '矩形':
                shapeStyle = {
                    width: '200px',
                    height: '100px',
                    backgroundColor: backgroundColor,
                    border: `${borderSize}px solid ${borderColor}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: textColor,
                    fontSize: fontSize,
                    textAlign: 'center',
                };
                break;
            case '圆角矩形':
                shapeStyle = {
                    width: '200px',
                    height: '100px',
                    borderRadius: '10px',
                    backgroundColor: backgroundColor,
                    border: `${borderSize}px solid ${borderColor}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: textColor,
                    fontSize: fontSize,
                    textAlign: 'center',
                };
                break;
            case '正三角形':
                shapeStyle = {
                    width: 0,
                    height: 0,
                    borderTop: '200px solid transparent',
                    borderLeft: '200px solid transparent',
                    borderRight: '200px solid transparent',
                    borderBottom: `200px solid ${borderColor}`,

                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: textColor,
                    fontSize: fontSize,
                    textAlign: 'center',
                };
                break;
            default:
                shapeStyle = {};
                break;
        }

        return shapeStyle;
    };
    const triangleStyle = () => {
        const style = {
            width: 0,
            height: 0,
            borderTop: `${200 - borderSize}px solid transparent`,
            borderLeft: `${200 - borderSize}px solid transparent`,
            borderRight: `${200 - borderSize}px solid transparent`,
            borderBottom: `${200 - borderSize}px solid ${backgroundColor}`,
            transform: `translate(0,${borderSize / 2}px)`
        }
        return style
    }
    const getTriangleTextPositionStyle = () => {
        const [vertical, horizontal] = textPosition.split(' ');
        let top = '0';
        let left = '0';
        switch (vertical) {
            case 'top':
                top = '0px';
                break;
            case 'middle':
                top = '100px';
                break;
            case 'bottom':
                top = '200px';
                break;
        }
        switch (horizontal) {
            case 'left':
                left = '-200px';
                break;
            case 'center':
                left = '-20px';
                break;
            case 'right':
                left = '150px';
                break;
            default:
                left = '0';
                break;

        }
        return {
            top: top,
            left: left
        }

    }


    const getTextPositionStyle = () => {
        const [vertical, horizontal] = textPosition.split(' ');

        let verticalAlign = 'center';
        let horizontalAlign = 'center';

        switch (vertical) {
            case 'top':
                verticalAlign = 'flex-start';
                break;
            case 'middle':
                verticalAlign = 'center';
                break;
            case 'bottom':
                verticalAlign = 'flex-end';
                break;
            default:
                verticalAlign = 'center';
                break;
        }

        switch (horizontal) {
            case 'left':
                horizontalAlign = 'flex-start';
                break;
            case 'center':
                horizontalAlign = 'center';
                break;
            case 'right':
                horizontalAlign = 'flex-end';
                break;
            default:
                horizontalAlign = 'center';
                break;
        }

        return {
            display: 'flex',
            justifyContent: horizontalAlign,
            alignItems: verticalAlign,
        };
    };

    return (
        <div className='contentView'>
            <h2>样式控制组件</h2>
            <label htmlFor="shape">形状:</label>
            <select id="shape" value={shape} onChange={handleShapeChange}>
                {ShapeOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <label htmlFor="backgroundColor">背景颜色:</label>
            <input
                type="color"
                id="backgroundColor"
                value={backgroundColor}
                onChange={handleBackgroundColorChange}
            />

            <label htmlFor="borderColor">边框颜色:</label>
            <input
                type="color"
                id="borderColor"
                value={borderColor}
                onChange={handleBorderColorChange}
            />

            <label htmlFor="borderSize">边框大小:</label>
            <input
                type="number"
                id="borderSize"
                value={borderSize}
                onChange={(e) => setBorderSize(Number(e.target.value))}
            />

            <label htmlFor="text">文本内容:</label>
            <input
                type="text"
                id="text"
                value={text}
                onChange={handleTextChange}
            />

            <label htmlFor="fontSize">字体大小:</label>
            <input
                type="number"
                id="fontSize"
                value={fontSize.replace('px', '')}
                onChange={(e) => setFontSize(`${e.target.value}px`)}
            />

            <label htmlFor="textColor">字体颜色:</label>
            <input
                type="color"
                id="textColor"
                value={textColor}
                onChange={handleTextColorChange}
            />

            <label htmlFor="textPosition">文本位置:</label>
            <select id="textPosition" value={textPosition} onChange={handleTextPositionChange}>
                <option value="top left">Top Left</option>
                <option value="top center">Top Center</option>
                <option value="top right">Top Right</option>
                <option value="middle left">Middle Left</option>
                <option value="middle center">Middle Center</option>
                <option value="middle right">Middle Right</option>
                <option value="bottom left">Bottom Left</option>
                <option value="bottom center">Bottom Center</option>
                <option value="bottom right">Bottom Right</option>
            </select>
            {shape === '正三角形' && (
                <div style={{ ...getShapeStyle(), }}>

                    <div
                        className="triangle"
                        style={{
                            ...triangleStyle(), position: 'absolute',
                        }}
                    >
                    </div>
                    <div style={{ ...getTriangleTextPositionStyle(), position: 'absolute' }}>{text}</div>

                </div>

            )}
            {shape !== '正三角形' && (

                <div style={{ ...getShapeStyle(), ...getTextPositionStyle() }}>

                    <div>{text}</div>

                </div>
            )}

        </div>
    );
};

export default StyleControlComponent;