import Image from 'next/image';
import ScaledComponent from 'src/components/cavanbj/scaledComponent/scaledComponent'

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <h1 className="text-4xl font-bold">冒险公会-任务</h1>
        <div style={{width: '100%'}}>
          <div style={{float: 'left', marginRight: '10px'}}>
          <ScaledComponent step={0.15} minScale={0.1} maxScale={1.5} overflowShowScrollBar={false}>
            <div style={{ width: '150px', height: '150px', backgroundColor: 'red' }}>
              无滚动条鼠标滚动缩放：step=0.15 min=0.1 max=1.5
            </div>
          </ScaledComponent>
          </div>
          <div style={{float: 'right'}}>
          <ScaledComponent step={0.1} minScale={0.5} maxScale={3} overflowShowScrollBar={true}>
            <div style={{ width: '150px', height: '150px', backgroundColor: 'blue' }}>
              有滚动条鼠标滚动缩放: step=0.1 min=0.5 max=3
            </div>
          </ScaledComponent>
          </div>
        </div>
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
