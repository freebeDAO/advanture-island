import Image from 'next/image';
import JumpableComponent from 'src/components/ui/JumpableComponent';

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <h1 className="text-4xl font-bold">冒险公会-任务</h1>
        <h2 className="text-2xl text-gray-400 border border-gray-300 p-2 w-full">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid #ccc', "borderWidth": "1px", "borderRadius": "5px", "boxShadow": "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h1>可跳动的组件</h1>
            <JumpableComponent className="bg-blue-100 bg-lightblue shadow-md rounded-lg p-4 flex justify-center items-center transition-transform duration-500 cursor-pointer m-5">
              <p className="font-medium text-center w-40">跳</p>
            </JumpableComponent>
          </div>

        </h2>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-8">
      </footer>
    </div>
  );
}
