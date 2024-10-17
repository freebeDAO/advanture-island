"use client";
import DraggableComponent from "@/components/DraggableComponent";
import { Button } from "antd";
import { useRef } from "react";

export default function DraggableDemo() {
    const parentRef = useRef(null);
    return (
        <div
            data-testid="draggable-parent"
            ref={parentRef}
            style={{
                position: "relative",
                width: "500px",
                height: "200px",
                border: "1px solid black",
            }}
        >
            <DraggableComponent parentRef={parentRef} width={50} height={50}>
                <div
                    style={{
                        position: "absolute",
                        width: "50px",
                        height: "50px",
                        cursor: "move",
                        left: "0px",
                        top: "0px",
                        border: "1px solid #1677ff",
                        color: "#1677ff",
                        fontSize: "14px",
                        padding: "5px 9px",
                    }}
                >
                    拖动组件
                </div>
            </DraggableComponent>
        </div>
    );
}
