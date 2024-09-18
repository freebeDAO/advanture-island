'use client'

import DraggableComponent from "src/components/DraggableComponent";

/**
 * weixin: xuquan_2021，任务：拖动组件
 */
export default function Home() {

  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h4 className="text-2xl font-bold pb-4">拖动组件</h4>
      
      <div className="border border-gray-300" style={{ width: '100%', height: 400 }}>
        <DraggableComponent>
          <div className="bg-red-500 flex justify-center items-center text-cyan-200" style={{ width: 200, height: 200 }}>拖动我</div>
        </DraggableComponent>
      </div>
    </div>
  );
}
