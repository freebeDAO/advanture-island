import Image from 'next/image';
import Draggable from 'src/components/DraggerComponent/Index';
import Jumpable from 'src/components/JumpableComponent/Index';
import Scaled from 'src/components/ScaledComponent/Index';

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <h1 className="text-4xl font-bold">冒险公会-任务</h1>
        {/* 替换成自己完成的任务演示组件 */}
        <h2 className="flex gap-4 text-2xl h-80 text-gray-400 border border-gray-300 p-2 w-full" >
          <Jumpable style={{
            width: "100px",
            height: "100px",
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
            userSelect: 'none'
          }}  >
            点击或者空格触发跳动
          </Jumpable>
          <Draggable style={{
            userSelect: 'none',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: 'relative',
            width: "100px",
            height: "100px",
            backgroundColor: "blue",
            color: 'white',
            cursor: 'grab',
            left: 0,
            top: 0

          }}>
            拖动我
          </Draggable>
          <Scaled>
            <div style={{
              userSelect: 'none',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              height: "100px",
              backgroundColor: "blue",
              color: 'white',
              left: 0,
              top: 0
            }}>点击放大或者缩小</div>
          </Scaled>

          <a href='/test/player' style={{
            userSelect: 'none',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100px",
            height: "100px",
            backgroundColor: "blue",
            color: 'white',
            left: 0,
            top: 0
          }}>
            点击跳转可移动组件页面
          </a>

        </h2>

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
    </div >
  );
}
