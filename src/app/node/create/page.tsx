"use client";
import MovavableDemo from "@/test/demo/MovableDemo";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button, message, Spin } from "antd";
import { Typography } from "antd";
const { Title } = Typography;
export default function NodeEditPage() {
    const moveRef = useRef(null);
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(true);
    function handlerSave(): void {
        const { x, y } = moveRef.current.getXY();
        setIsLoaded(false);
        fetch("/api/node", {
            method: "POST",
            body: JSON.stringify({
                x: x,
                y: y,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                res.json().then((result) => {
                    console.log(result);
                    setIsLoaded(true);
                    message.success("添加成功");
                });
                router.push(`/node`);
            }
        });
    }

    return (
        <Spin tip="Loading..." spinning={!isLoaded}>
            <main style={{ padding: "2rem" }}>
                <Title level={2}>新增Node</Title>
                <Button type="primary" onClick={() => handlerSave()}>
                    保存
                </Button>
                <MovavableDemo
                    initX={0}
                    initY={0}
                    initSpeed={10}
                    ref={moveRef}
                />
            </main>
        </Spin>
    );
}
