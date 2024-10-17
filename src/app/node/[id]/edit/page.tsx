"use client";
import MovavableDemo from "@/test/demo/MovableDemo";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, message, Spin } from "antd";
import { Typography } from "antd";
const { Title } = Typography;
export default function NodeEditPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const moveRef = useRef(null);
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    function handlerSave(): void {
        const { x, y } = moveRef.current.getXY();
        setIsLoaded(false);
        fetch(`/api/node/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                x: x,
                y: y,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                setIsLoaded(true);
                message.success("修改成功");
                router.push(`/node`);
            }
        });
    }
    useEffect(() => {
        fetch(`/api/node/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                setIsLoaded(true);
                res.json().then((result) => {
                    moveRef.current.changeXY(result.data.x, result.data.y);
                });
            }
        });
        return () => {};
    }, []);
    return (
        <Spin tip="Loading..." spinning={!isLoaded}>
            <main style={{ padding: "2rem" }}>
                <Title level={2}>编辑Node</Title>
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
