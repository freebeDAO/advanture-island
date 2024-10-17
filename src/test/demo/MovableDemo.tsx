"use client";
import MovableComponent from "@/components/MovableComponent";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Select, Slider, Button } from "antd";

interface MovableDemoProps {
    initX?: number;
    initY?: number;
    initSpeed?: number;
}
const defaultProps: Partial<MovableDemoProps> = {
    initX: 0,
    initY: 0,
    initSpeed: 50,
};

const MovableDemo = forwardRef((props: MovableDemoProps, moveRef) => {
    const { initX, initY, initSpeed } = { ...defaultProps, ...props };
    const parentRef = useRef(null);
    let speed = Math.abs(initSpeed);
    speed = Math.min(100, speed);
    const [ratio, setValue] = useState(speed);
    // 定义两个状态变量来保存下拉框的值
    const [horizontalValue, setDropdownValue1] = useState<number>(0);
    const [verticalValue, setDropdownValue2] = useState<number>(0);
    if (!moveRef) moveRef = useRef(null);
    useEffect(() => {
        moveRef.current.changeXY(initX, initY);
        return () => {};
    }, []);
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.valueAsNumber;
    //     setValue(value);
    //     moveRef.current.changeSpeed(value);
    // };
    const handleChange: InputNumberProps["onChange"] = (newValue: number) => {
        setValue(newValue);
        moveRef.current.changeSpeed(newValue);
    };
    const handleMoveClick = () => {
        moveRef.current.autoMove(horizontalValue, verticalValue);
    };

    return (
        <div style={{ width: "100%" }}>
            <div className="flex items-center gap-2">
                <label
                    htmlFor="select-dropdown"
                    className="block text-sm font-medium text-gray-700"
                >
                    调整速度：
                </label>
                <Slider
                    style={{ width: "30%" }}
                    min={10}
                    max={100}
                    value={ratio}
                    onChange={handleChange}
                />
            </div>
            <div className="flex items-center gap-2">
                <label
                    htmlFor="select-dropdown"
                    className="block text-sm font-medium text-gray-700"
                >
                    水平方向：
                </label>
                <Select
                    defaultValue="不移"
                    style={{ width: 120 }}
                    onChange={(value1) => setDropdownValue1(value1)}
                    options={[
                        { value: "-1", label: "向左" },
                        { value: "0", label: "不移" },
                        { value: "1", label: "向右" },
                    ]}
                />
                <label
                    htmlFor="select-dropdown"
                    className="block text-sm font-medium text-gray-700"
                >
                    垂直方向：
                </label>
                <Select
                    defaultValue="不移"
                    style={{ width: 120 }}
                    onChange={(value2) => setDropdownValue2(value2)}
                    options={[
                        { value: "-1", label: "向上" },
                        { value: "0", label: "不移" },
                        { value: "1", label: "向下" },
                    ]}
                />

                <Button onClick={handleMoveClick}>移动</Button>
            </div>

            <div
                style={{
                    width: "100%",
                    height: "500px",
                    border: "1px solid black",
                    marginTop: "20px",
                }}
                ref={parentRef}
            >
                <MovableComponent
                    ref={moveRef}
                    defaultSpeed={speed}
                    parentRef={parentRef}
                >
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            border: "1px solid #1677ff",
                            color: "#1677ff",
                        }}
                    ></div>
                </MovableComponent>
            </div>
        </div>
    );
});
export default MovableDemo;
