import Image from 'next/image';
import { ConnectButton } from 'src/components/ui/ConnectButton';

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <h1 className="text-4xl font-bold">冒险公会-任务-让系统支持登录功能</h1>
        {/* 替换成自己完成的任务演示组件 */}
        <h2 className="text-2xl h-80 text-gray-400 border border-gray-300 p-2 w-full">
          添加任务组件用于展示
          <div className='flex flex-col items-center justify-center'>
            <span>Connect Wallet</span>
            <ConnectButton />
          </div>
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
    </div>
  );
}