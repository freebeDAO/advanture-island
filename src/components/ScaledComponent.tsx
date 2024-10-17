"use client";
import React, { useState } from "react";
import { Slider, Row } from "antd";
import type { InputNumberProps } from "antd";

interface ScaledComponentPro {
    content?: string;
    defaultWidth?: number;
    defaultHeight?: number;
    defaultFontSize?: number;
}

const ScaledComponent: React.FC<ScaledComponentPro> = ({
    content = "Zoomable Component",
    defaultWidth = 100,
    defaultHeight = 100,
    defaultFontSize = 18,
}) => {
    const [width, setWidth] = useState(defaultWidth);
    const [height, setHeight] = useState(defaultHeight);
    const [fontSize, setFontSize] = useState(defaultFontSize);
    const [ratio, setValue] = useState(50); // 默认值设为50

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.valueAsNumber;
    //     setValue(value);
    //     const sizeRatio = value / 50;
    //     changeSize(sizeRatio);
    //     setFontSize(sizeRatio * defaultFontSize);
    // };
    const handleChange: InputNumberProps["onChange"] = (newValue: number) => {
        setValue(newValue);
        const sizeRatio = newValue / 50;
        changeSize(sizeRatio);
        setFontSize(sizeRatio * defaultFontSize);
    };

    const changeSize = (sizeRatio: number) => {
        setWidth(sizeRatio * defaultHeight);
        setHeight(sizeRatio * defaultHeight);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {/* <input
                data-testid="scaled-slider"
                type="range"
                min={0}
                max={100}
                value={ratio}
                onChange={handleChange}
            /> */}
            <Row style={{ width: "100%" }}>
                <Slider
                    style={{ width: "50%" }}
                    // defaultValue={50}
                    min={0}
                    max={100}
                    value={ratio}
                    // disabled={false}
                    onChange={handleChange}
                    step={1}
                />
            </Row>

            <Row style={{ width: "100%" }}>
                <div
                    data-testid="scaled-div"
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        fontSize: `${fontSize}px`,
                        border: "1px solid #1677ff",
                        color: "#1677ff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {content}
                </div>
            </Row>
        </div>
    );
};

export default ScaledComponent;
