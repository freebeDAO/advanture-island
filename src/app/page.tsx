"use client";
import Image from "next/image";
import JumpableComponent from "src/components/JumpableComponent";
import DraggableDemo from "@/test/demo/DraggableDemo";
import { Button } from "antd";
import ScaledDemo from "src/test/demo/ScaledDemo";
import { useRouter } from "next/navigation";
import { Typography } from "antd";
import { Divider } from "antd";
const { Title } = Typography;
export default function Home() {
    const router = useRouter();
    function handlerJump(): void {
        router.push(`/node`);
    }

    return (
        <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2  sm:items-start">
                <Title level={2}>冒险公会-任务</Title>
                {/* 替换成自己完成的任务演示组件 */}
                {/* <h2 className="text-2xl h-80 text-gray-400 border border-gray-300 p-2 w-full">
          添加任务组件用于展示
        </h2> */}
                <Title level={3}>JumpableComponent 可跳动的组件</Title>
                <JumpableComponent>
                    <Button type="primary">可跳动的组件</Button>
                </JumpableComponent>

                <Divider />

                <Title level={3}>DraggableComponent 可拖动组件</Title>
                <DraggableDemo />

                <Divider />

                <Title level={3}>ScaledComponent 可缩放组件</Title>
                <ScaledDemo />

                <Divider />

                <Title level={3}>点击跳转node：</Title>
                <Button onClick={() => handlerJump()}>Node页面</Button>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-8">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://github.com/freebeDAO/advanture-island"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    GitHub
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.yuque.com/zoeren/freebedao"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    freebeDAO
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
