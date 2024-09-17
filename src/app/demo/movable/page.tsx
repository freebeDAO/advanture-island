import MovableComponent from 'src/components/ui/MovableComponent';

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <h1 className="text-4xl font-bold">冒险公会-任务</h1>
        <h2 className="text-2xl text-gray-400 border border-gray-300 p-2 w-full">
          <div className="flex flex-col items-center p-5 border border-gray-300 rounded shadow-md">
            <h1>可移动的组件</h1>
            <MovableComponent className='h-[600px] w-full' />
          </div>
        </h2>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-8">
      </footer>
    </div>
  );
}
