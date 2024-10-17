"use client";
import ScaledComponent from "@/components/ScaledComponent";
import { useRef } from "react";

export default function DraggableDemo() {
    const parentRef = useRef(null);
    const defaultWidth = 100;
    const defaultHeight = 100;
    return (
        <div
            style={{
                height: `${2 * defaultHeight + 20}px`,
                width: "100%",
            }}
        >
            <ScaledComponent
                content="缩放组件"
                defaultHeight={defaultHeight}
                defaultWidth={defaultWidth}
            />
        </div>
    );
}
