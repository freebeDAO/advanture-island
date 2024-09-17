import Image from 'next/image';
import ScaledComponent from 'src/components/ui/ScaledComponent';

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <h1 className="text-4xl font-bold">冒险公会-任务</h1>
        <h2 className="text-2xl text-gray-400 p-2 w-full">
          <div className="flex flex-col items-center p-5 rounded shadow-md">
            <h1>缩放组件</h1>
            <ScaledComponent className='h-[600px] w-full'>
              <p className="flex font-medium text-center text-inherit whitespace-nowrap">缩放</p>
            </ScaledComponent>
          </div>
        </h2>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-8">
      </footer>
    </div>
  );
}
